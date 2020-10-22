const router = require('express').Router();
const path = require('path');
const fs = require('fs');
let { notes } = require('../../db/db.json');

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function validateNote(note) {
    if(!note.title || typeof note.title !== 'string'){
        return false;
    }
    if(!note.text || typeof note.text !== 'string'){
        return false;
    }
    return true;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note)

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );

    return note;
}

router.get('/notes', (req, res) => {
    
    res.json(notes)
});

router.delete('/notes/:id', (req, res) => {
    const note = findById(req.params.id, notes);
    console.log(note);
    
    notes = notes.filter(data => data.id !== note.id);
    for(let i=0; i < notes.length; i++){
        notes[i].id = i.toString();
    }

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: notes}, null, 2)
    );

    return res.status(200).json(notes);
});

router.post('/notes', (req, res) => {

    req.body.id = notes.length.toString();
  
    if (!validateNote(req.body)) {
      res.status(400).send('The Note is not properly formatted.');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
});


module.exports = router;