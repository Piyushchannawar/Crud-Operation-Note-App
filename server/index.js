// Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require('./config/connectToDb.js');
const notesController = require('./controllers/notesController.js');
const cors = require('cors');

// Load env Variable
dotenv.config();

// create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();





// Routing

app.get('/notes',notesController.fetchNotes);

app.get('/notes/:id',notesController.fetchNote);


app.post('/notes',notesController.createNote );


app.put('/notes/:id',notesController.updateNote);


app.delete('/notes/:id',notesController.deleteNote );





// Start Your Server
app.listen(process.env.PORT,()=>{
    console.log("Server is Running");
})