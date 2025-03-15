import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import Notes from "./Notes";
import AddNote from "./AddNote";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
  };

  // Handle Add Note
  const handleAddNote = (e) => {
    e.preventDefault();
    console.log("New Note:", { noteTitle, noteDescription });
    setNoteTitle("");
    setNoteDescription("");
  };

  return (
    <Container maxWidth="md">
      {/* Hero Section */}
      <Box textAlign="center" my={4}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          📝 Welcome to iNotebook
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Save & manage your notes efficiently!
        </Typography>
      </Box>

      <AddNote />

      {/* Notes Display Section */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Your Notes
        </Typography>
        <Notes />
      </Box>

      {/* Footer Section */}
      <Box
        textAlign="center"
        mt={4}
        py={3}
        bgcolor="primary.main"
        color="white"
      >
        <Typography variant="body1">Developed by Nabiha Khan</Typography>
        <Typography variant="body2">
          © 2025 iNotebook. All Rights Reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
