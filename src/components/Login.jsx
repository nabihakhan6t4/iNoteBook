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

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]); 
  const [success, setSuccess] = useState(false); // 🚀 Success state added

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess(false); // 🚀 Reset success state before new request

    const url = `https://backend-ten-lovat-99.vercel.app/api/auth/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
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
        setErrors(json.errors || [{ msg: json.error || "Invalid Credentials" }]);
      }
    } catch (err) {
      setErrors([{ msg: "Something went wrong. Please try again." }]);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
          Login to iNotebook
        </Typography>

        {/* 🚀 Success Message Alert */}
        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            Login Successful! Redirecting...
          </Alert>
        )}

        {/* 🚀 Error Messages */}
        {errors.length > 0 && (
          <Box sx={{ width: "100%", mb: 2 }}>
            {errors.map((err, index) => (
              <Alert key={index} severity="error" sx={{ mb: 1 }}>
                {err.msg}
              </Alert>
            ))}
          </Box>
        )}

        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
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
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, py: 1.5, fontSize: "16px" }}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button
            color="secondary"
            size="small"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
