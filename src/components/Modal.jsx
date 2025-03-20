import React, { useState, useContext } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import noteContext from "../context/notes/NoteContext";

const BasicModalDialog = ({ open, setOpen, note: initialNote }) => {
  if (!initialNote) return null; // Don't render if no note is selected

  const [note, setNote] = useState({
    title: initialNote?.title || "",
    description: initialNote?.description || "",
    tag: initialNote?.tag || "",
  });

  const [errors, setErrors] = useState({ title: "", tag: "" }); // Define errors state

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });

    // Clear error message when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const context = useContext(noteContext);
  const { editNote } = context;

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (note.title.trim().length < 5) newErrors.title = "Title must be at least 5 characters long!";
    if (note.tag.trim().length < 5) newErrors.tag = "Tag must be at least 5 characters long!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop form submission if there are errors
    }

    editNote(initialNote._id, note.title, note.description, note.tag);
    setOpen(false); // Close modal
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
          error={!!errors.title}
          helperText={errors.title}
          required
        />
        <TextField
          fullWidth
          label="Tag"
          margin="normal"
          name="tag"
          value={note.tag}
          onChange={handleChange}
          error={!!errors.tag}
          helperText={errors.tag}
          required
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
