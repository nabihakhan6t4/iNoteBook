import React, { useState, useContext } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import noteContext from "../context/notes/NoteContext";

const BasicModalDialog = ({ open, setOpen, note: initialNote, addNote }) => {
  if (!initialNote) return null; // Don't render if no note is selected

  const [note, setNote] = useState({
    title: initialNote?.title || "",
    description: initialNote?.description || "",
    tag: initialNote?.tag || "",
  });
  

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!note.title.trim() || !note.description.trim()) {
      alert("Title and description cannot be empty!");
      return;
    }
  
    editNote(initialNote._id, note.title, note.description, note.tag); 

 

    setOpen(false); // Modal close karna
  };
  

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Edit Note
        </Typography>

        <TextField
          fullWidth
          label="Title"
          margin="normal"
          name="title"
          value={note.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Tag"
          margin="normal"
          name="tag"
          value={note.tag}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Description"
          margin="normal"
          multiline
          rows={3}
          name="description"
          value={note.description}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default BasicModalDialog;
