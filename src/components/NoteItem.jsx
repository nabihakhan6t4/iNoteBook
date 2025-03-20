import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import noteContext from "../context/notes/NoteContext";

const NoteItem = ({ note, updateNote }) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 2 }}>
      <CardContent>
        {/* Title and Tag in one row */}
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
            onClick={() => updateNote(note)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={() => deleteNote(note._id)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteItem;
