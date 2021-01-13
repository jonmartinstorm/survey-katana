const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const { restart } = require("nodemon");

const database = require("./config/database");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

const article = require("./models/article");

mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// get all article data from db
app.get("/api/articles", (req, res) => {
    article.getAll().then((articles) => {
       res.json(articles);
    });
});

// get all article data from db where read = false
app.get("/api/notread", (req, res) => {
    article.getNotRead().then((articles) => {
       res.json(articles);
    });
});

// get all article data from db where screened = false
app.get("/api/notscreened", (req, res) => {
    article.getNotScreened().then((articles) => {
       res.json(articles);
    });
});

// get all article data from db where read = false and included = true
app.get("/api/notdone", (req, res) => {
    article.getNotDone().then((articles) => {
       res.json(articles);
    });
});

// get all article data from db where include = true
app.get("/api/included", (req, res) => {
    article.getIncluded().then((articles) => {
       res.json(articles);
    });
});

// Get a single article data
app.get("/api/articles/:article_id", (req, res) => {
    let id = req.params.article_id;
    article.getOne(id).then((article) => {
        res.json(article);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

// Insert new Article record into database
app.post("/api/articles/", (req, res) => {
    article.create(req.body).then((article) => {
        res.json(article);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

// Update Article record into database
app.put("/api/articles/:article_id", (req, res) => {
    let id = req.params.article_id;
    article.updateOne(id, req.body).then((article) => {
        res.json(article);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

// Delete particular Article record from database
app.delete("/api/articles/:article_id", (req, res) => {
    let id = req.params.article_id;
    article.deleteOne(id).then((article) => {
        res.json(article);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});


const port = process.env.PORT || 7788;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});


