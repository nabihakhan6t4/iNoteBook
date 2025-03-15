import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const location = useLocation();
  const isLoggedIn = true; 
  const [mobileOpen, setMobileOpen] = useState(false); 

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer Content
  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/notes">
          <ListItemText primary="My Notes" />
        </ListItem>
        <ListItem button component={Link} to="/addnote">
          <ListItemText primary="Add Note" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={isLoggedIn ? "/logout" : "/login"}
        >
          <ListItemText primary={isLoggedIn ? "Logout" : "Login"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#212121" }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              iNotebook
            </Link>
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              color={location.pathname === "/" ? "secondary" : "inherit"}
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              color={location.pathname === "/notes" ? "secondary" : "inherit"}
              component={Link}
              to="/notes"
            >
              My Notes
            </Button>
            <Button
              color={location.pathname === "/addnote" ? "secondary" : "inherit"}
              component={Link}
              to="/addnote"
            >
              Add Note
            </Button>
            <Button
              color={location.pathname === "/profile" ? "secondary" : "inherit"}
              component={Link}
              to="/profile"
            >
              Profile
            </Button>
          </Box>

          {/* Login / Logout Button */}
          {isLoggedIn ? (
            <Button color="error" component={Link} to="/logout">
              Logout
            </Button>
          ) : (
            <Button color="success" component={Link} to="/login">
              Login
            </Button>
          )}

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "white" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
