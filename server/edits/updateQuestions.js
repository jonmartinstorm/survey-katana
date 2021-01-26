const mongoose = require("mongoose");
const database = require("../config/database");
const articleDB = require("../models/article");
const { func } = require("joi");


mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

articleDB.getIncluded().then((articles) => {
    articles.forEach((article) => {
        article.questions = [
            {
                text: "Does the proposed detection method address any of the unique features IACS?",
                notes: "",
                answer: false,
            },
            {
                text: "Does the proposed detection method use data from the physical world?",
                notes: "",
                answer: false,
            },
            {
                text: "If the detection method gathers process data, from where and how do they gather it?",
                notes: "",
                answer: false,
            },
            {
                text: "If the detection method utilizes process data, do they enrich the data with other information, or correlate it with other information?",
                notes: "",
                answer: false,
            },
            {
                text: "If the detection method utilizes process data, is the method been tested or used on a live system, a real-life system, or a live test lab?",
                notes: "",
                answer: false,
            },
            {
                text: "What sector is the IACS used in the article from?",
                notes: "",
                answer: false,
            },
            {
                text: "Do they propose use of machine learning?",
                notes: "",
                answer: false,
            },
        ];
        articleDB.updateOne(article._id, article).then((art) => {
            console.log(article._id);
        });
    })
});



