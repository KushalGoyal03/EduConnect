import React from "react";
import { Typography, Toolbar, AppBar, Container, Box } from "@mui/material";

const Footer = ({ appName }) => {
  return (
    <AppBar
      position="static"
      sx={{
        top: "auto",
        bottom: 0,
        background:
          "linear-gradient(to bottom, rgba(50, 41, 68, 0.5), rgba(37, 17, 80, 0.9))",
      }}
    >
      <Toolbar>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1, // Padding for the top and bottom
            }}
          >
            <Typography variant="body1" color="inherit">
              &copy; {new Date().getFullYear()} {appName}. All Rights Reserved.
            </Typography>
            <Typography variant="body2" color="inherit">
              Powered by EduConnect
            </Typography>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
