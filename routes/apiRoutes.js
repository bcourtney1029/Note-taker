const fs = require("fs");
const data = require("../db/db.json");
var noteData;

module.exports =  (app) => {

    // Code for the get api
    app.get("/api/notes", (req, res) => {
        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) {
                throw (err);
            } 
            // returns saved notes as JSON from db.json
            res.json(JSON.parse(data));
        })
    })

    // Post API
    app.post("/api/notes", (req, res) => {
        let note = {
            title: req.body.title,
            text: req.body.text
        };

        // Adds a unique id to each note in the data array
        note.id = Math.floor(Math.random() * 1000);
        

        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) {
                throw (err);
            }
            // Reads file to create array with previous note data and pushes new note
            let noteData = JSON.parse(data);
            noteData.push(note);

            
            

            fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
                if (err) {
                    throw (err);
                }        
                // Writes noteData with the new note added to the db        
                console.log("File has been written");
                res.json(noteData);
            })
        })
    })

    app.delete("/api/notes/:id", (req, res) => {
        let noteId = req.params.id;
        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) {
                throw (err);
            }
            // Reads file to create array with previous note data and pushes new note
            let notes = JSON.parse(data);
            
            // Filters through noteData array for entries with ID's NOT equal to the ID of the note being deleted and creates a new array with those entries
            let newNotes = notes.filter( (note) => note.id != noteId);


            fs.writeFile("./db/db.json", JSON.stringify(newNotes), function (err) {
                if (err) {
                    throw (err);
                }
            });
            res.json("deletion completion");
            })
        })
        
        
        
    
}

