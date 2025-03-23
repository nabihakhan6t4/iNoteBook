import React from "react";
import { Container, Typography, Card, CardContent, Grid, Button, Box } from "@mui/material";
import { Info, Security, Cloud, Speed, Code, Person } from "@mui/icons-material";

const About = () => {
  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e3c72, #2a5298)", color: "white", py: 5 }}>
      <Container sx={{ textAlign: "center" }}>
        {/* Hero Section */}
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
          🚀 Welcome to iNoteBook
        </Typography>
        <Typography variant="h6" color="white" gutterBottom>
          Your secure and simple notes management app
        </Typography>

        {/* Features Section */}
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
          {[
            { text: "Secure Notes", icon: <Security fontSize="large" /> },
            { text: "Cloud Storage", icon: <Cloud fontSize="large" /> },
            { text: "Easy Access", icon: <Speed fontSize="large" /> },
          ].map((feature, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <Card sx={{ p: 2, boxShadow: 5, textAlign: "center", background: "#ffffff10", color: "white" }}>
                <CardContent>
                  {feature.icon}
                  <Typography variant="h6" sx={{ mt: 1 }}>{feature.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tech Stack */}
        <Typography variant="h5" sx={{ mt: 5, fontWeight: "bold" }}>
          🔧 Built with:
        </Typography>
        <Typography variant="body1" color="white">
          React.js | MUI | Node.js | Express | MongoDB
        </Typography>

        {/* Developer Info */}
        <Box sx={{ mt: 5, p: 3, background: "#ffffff20", borderRadius: "10px" }}>
          <Person fontSize="large" />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            👩‍💻 Developer:
          </Typography>
          <Typography variant="body1" color="white">
            Nabiha Khan
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 2, backgroundColor: "#ff9800", "&:hover": { backgroundColor: "#e68900" } }}
            href="https://github.com/nabihakhan6t4"
            target="_blank"
          >
            Visit GitHub
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
