import React from "react";
import { Container, Typography } from "@mui/material";

const IndexPage = ({ isLoggedIn }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "2rem",
        color: "white",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        Welcome to EduConnect
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "1.2rem",
        }}
      >
        This is the homepage. Please log in to access your dashboard.
      </Typography>
    </Container>
  );
};

export default IndexPage;
