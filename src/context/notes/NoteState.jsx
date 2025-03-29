import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://backend-ten-lovat-99.vercel.app";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // get all   notes
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    // api call
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    setNotes(json);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    if (!title || !description || !tag) {
      console.error("All fields are required!");
      return;
    }

    const url = `${host}/api/notes/addnote`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        console.error("Failed to add note:", response.statusText);
        return;
      }

      const note = await response.json();
      setNotes([...notes, note]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // delete a note
  const deleteNote = async (id) => {
    if (!id) {
      console.error("Note ID is undefined!");
      return;
    }
    const url = `${host}/api/notes/deletenote/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        console.error("Failed to delete note:", response.statusText);
        return;
      }

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // edit a note

  const editNote = async (id, title, description, tag) => {
    if (!id) {
      console.error("Note ID is undefined!");
      return;
    }

    const url = `${host}/api/notes/updatenote/${id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        console.error("Failed to update note:", response.statusText);
        return;
      }

      const json = await response.json();
      let newNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, title, description, tag };
        }
        return note;
      });

      setNotes(newNotes);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ getNotes, notes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
