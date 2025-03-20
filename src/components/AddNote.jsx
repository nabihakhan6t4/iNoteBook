import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const [error, setError] = useState("");

  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.description.trim()) {
      alert("Title and description cannot be empty!");
      return;
    }
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "default" }); // Clear form
  };
  

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, mt: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
          ✏️ Add a New Note
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            name="title"
            value={note.title}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            name="description"
            value={note.description}
          />
          <TextField
            label="Tag"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            name="tag"
            value={note.tag}
          />
          <Box textAlign="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              ➕ Add Note
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddNote;
