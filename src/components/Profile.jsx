import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
} from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch("https://backend-ten-lovat-99.vercel.app/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          setUser(json);
        } else {
          setError(json.error || "Failed to fetch user data");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ minHeight: "100vh", background: "#f0f2f5", py: 5 }}>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ maxWidth: 400, textAlign: "center", p: 3, boxShadow: 5 }}>
          <Avatar
            src={user?.avatar || "https://placehold.co/150"}
            alt={user?.name}
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
          <CardContent>
            <Typography variant="h5" fontWeight="bold">{user?.name || "Your Name"}</Typography>
            <Typography variant="body1">{user?.email || "your@email.com"}</Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
