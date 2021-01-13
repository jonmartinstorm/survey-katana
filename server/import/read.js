// Read and parse an xls file and put it into the database 
// Use the bib version instead.
//

const XLSX = require('xlsx');
const { count } = require('../models/article');
const workbook = XLSX.readFile('savedrecs.xls');
const sheet_name_list = workbook.SheetNames;
const json_sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

var article_list = [];

json_sheet.forEach((article) => {
    article_list.push({
        title: article['Article Title'],
        year: article['Publication Year'],
        authors: article['Author Full Names'],
        abstract: article['Abstract'],
        include: false,
        read: false,
        screened: false,
        questions: [
            {
                text: "Does the proposed detection method address any of the unique features IACS?",
                notes: "",
                answer: false,
            },
            {
                text: "Does proposed detection method data or information from the physical process?",
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
            }
        ],
    })
});

//console.log(article_list[0]);

const mongoose = require("mongoose");
const database = require("../config/database");
const articleDB = require("../models/article");
const { exist } = require('joi');

mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// then add the new data

let done = 0;
article_list.forEach((article) => {
    articleDB.create(article).then((result) => {
        done++;
        if (done == article_list.length) {
            exit();
        }
    }).catch((err) => {
        console.log(err);
    });
});

function exit() {
    mongoose.disconnect();
}