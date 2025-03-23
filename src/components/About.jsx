import React from "react";
import { Container, Typography, Card, CardContent, Grid, Button } from "@mui/material";

const About = () => {
  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      {/* Hero Section */}
      <Typography variant="h3" gutterBottom>
        Welcome to iNoteBook
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Your secure and simple notes management app
      </Typography>

      {/* Features Section */}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
        {["Secure Notes", "Cloud Storage", "Easy Access"].map((feature, index) => (
          <Grid item key={index} xs={12} sm={4}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{feature}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tech Stack */}
      <Typography variant="h5" sx={{ mt: 5 }}>
        Built with:
      </Typography>
      <Typography variant="body1" color="textSecondary">
        React.js | MUI | Node.js | Express | MongoDB
      </Typography>

      {/* Developer Info */}
      <Typography variant="h5" sx={{ mt: 5 }}>
        Developer:
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Nabiha Khan
      </Typography>
      <Button 
        variant="contained" 
        sx={{ mt: 2 }} 
        href="https://github.com/nabihakhan6t4"
        target="_blank"
      >
        Visit GitHub
      </Button>
    </Container>
  );
};

export default About;
