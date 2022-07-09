const express = require('express');
const router = express.Router();
const path = require('path');
const { google } = require("googleapis");
const isLoggedIn = require('./isLoggedIn');


// Sheets API configuration
const auth = new google.auth.GoogleAuth({
    keyFile: "keys.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets", 
});
const googleSheetsInstance = google.sheets({ version: "v4", auth: auth.getClient() });
const spreadsheetId = "*****";


/**
 * @GET - base route
 */
router.get("/", (req, res) => {

    res.sendFile(path.join(__dirname+'/index.html'));
})


/**
 * @GET - get all notes
 */
router.get("/notes", isLoggedIn, (req, res) => {

    googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: "Sheet1!A:G", //range of cells to read from.
    }).then(response => {
        const notes = [];
        const sheetResponse = response.data.values;
        
        sheetResponse.forEach(item => {
            if(item[0] !== "id") {
                notes.push({
                    "id": item[0],
                    "title": item[1],
                    "type": item[2],
                    "link": item[3],
                    "owner": item[4],
                    "fresher": item[5] === "0" ? false : true,
                    "isPremium": item[6] === "0" ? false : true
                });
            }
        });

        res.status(200).json(notes);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Something went wrong!"});
    });
})

module.exports = router;
