const Note = require('../models/note.js')
const fetchNotes = async(req,res)=>{
    // Find the notes and respond with it
    const notes = await Note.find();
    //Respond with them
    res.json({notes})
};


const fetchNote = async(req,res)=>{
    // Get the id of Url
    const noteId = req.params.id;

    // FInd the Note using that id
    const note = await Note.findById(noteId);
    // Responce with the note
    res.json({note});
};

const createNote = async (req,res)=>{
    // get the Send Data of Request Body
    const {title,body} = req.body;
    // Create a Note with it
   const note =  await Note.create({
        title:title,
        body:body,
    })
    // Send a response with new note
   res.json({note})
};


const updateNote = async(req,res)=>{
    // get id of url
    const noteId = req.params.id;
    // get the data of request body
    const {title,body} = req.body;
   // find and update the record
    await Note.findByIdAndUpdate(noteId,{
       title,
       body,
   })
   const note = await Note.findById(noteId);
   // respond with it
   res.json({note});
};


const deleteNote = async (req, res) => {
    const noteId = req.params.id;
    // Delete the record
    const deletedNote = await Note.findByIdAndDelete(noteId);
  
    res.json({ message: 'Note deleted successfully' });

};

module.exports = {
 fetchNotes :fetchNotes,
 fetchNote:fetchNote,
 updateNote:updateNote,
 deleteNote:deleteNote,
 createNote:createNote

}