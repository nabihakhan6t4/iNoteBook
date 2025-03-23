import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]); 
  const [success, setSuccess] = useState(false); // 🚀 Success state added

  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess(false); // 🚀 Reset success state before new request

    const { name, email, password } = credentials;

    if (!validateEmail(email)) {
      setErrors([{ msg: "Please enter a valid email address!" }]);
      setLoading(false);
      return;
    }

    const url = `http://localhost:5000/api/auth/createuser`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        setSuccess(true); // 🚀 Show success alert
        setTimeout(() => {
          navigate("/"); // 🚀 Redirect after 3 seconds
        }, 3000);
      } else {
        setErrors(json.errors || [{ msg: json.error || "Signup Failed!" }]);
      }
    } catch (err) {
      setErrors([{ msg: "Something went wrong. Please try again." }]);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value.trim() });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        elevation={5}
        sx={{
          p: 4,
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Create an Account
        </Typography>

        {/* 🚀 Show Success Message */}
        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            Signup successful! Redirecting...
          </Alert>
        )}

        {/* 🚀 Show Errors If Any */}
        {errors.length > 0 && (
          <Box sx={{ width: "100%", mb: 2 }}>
            {errors.map((err, index) => (
              <Alert key={index} severity="error" sx={{ mb: 1 }}>
                {err.msg}
              </Alert>
            ))}
          </Box>
        )}

        <Box component="form" onSubmit={handleSignup} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            variant="outlined"
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            minLength={5}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, py: 1.5, fontSize: "16px" }}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button
            color="secondary"
            size="small"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
