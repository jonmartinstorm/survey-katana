# Survey-Katana Server
A REST api for CRUD of articles for a survey article in cybersecurity

<!-- This is based on a tutorial by Coding Garden with CJ

* [x] Change from messages to articles
* [x] Change schema to what you want
    * Title
    * Year
    * Authors
    * Abstract
    * Source
    * Include or not
* [ ] Find out how to include question answering...
    * Best way may be to have them as boolean? But I want notes as well.. -->

## Restaring with other tutorial
https://www.js-tutorials.com/nodejs-tutorial/crud-operations-using-nodejs-express-mongodb-mongoose/


## How to export mongoDB data to json file:

```
mongoexport -d <database> -c <collection_name> -0 <file_name> --jsonArray --pretty
```

## Import to mongoDB from json file:
```
mongoimport --db <database-name> --collection <collection-name> --file input.json
```