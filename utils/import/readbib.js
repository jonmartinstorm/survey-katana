// This is a module for importing bib files to the database.
// See import.js for calling this function.

const fs = require('fs');
const mongoose = require("mongoose");
const articleDB = require("../../server/models/article");

database_url =  "mongodb://localhost/articles"

/*
 * Create a json object from a raw string from a World of Science bib file
 *
 */
function jsonifyFullWS(element, s) {
    let entry = {
        title: '',
        bibtex: element,
        type: '',
        source: s,
        year: 0,
        authors: '',
        abstract: '',
        notes: '',
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
    };

    let lines = element.split(/\n(?!\s\s\s)/g);

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].split(' = ')[0].startsWith('Title')) {
            entry.title = lines[i].split(' = ')[1].slice(2, -3).replace(/\n\s\s\s/g, ' ');
        } 
        if (lines[i].split(' = ')[0] == 'Year') {
            entry.year = Number(lines[i].split(' = ')[1].slice(2, -3).replace(/\n\s\s\s/g, ' '));
        }
        if (lines[i].split(' = ')[0] == 'Author') {
            entry.authors = lines[i].split(' = ')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        }
        if (lines[i].split(' = ')[0].startsWith('Abstract')) {
            entry.abstract = lines[i].split(' = ')[1].slice(2, -3).replace(/\n\s\s\s/g, ' ');
        }
        if (lines[i].split(' = ')[0].startsWith('Type')) {
            entry.type = lines[i].split(' = ')[1].slice(2, -3).replace(/\n\s\s\s/g, ' ');
        } 
    }
    return entry;
}

/*
 * Create a json object from a raw string from a Science Direct bib file
 *
 */
function jsonifyFullSD(element, s) {
    let entry = {
        title: '',
        bibtex: element,
        type: '',
        source: s,
        year: 0,
        authors: '',
        abstract: '',
        notes: '',
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
    };

    let lines = element.split(/\n(?!\s\s\s)/g);

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].split(' = ')[0].startsWith('title')) {
            entry.title = lines[i].split(' = ')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        } 
        if (lines[i].split(' = ')[0] == 'year') {
            entry.year = Number(lines[i].split(' = ')[1].slice(1, -2).replace(/\n\s\s\s/g, ' '));
        }
        if (lines[i].split(' = ')[0] == 'author') {
            entry.authors = lines[i].split(' = ')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        }
        if (lines[i].split(' = ')[0].startsWith('abstract')) {
            entry.abstract = lines[i].split(' = ')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        }
        if (lines[i].split(' = ')[0].startsWith('type')) {
            entry.type = lines[i].split(' = ')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        } 
    }
    return entry;
}

/*
 * Create a json object from a raw string from a IEEE bib file
 *
 */
function jsonifyFullIEEE(element, s) {
    let entry = {
        title: '',
        bibtex: element,
        type: '',
        source: s,
        year: 0,
        authors: '',
        abstract: '',
        notes: '',
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
    };

    let lines = element.split('\n');

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].split('=')[0].startsWith('title')) {
            entry.title = lines[i].split('=')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        } 
        if (lines[i].split('=')[0] == 'year') {
            entry.year = Number(lines[i].split('=')[1].slice(1, -2).replace(/\n\s\s\s/g, ' '));
        }
        if (lines[i].split('=')[0] == 'author') {
            entry.authors = lines[i].split('=')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        }
        if (lines[i].split('=')[0].startsWith('abstract')) {
            entry.abstract = lines[i].split('=')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        }
        if (lines[i].split('=')[0].startsWith('type')) {
            entry.type = lines[i].split('=')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        } 
    }
    return entry;
}

/*
 * Create a json object from a raw string from a Scopus bib file
 *
 */
function jsonifyFullScopus(element, s) {
    let entry = {
        title: '',
        bibtex: element,
        type: '',
        source: s,
        year: 0,
        authors: '',
        abstract: '',
        notes: '',
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
    };

    let lines = element.split('\n');

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].split('=')[0].startsWith('title')) {
            entry.title = lines[i].split('=')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        } 
        if (lines[i].split('=')[0] == 'year') {
            entry.year = Number(lines[i].split('=')[1].slice(1, -2).replace(/\n\s\s\s/g, ' '));
        }
        if (lines[i].split('=')[0] == 'author') {
            entry.authors = lines[i].split('=')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        }
        if (lines[i].split('=')[0].startsWith('abstract')) {
            entry.abstract = lines[i].split('=')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        }
        if (lines[i].split('=')[0].startsWith('document_type')) {
            entry.type = lines[i].split('=')[1].slice(1, -2).replace(/\n\s\s\s/g, ' ');
        } 
    }
    return entry;
}

/*
 * Create a String array from a bib string.
 *
 */
function bib2arr(data) {
    return data.split('\n@');
}

/*
 * Read a World of Science bib file and convert it to a Json object
 *
 */
async function bibFileToJsonWS(file, search) {
    let data = fs.readFileSync(file, 'utf8');

    let contents = bib2arr(data).map(line => `@${line}`).slice(1);

    let array = [];

    for (let i = 0; i < contents.length; i++) {
        array.push(jsonifyFullWS(contents[i], search));
    }

    return array;
}

/*
 * Read a Science Direct bib file and convert it to a Json object
 *
 */
async function bibFileToJsonSD(file, search) {
    let data = fs.readFileSync(file, 'utf8');

    let contents = bib2arr(data);

    let array = [];

    for (let i = 0; i < contents.length; i++) {
        array.push(jsonifyFullSD(contents[i], search));
    }

    return array;
}

/*
 * Read a IEEE bib file and convert it to a Json object
 *
 */
async function bibFileToJsonIEEE(file, search) {
    let data = fs.readFileSync(file, 'utf8');

    let contents = bib2arr(data);

    let array = [];

    for (let i = 0; i < contents.length; i++) {
        array.push(jsonifyFullIEEE(contents[i], search));
    }

    return array;
}

/*
 * Read a Scopus bib file and convert it to a Json object
 *
 */
async function bibFileToJsonScopus(file, search) {
    let data = fs.readFileSync(file, 'utf8');

    let contents = bib2arr(data).map(line => `@${line}`).slice(1);

    let array = [];

    for (let i = 0; i < contents.length; i++) {
        array.push(jsonifyFullScopus(contents[i], search));
    }

    return array;
}

/*
 * Save a array of Json objects to the mongoose database
 * Prints to the console if there is an article in the DB with the same title
 * This is because there may be duplicates bib files from different sources.
 */
function saveJsonToDB(array) {
    mongoose.connect(database_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(() => {
        console.log("Connected!")
        console.log(array.length);
        array.forEach((article) => {
            articleDB.Article.findOne({ title: article.title }, (err, found) => {
                if(err) { 
                    console.log(err);
                } else {
                    console.log((article.title));
                    if(!found) {
                        // insert the article
                        articleDB.create(article).then(() => {
                            console.log("Inserted article in db!");
                        }).catch((err) => {
                            console.log(err);
                            exit();
                        });
                    } else {
                        // article already in db
                        console.log("Article article already in db!");
                        console.log(found.title);
                        console.log(article.source);
                        console.log(found.source);
                    }
                }
            }); 
        });
    }).then(() => {
        console.log("Disconnect!"); //mongoose.disconnect();
    });

    // function exit() {
    //     mongoose.disconnect();
    // }
}

function findOne(array) {
    mongoose.connect(database_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(() => {
        articleDB.Article.findOne({ title: array[0].title}, (err, found) => {
            if(err) {
                console.log(err);
            } else {
                console.log(article.title);
            }
        })
    });
}

module.exports = {
    bibFileToJsonIEEE,
    bibFileToJsonSD,
    bibFileToJsonScopus,
    bibFileToJsonWS,
    saveJsonToDB,
    findOne,
}


