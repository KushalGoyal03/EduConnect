/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ appName, userRole, handleLogout }) => {
  // const [drawerOpen, setDrawerOpen] = useState(false);

  //   const toggleDrawer = (open) => () => {
  //     setDrawerOpen(open);
  //   };

  return (
    <AppBar
      position="static"
      sx={{
        mb: 2,
        background:
          "linear-gradient(to bottom, rgba(37, 17, 80, 0.9), rgba(50, 41, 68, 0.5))",
      }}
    >
      <Toolbar>
        {/* {(userRole === "student" || userRole === "teacher") && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            // onClick={toggleDrawer(true)}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )} */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {appName}
        </Typography>
        {userRole ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to={`/${userRole}`}
              sx={{ marginRight: 2 }}
            >
              {userRole === "student"
                ? "Student Dashboard"
                : userRole === "teacher"
                ? "Teacher Dashboard"
                : "Admin Dashboard"}
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ marginRight: 2 }}
            >
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>

      {/* Drawer for student and teacher navigation links */}
      {/* {(userRole === "student" || userRole === "teacher") && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 250,
              background:
                "linear-gradient(to bottom, rgba(37, 17, 80, 0.8), rgba(50, 41, 68, 0.8))", // Drawer background color
              color: "white", // Text color inside the drawer
              boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.3)", // Shadow effect
            },
          }}
        >
          <Box
            sx={{
              padding: "20px 10px", // Padding for drawer content
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List sx={{ width: "100%" }}>
              {userRole === "student" && (
                <>
                  <ListItem button component={Link} to="/student/timetable">
                    <ListItemText
                      primary="Time Table"
                      sx={{
                        color: "white",
                        fontWeight: "bold", // Bold text for items
                        "&:hover": {
                          backgroundColor: "#6a46b3", // Hover effect
                        },
                      }}
                    />
                  </ListItem>
                  <ListItem button component={Link} to="/student/attendance">
                    <ListItemText
                      primary="Attendance"
                      sx={{
                        color: "white",
                        fontWeight: "bold", // Bold text for items
                        "&:hover": {
                          backgroundColor: "#6a46b3", // Hover effect
                        },
                      }}
                    />
                  </ListItem>
                </>
              )}

              {userRole === "teacher" && (
                <>
                  <ListItem button component={Link} to="/teacher/attendance">
                    <ListItemText
                      primary="Mark Attendance"
                      sx={{
                        color: "white",
                        fontWeight: "bold", // Bold text for items
                        "&:hover": {
                          backgroundColor: "#6a46b3", // Hover effect
                        },
                      }}
                    />
                  </ListItem>
                  <ListItem button component={Link} to="/teacher/timetable">
                    <ListItemText
                      primary="Timetable"
                      sx={{
                        color: "white",
                        fontWeight: "bold", // Bold text for items
                        "&:hover": {
                          backgroundColor: "#6a46b3", // Hover effect
                        },
                      }}
                    />
                  </ListItem>
                </>
              )}
            </List>
            <Divider sx={{ backgroundColor: "#fff", marginY: 1 }} />
            <List sx={{ width: "100%" }}>
          
            </List>
          </Box>
        </Drawer>
      )} */}
    </AppBar>
  );
};

export default Navbar;
