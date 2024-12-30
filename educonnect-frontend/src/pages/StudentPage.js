import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes

const StudentPage = () => {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Render the selected nested route content */}
      <Box sx={{ p: 3 }}>
        <Outlet />{" "}
        {/* This will render Timetable or Attendance based on the nested route */}
      </Box>
    </Box>
  );
};

export default StudentPage;
