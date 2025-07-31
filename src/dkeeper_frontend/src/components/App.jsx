import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch the user's notes from the backend when the app loads.
    fetchData();
  }, []);

  async function fetchData() {
    try {
      console.log("--- Frontend Log: Fetching notes from backend...");
      const notesArray = await dkeeper_backend.readNotes();
      console.log("--- Frontend Log: Notes received from backend:", notesArray);
      setNotes(notesArray);
    } catch (error) {
      console.error("Error fetching notes:", error);
      // You might want to show an error message to the user here
    }
  }

  async function addNote(newNote) {
    try {
      console.log("--- Frontend Log: Sending new note to backend:", newNote);
      await dkeeper_backend.createNote(newNote.title, newNote.content);
      console.log("--- Frontend Log: Note added. Re-fetching data...");
      fetchData(); // Re-fetch notes to update the UI with the new note.
    } catch (error) {
      console.error("Error adding note:", error);
      // You might want to show an error message to the user here
    }
  }

  async function deleteNote(id) {
    console.log("--- Frontend Log: Deleting note with id:", id);
    await dkeeper_backend.removeNote(id);
    console.log("--- Frontend Log: Note deleted. Re-fetching data...");
    fetchData(); // Re-fetch notes to update the UI after deletion.
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
