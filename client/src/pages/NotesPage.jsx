import React from 'react'
import { useState, useEffect } from 'react';
import { MdDelete, MdUpdate } from "react-icons/md";
import axios from 'axios';


const NotesPage = () => {
    const [notes, setNotes] = useState(null);
    const [createForm, setCreateForm] = useState({
      title: "",
      body: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editNoteId, setEditNoteId] = useState(null);
  
    useEffect(() => {
      fetchNotes();
    }, []);
  
    const fetchNotes = async () => {
      // fetch the notes
      const res = await axios.get("http://localhost:3000/notes");
      // set the state
      setNotes(res.data.notes);
      console.log(res);
    }
  
    const updateCreateFormField = (e) => {
      const { name, value } = e.target;
  
      setCreateForm({
        ...createForm,
        [name]: value
      });
    }
  
    const createNote = async (e) => {
      e.preventDefault();
  
      if (isEditing) {
        // update the note
        const res = await axios.put(`http://localhost:3000/notes/${editNoteId}`, createForm);
  
        // update state
        setNotes(notes.map(note => note._id === editNoteId ? res.data.note : note));
  
        // reset form and state
        setIsEditing(false);
        setEditNoteId(null);
      } else {
        // create the note
        const res = await axios.post("http://localhost:3000/notes", createForm);
  
        // update state
        setNotes([...notes, res.data.note]);
      }
  
      // clear form state
      setCreateForm({ title: "", body: "" });
    }
  
    const deleteNote = async (_id) => {
      // Delete the note
      await axios.delete(`http://localhost:3000/notes/${_id}`);
  
      // Update state
      const newNotes = notes.filter(note => note._id !== _id);
      setNotes(newNotes);
    }
  
    const startEditNote = (note) => {
      setCreateForm({ title: note.title, body: note.body });
      setIsEditing(true);
      setEditNoteId(note._id);
    }
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Notes:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes && notes.map(note => (
              <div key={note._id} className="bg-white shadow-md rounded-lg p-4 relative">
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <p>{note.body}</p>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button 
                    onClick={() => deleteNote(note._id)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={24} />
                  </button>
                  <button 
                    onClick={() => startEditNote(note)} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <MdUpdate size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="container mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4">{isEditing ? "Update Note" : "Create Note"}:</h2>
          <form onSubmit={createNote} className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                onChange={updateCreateFormField}
                value={createForm.title}
                type="text"
                name='title'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                Body
              </label>
              <textarea
                onChange={updateCreateFormField}
                value={createForm.body}
                name="body"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type='submit'
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isEditing ? "Update Note" : "Create Note"}
            </button>
          </form>
        </div>
      </div>
      );
}

export default NotesPage