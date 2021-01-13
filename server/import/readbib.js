const fs = require('fs');
const mongoose = require("mongoose");
const database = require("../config/database");
const articleDB = require("../models/article");


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
    //console.log(lines);

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

function bib2arr(data) {
    return data.split('\n@');
}

function bibFileToJsonWS(file, search) {
    let data = fs.readFileSync(file, 'utf8');

    let contents = bib2arr(data).map(line => `@${line}`).slice(1);

    let array = [];

    for (let i = 0; i < contents.length; i++) {
        array.push(jsonifyFullWS(contents[i], search));
    }

    return array;
}

function bibFileToJsonSD(file, search) {
    let data = fs.readFileSync(file, 'utf8');

    let contents = bib2arr(data);

    let array = [];

    for (let i = 0; i < contents.length; i++) {
        array.push(jsonifyFullSD(contents[i], search));
    }

    return array;
}

function bibFileToJsonIEEE(file, search) {
    let data = fs.readFileSync(file, 'utf8');

    let contents = bib2arr(data);

    let array = [];

    for (let i = 0; i < contents.length; i++) {
        array.push(jsonifyFullIEEE(contents[i], search));
    }

    return array;
}

function bibFileToJsonScopus(file, search) {
    let data = fs.readFileSync(file, 'utf8');

    let contents = bib2arr(data).map(line => `@${line}`).slice(1);

    let array = [];

    for (let i = 0; i < contents.length; i++) {
        array.push(jsonifyFullScopus(contents[i], search));
    }

    return array;
}

function saveJsonToDB(array) {
    mongoose.connect(database.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    let done = 0;
    array.forEach((article) => {
        articleDB.Article.findOne({ title: article.title }, (err, found) => {
            if(err) { 
                console.log(err);
                exit();
            } else {
                if(!found) {
                    // insert the article
                    articleDB.create(article).then((result) => {
                        done++;
                        if (done == array.length) {
                            exit();
                        }
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
                    done++;
                    if (done == array.length) {
                        exit();
                    }
                }
            }
        });
        
    });

    function exit() {
        mongoose.disconnect();
    }
}

// Check import WS
// let result = bibFileToJsonWS("WorldOfScience/D_CPS_WS.bib", "WebOfScience D CPS");
// console.log("WS")
// console.log(result.length);
// console.log(result[0]);
// console.log(result[1]);

// Check import SD
// result = bibFileToJsonSD("ScienceDirect/D_CPS_SD.bib", "ScienceDirect D CPS");
// console.log("SD")
// console.log(result.length);
// console.log(result[0]);
// console.log(result[1]);

// Check import IEEE
// result = bibFileToJsonIEEE("IEEEXplore/D_CPS_IEEE.bib", "IEEEXPlore D CPS");
// console.log("ieee");
// console.log(result.length);
// console.log(result[0]);
// console.log(result[1]);

// Check import Scopus
// result = bibFileToJsonScopus("Scopus/D_SCADA_SCOP.bib", "Scopus D SCADA");
// console.log("Scopus");
// console.log(result.length);
// console.log(result[0]);
// console.log(result[1]);

// Save to DB
// saveJsonToDB(bibFileToJsonWS("WorldOfScience/ID_CPS_WS.bib", "WebOfScience ID CPS"));
// saveJsonToDB(bibFileToJsonWS("WorldOfScience/ID_ICS_WS.bib", "WebOfScience ID ICS"));
// saveJsonToDB(bibFileToJsonWS("WorldOfScience/ID_SCADA_WS.bib", "WebOfScience ID SCADA"));
// saveJsonToDB(bibFileToJsonWS("WorldOfScience/D_CPS_WS.bib", "WebOfScience D CPS"));
// saveJsonToDB(bibFileToJsonWS("WorldOfScience/D_ICS_WS.bib", "WebOfScience D ICS"));
// saveJsonToDB(bibFileToJsonWS("WorldOfScience/D_SCADA_WS.bib", "WebOfScience D SCADA"));

// saveJsonToDB(bibFileToJsonIEEE("IEEEXplore/ID_ICS_IEEE.bib", "IEEEXPlore ID ICS"));
// saveJsonToDB(bibFileToJsonIEEE("IEEEXplore/ID_SCADA_IEEE.bib", "IEEEXPlore ID SCADA"));
// saveJsonToDB(bibFileToJsonIEEE("IEEEXplore/D_CPS_IEEE.bib", "IEEEXPlore D CPS"));
// saveJsonToDB(bibFileToJsonIEEE("IEEEXplore/D_ICS_IEEE.bib", "IEEEXPlore D ICS"));
// saveJsonToDB(bibFileToJsonIEEE("IEEEXplore/D_IACS_IEEE.bib", "IEEEXPlore D IACS"));
// saveJsonToDB(bibFileToJsonIEEE("IEEEXplore/D_SCADA_IEEE.bib", "IEEEXPlore D SCADA"));

// saveJsonToDB(bibFileToJsonSD("ScienceDirect/D_CPS_SD.bib", "ScienceDirect D CPS"));
// saveJsonToDB(bibFileToJsonSD("ScienceDirect/D_ICS_SD.bib", "ScienceDirect D ICS"));
// saveJsonToDB(bibFileToJsonSD("ScienceDirect/D_SCADA_SD.bib", "ScienceDirect D SCADA"));

// saveJsonToDB(bibFileToJsonScopus("Scopus/D_SCADA_SCOP.bib", "Scopus D SCADA"));
// saveJsonToDB(bibFileToJsonScopus("Scopus/D_ICS_SCOP.bib", "Scopus D ICS"));
// saveJsonToDB(bibFileToJsonScopus("Scopus/D_CPS_SCOP.bib", "Scopus D CPS"));


