const readbib = require("./readbib");

/* Save to DB
 * - Uncomment one line at the time since it is async
 */

// One line at the time:
readbib.bibFileToJsonWS("WorldOfScience/ID_CPS_WS.bib", "WebOfScience ID CPS").then((array) => {
    readbib.findOne(array);
});
// readbib.saveJsonToDB(readbib.bibFileToJsonWS("WorldOfScience/ID_CPS_WS.bib", "WebOfScience ID CPS"));
// readbib.saveJsonToDB(readbib.bibFileToJsonWS("WorldOfScience/ID_ICS_WS.bib", "WebOfScience ID ICS"));
// readbib.saveJsonToDB(readbib.bibFileToJsonWS("WorldOfScience/ID_SCADA_WS.bib", "WebOfScience ID SCADA"));
// readbib.saveJsonToDB(readbib.bibFileToJsonWS("WorldOfScience/D_CPS_WS.bib", "WebOfScience D CPS"));
// readbib.saveJsonToDB(readbib.bibFileToJsonWS("WorldOfScience/D_ICS_WS.bib", "WebOfScience D ICS"));
// readbib.saveJsonToDB(readbib.bibFileToJsonWS("WorldOfScience/D_SCADA_WS.bib", "WebOfScience D SCADA"));

// readbib.saveJsonToDB(readbib.bibFileToJsonIEEE("IEEEXplore/ID_ICS_IEEE.bib", "IEEEXPlore ID ICS"));
// readbib.saveJsonToDB(readbib.bibFileToJsonIEEE("IEEEXplore/ID_SCADA_IEEE.bib", "IEEEXPlore ID SCADA"));
// readbib.saveJsonToDB(readbib.bibFileToJsonIEEE("IEEEXplore/D_CPS_IEEE.bib", "IEEEXPlore D CPS"));
// readbib.saveJsonToDB(readbib.bibFileToJsonIEEE("IEEEXplore/D_ICS_IEEE.bib", "IEEEXPlore D ICS"));
// readbib.saveJsonToDB(readbib.bibFileToJsonIEEE("IEEEXplore/D_IACS_IEEE.bib", "IEEEXPlore D IACS"));
// readbib.saveJsonToDB(readbib.bibFileToJsonIEEE("IEEEXplore/D_SCADA_IEEE.bib", "IEEEXPlore D SCADA"));

// readbib.saveJsonToDB(readbib.bibFileToJsonSD("ScienceDirect/D_CPS_SD.bib", "ScienceDirect D CPS"));
// readbib.saveJsonToDB(readbib.bibFileToJsonSD("ScienceDirect/D_ICS_SD.bib", "ScienceDirect D ICS"));
// readbib.saveJsonToDB(readbib.bibFileToJsonSD("ScienceDirect/D_SCADA_SD.bib", "ScienceDirect D SCADA"));

// readbib.saveJsonToDB(readbib.bibFileToJsonScopus("Scopus/D_SCADA_SCOP.bib", "Scopus D SCADA"));
// readbib.saveJsonToDB(readbib.bibFileToJsonScopus("Scopus/D_ICS_SCOP.bib", "Scopus D ICS"));
// readbib.saveJsonToDB(readbib.bibFileToJsonScopus("Scopus/D_CPS_SCOP.bib", "Scopus D CPS"));

