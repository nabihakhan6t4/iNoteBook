import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // get all   notes
  const getNotes = async () => {
    console.log("adding a new note");
    const url = `${host}/api/notes/fetchallnotes`;
    // api call
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjYzhlZjgzNmJhZjUyZWRjZWNhNDAxIn0sImlhdCI6MTc0MTQ1OTIxMH0.180oLcOUpUOGheBLHJ8sexsPpr968Akwos2th5xKogc",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    console.log("adding a new note");
    const url = `${host}/api/notes/addnote`;
    // api call
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjYzhlZjgzNmJhZjUyZWRjZWNhNDAxIn0sImlhdCI6MTc0MTQ1OTIxMH0.180oLcOUpUOGheBLHJ8sexsPpr968Akwos2th5xKogc",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    const note = {
      user: "67cc8ef836baf52edceca401",
      title: title,
      description: description,
      tag: tag,
      _id: "67d57def5e49993f9abbc650",
      date: "2025-03-15T13:17:35.023Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    // api call
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjYzhlZjgzNmJhZjUyZWRjZWNhNDAxIn0sImlhdCI6MTc0MTQ1OTIxMH0.180oLcOUpUOGheBLHJ8sexsPpr968Akwos2th5xKogc",
      },
    });
    const json = response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);

    console.log("deleting the note with id", id);
  };

  // edit a note

  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    // api call
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjYzhlZjgzNmJhZjUyZWRjZWNhNDAxIn0sImlhdCI6MTc0MTQ1OTIxMH0.180oLcOUpUOGheBLHJ8sexsPpr968Akwos2th5xKogc",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // logic to edit  in client
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
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
