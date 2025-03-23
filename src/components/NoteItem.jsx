import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import noteContext from "../context/notes/NoteContext";

const NoteItem = ({ note, updateNote }) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const [alertMessage, setAlertMessage] = useState(""); 
  const [alertOpen, setAlertOpen] = useState(false); 

  const handleDelete = (id) => {
    deleteNote(id);
    setAlertMessage("Note deleted successfully!"); 
    setAlertOpen(true);
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 2, p: 2 }}>
      <CardContent>
        {/* ✅ Show Success Alert */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={5000} 
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity="success"
            action={
              <IconButton
                size="small"
                color="inherit"
                onClick={() => setAlertOpen(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {alertMessage}
          </Alert>
        </Snackbar>

        {/* Title and Tag */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6" color="primary">
            {note.title}
          </Typography>
          <Chip label={note.tag} color="secondary" size="small" />
        </Box>

        {/* Description */}
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {note.description}
        </Typography>

        {/* Edit & Delete Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            color="warning"
            onClick={() => updateNote(note)} // ✅ Call Edit Function
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={() => handleDelete(note._id)} // ✅ Call Delete Function
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteItem;
