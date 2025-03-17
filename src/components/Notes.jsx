import React, { useContext, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import BasicModalDialog from "./Modal";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  const updateNote = (note) => {};
  return (
    <>
      <div className="container" style={{ marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          📒 Your Notes
        </Typography>

        <BasicModalDialog />
        {notes.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary">
            No notes available. Add some notes! 😊
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note._id}>
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
