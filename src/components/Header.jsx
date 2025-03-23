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
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Yahan useNavigate hook ko sahi jagah initialize kiya

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Drawer Content
  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>

        {!localStorage.getItem("token") ? (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/signup">
              <ListItemText primary="Signup" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#212121" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              iNotebook
            </Link>
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              color={location.pathname === "/" ? "secondary" : "inherit"}
              component={Link}
              to="/"
            >
              Home
            </Button>

            <Button
              color={location.pathname === "/about" ? "secondary" : "inherit"}
              component={Link}
              to="/about"
            >
              About
            </Button>
          </Box>

          {!localStorage.getItem("token") ? (
            <>
              <Button color="success" component={Link} to="/login">
                Login
              </Button>
              <Button color="primary" component={Link} to="/signup">
                Signup
              </Button>
            </>
          ) : (
            <>
              <Button
                color={
                  location.pathname === "/profile" ? "secondary" : "inherit"
                }
                component={Link}
                to="/profile"
              >
                Profile
              </Button>
              <Button color="error" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "white" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
