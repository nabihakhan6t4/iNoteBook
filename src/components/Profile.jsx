import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Edit, CameraAlt } from "@mui/icons-material";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", bio: "", phone: "", location: "", gender: "", avatar: "" });
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleEdit = () => {
    setOpen(true);
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setUser((prevUser) => ({ ...prevUser, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e3c72, #2a5298)", color: "white", py: 5 }}>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ maxWidth: 400, textAlign: "center", p: 3, boxShadow: 5, background: "#ffffff10", color: "white" }}>
          <Box position="relative" display="inline-block">
            <Avatar
              src={user.avatar || "https://placehold.co/150"}
              alt={user.name}
              sx={{ width: 100, height: 100, margin: "0 auto", border: "3px solid white" }}
            />
            <input type="file" accept="image/*" id="imageUpload" hidden onChange={handleImageChange} />
            <label htmlFor="imageUpload">
              <IconButton
                component="span"
                sx={{ position: "absolute", bottom: 0, right: 0, background: "rgba(0,0,0,0.5)", color: "white" }}
              >
                <CameraAlt />
              </IconButton>
            </label>
          </Box>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">{user.name || "Your Name"}</Typography>
            <Typography variant="body1" color="white">{user.email || "your@email.com"}</Typography>
            <Typography variant="body2" color="white" sx={{ mt: 1 }}>{user.bio || "No bio available"}</Typography>
            <Typography variant="body2" color="white">{user.phone || "Phone: Not set"}</Typography>
            <Typography variant="body2" color="white">{user.location || "Location: Not set"}</Typography>
            <Typography variant="body2" color="white">{user.gender || "Gender: Not set"}</Typography>
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={handleEdit}
              sx={{ mt: 2, backgroundColor: "#ff9800", "&:hover": { backgroundColor: "#e68900" } }}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </Container>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" margin="dense" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
          <TextField fullWidth label="Email" margin="dense" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          <TextField fullWidth label="Bio" margin="dense" value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} />
          <TextField fullWidth label="Phone" margin="dense" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
          <TextField fullWidth label="Location" margin="dense" value={user.location} onChange={(e) => setUser({ ...user, location: e.target.value })} />
          <TextField fullWidth label="Gender" margin="dense" value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
