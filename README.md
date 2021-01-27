# Survey-katana - A simple app for managing articles in litterature reviews
A simple app for managing articles for litterature reviews.

## Overview

Overview:
 * Vue.js for a simple client
 * Express and node.js for a simple api server
 * Mongodb as the database

## Deploy locally
Quick test:

Terminal 1:
Go into the client folder and run:
```
npm install
npm run serve
```

Terminal 2:
go into the server folder and run:
```
npm install
npm run dev
```

Then go to http://localhost:8080 and check the service out.

If this doesnt work then check that all the ports are correctly setup in both the client side, which should point to the server side, and also that the client is server on 8080 (you can change these if you want).


## Deploy on Raspberry Pi
A quick and dirty deployment of the app on a raspberry pi.

### What you need
* Raspberry Pi (tested on 3B and 4B)
* Rapsberry Pi OS 64 bit or Ubuntu 64 bit
    * The MongoDB version we need is only available on 64 bit

### Setup
First you need to install the OS of you choice on the rpi, and ensure that you can SSH into it or have access to a terminal in any other way. It is smart to ensure that the rpi has a static ip on your network, either set the ip static or set the dhcp server in you router to give a static ip to your rpis MAC address.

### Install software
We need a few software packages for this to work
* Nginx (a popular web server)
* MongoDB (a document oriented DB)
* Node.js and npm (Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.)
* git (but you probably know this.)

before we start, ensure that packages are up to date:
```
sudo apt update
sudo apt upgrade -y
```

#### Install Nginx
Install using the standard packages
```
sudo apt update
sudo apt install nginx
```
And enable it using systemclt
```
sudo systemctl enable nginx
```


#### Install MongoDB
Add the the MongoDB GPG key for their repositories
```
curl -s https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
```
and the add the repository
```
echo "deb [ arch=arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
```
and update the package list since we added a new repository, and install
```
sudo apt update
sudo apt install mongodb-org
```
and enable it using systemctl
```
sudo systemctl enable mongod
```

#### Install Node.js
We'll use [NVM](https://github.com/nvm-sh/nvm) to handle node. Install it useing the script:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```
and log out and in again to update the aliases in bash.
Then install node:
```
nvm install node
```

#### Get the survey-katana repo
Ensure git is installed:
```
sudo apt install git
```
And clone the repo whereever you want:
```
git clone https://github.uio.no/jonmartp/survey-katana.git
```

### Setup

#### Client
Go into the client folder and install all the packages
```
npm install
```

Change the url in Details.vue, Home.vue and Statistics.vue so it has the ip for the rpi and correct port for the server.

and then build it
```
npm run build
```
Remember the path to the dist folder, as we will need it in the nginx setup, called {{app_root}} later.
First we create a Nginx server block for the app, running on the standard port 80. We create the file and copy a symbolic link to the sites-enabled folder.
```
sudo touch /etc/nginx/sites-available/server_katana_client
sudo ln -s /etc/nginx/sites-available/server_katana_client /etc/nginx/sites-enabled/server_katana_client
```
then edit the file in sites-available:
```
server {
    listen      80;
    server_name _;    
    
    charset utf-8;
    root    {{app_root}}/dist;
    index   index.html index.htm;    
    
    # Always serve index.html for any request
    location / {
        root {{app_root}}/dist;
        try_files $uri /index.html;
    }    
    
    error_log  /var/log/nginx/vue-app-error.log;
    access_log /var/log/nginx/vue-app-access.log;
}
```
Check configuration, then restart nginx:
```
sudo nginx -t
sudo service nginx restart
```
If you go to `http://<rpi_ip>/` you should now see the client side with no data from the server side, since it is not setup.

#### Server
This is abit more convoluted, since we use reverse proxy from nginx.
In order for some npm packages to work (those that require compiling code from source, for example), you will need to install the build-essential package:
```
sudo apt install build-essential
```

Then install pm2 to start and run our node.js server as a deamon.
```
sudo npm install pm2@latest -g
```
If this gets an error saying npm not found, then use `su` to become root and run the nvm.sh script in the installation folder in your user.
```
su
source /home/<user>/.nvm/nvm.sh
```
This will put the paths in the correct place. If this is too cumbersome then you can install node.js and npm directly from the node.js webpage and it should work.

Atter pm2 is installed, go into the server folder and start the pm2 server on the server.
```
pm2 start index.js
```
This adds the app to pm2 so we can run it as a deamon. Add it to systemclt
```
pm2 startup systemd
```
And run the script you get from that command. Something like:
```
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u sammy --hp /home/sammy
```

And then:
```
pm2 save
```

Reboot and start the service with systemctl:
```
sudo systemctl start pm2-<user>
```

The next step is to setup Nginx as a Reverse Proxy server.
First we create a Nginx server block for the app. We create the file and copy a symbolic link to the sites-enabled folder.
```
sudo touch /etc/nginx/sites-available/server_katana_server
sudo ln -s /etc/nginx/sites-available/server_katana_server /etc/nginx/sites-enabled/server_katana_server
```
then edit the file in sites-available We chose a  port the client talks to, like 7777. and maps this to the server port, like 7788.
```
server {
    listen      7777;
    server_name _;    
    
    location / {
        proxy_pass http://localhost:7788;
    }
}
```
Check configuration, then restart nginx:
```
sudo nginx -t
sudo service nginx restart
```

### Done!
Congratulations, it should all work now!

#### Import data
Use the scripts in the server/import folder to import data.

### Sources I have used
I have used the following sources to learn how to do this, and so could you!:
* [How to install Nginx on ubuntu 20-04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
* [Deploy a vue.js app with Nginx on ubuntu](https://thucnc.medium.com/deploy-a-vuejs-web-app-with-nginx-on-ubuntu-18-04-f93860219030)
* [Install MongoDB on Rapsberry Pi](https://pimylifeup.com/mongodb-raspberry-pi/)
* [How to set up a node js application for production](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04)


## Deploy on virtual private server
TODO. You should not put this app online as it has no auth at the moment.

## TODO

* [ ] Some documentation
* [ ] Document the code
* [ ] Add some auth to the api
* [ ] Remove dependency of Mongodb as it is note really needed
    * [ ] Implement LowDB instead
