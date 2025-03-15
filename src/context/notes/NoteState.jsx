import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  // const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // add a note
  const addNote = (title, description, tag) => {
    console.log("adding a new note");

    const note = {
      user: "67cc8ef836baf52edceca401",
      title: "yes this is nabihas ttitle2",
      description: "please access playlist2",
      tag: "personal2",
      _id: "67d57def5e49993f9abbc650",
      date: "2025-03-15T13:17:35.023Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = (id) => {};

  // edit a note

  const editNote = (id) => {};
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
