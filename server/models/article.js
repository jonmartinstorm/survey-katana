const mongoose = require("mongoose");
const { notes } = require("joi");
// const Joi = require("joi");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
    },
    type: {
        type: String,
    },
    bibtex: {
        type: String,
    },
    source: {
        type: String,
    },
    year: {
        type: Number,
    },
    authors: {
        type: String,
    },
    abstract: {
        type: String,
    },
    citations: {
        type: Number,
    },
    include: {
        type: Boolean,
        default: false,
    },
    screened: {
        type: Boolean,
        default: false,
    },
    read: {
        type: Boolean,
        default: false,
    },
    notes: {
        type: String,
    },
    questions: [{ 
        text: {type: String},
        notes: {type: String},
        answer: {type: Boolean},
    }],
});

const Article = mongoose.model("Article", articleSchema);

// The functions should really be put in a controller.

function getAll() {
    return Article.find();
}

function getNotRead() {
    return Article.find({"read": false});
}

function getNotScreened() {
    return Article.find({"screened": false});
}

function getNotDone() {
    return Article.find({"include": true, "read": false});
}

function getIncluded() {
    return Article.find({"include": true});
}

function getOne(id) {
    return new Promise((resolve, reject) => {
        Article.findById(id, (err, article) => {
            if(err) {
                reject(err);
            } else {
                resolve(article);
            }
        });
    });   
}

function create(article) {
    //console.log(article);
    return new Promise((resolve, reject) => {
        Article.create({
            title: article.title,
            source: article.source,
            type: article.type,
            bibtex: article.bibtex,
            year: article.year,
            authors: article.authors,
            abstract: article.abstract,
            citations: article.citations,
            include: article.include,
            read: article.read,
            notes: article.notes,
            screened: article.screened,
            questions: article.questions,
        }, (err, article) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                resolve(article);
            }
        });
    });
}

function updateOne(id, article) {
    return new Promise((resolve, reject) => {
        Article.findByIdAndUpdate(id, {
            title: article.title,
            source: article.source,
            type: article.type,
            bibtex: article.bibtex,
            year: article.year,
            authors: article.authors,
            abstract: article.abstract,
            citations: article.citations,
            include: article.include,
            read: article.read,
            notes: article.notes,
            screened: article.screened,
            questions: article.questions,   
        }, {
            new:true
        }, (err, article) => {
            if(err) {
                reject(err);
            } else {
                resolve(article);
            }
        });
    })
}

function deleteOne(id) {
    return new Promise((resolve, reject) => {
        Article.findByIdAndDelete(id
            , (err, article) => {
            if(err) {
                reject(err);
            } else {
                resolve(article);
            }
        });
    })
}

module.exports = {
    Article,
    getAll,
    getNotRead,
    getIncluded,
    getNotScreened,
    getOne,
    create,
    updateOne,
    deleteOne,
}