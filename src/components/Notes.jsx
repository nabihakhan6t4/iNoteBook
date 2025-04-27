import React, { useContext, useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { v4 as uuidv4 } from "uuid";
import BasicModalDialog from "./Modal";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [getNotes, navigate]);

  // Function to open modal and set the current note
  const updateNote = (note) => {
    setCurrentNote(note); // Store the selected note
    setOpen(true); // Open modal
  };

  return (
    <>
      <div className="container" style={{ marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          📒 Your Notes
        </Typography>

        {/* Modal Component (conditionally rendered) */}
        <BasicModalDialog open={open} setOpen={setOpen} note={currentNote} />

        {notes.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary">
            No notes available. Add some notes! 😊
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note._id || uuidv4()}>
                <NoteItem note={note} updateNote={updateNote} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
};

export default Notes;