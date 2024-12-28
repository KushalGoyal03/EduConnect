// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import LoginPage from "../pages/LoginPage";
import StudentPage from "../pages/StudentPage";
import TeacherPage from "../pages/TeacherPage";
import AdminPage from "../pages/AdminPage";
// import Timetable from "../components/student/Timetable";
// import Attendance from "../components/student/Attendance";
// import TeacherTimetable from "../components/teacher/Timetable";
// import TeacherAttendance from "../components/teacher/Attendance";

const AppRoutes = ({ userRole, handleLogin }) => (
  <Routes>
    <Route
      path="/"
      element={userRole ? <Navigate to={`/${userRole}`} /> : <IndexPage />}
    />
    <Route
      path="/login"
      element={
        userRole ? (
          <Navigate to={`/${userRole}`} />
        ) : (
          <LoginPage handleLogin={handleLogin} />
        )
      }
    />

    {/* Student routes with nested Timetable and Attendance sub-routes */}
    <Route
      path="/student"
      element={
        userRole === "student" ? (
          <StudentPage />
        ) : userRole ? (
          <Navigate to={`/${userRole}`} />
        ) : (
          <Navigate to="/login" />
        )
      }
    >
      {/* <Route index element={<Timetable />} />
      <Route path="timetable" element={<Timetable />} />
      <Route path="attendance" element={<Attendance />} /> */}
    </Route>

    {/* Teacher route */}
    <Route
      path="/teacher"
      element={
        userRole === "teacher" ? (
          <TeacherPage />
        ) : userRole ? (
          <Navigate to={`/${userRole}`} />
        ) : (
          <Navigate to="/login" />
        )
      }
    >
      {/* <Route index element={<TeacherAttendance />} />
      <Route path="timetable" element={<TeacherTimetable />} />
      <Route path="attendance" element={<TeacherAttendance />} /> */}
    </Route>

    {/* Admin route */}
    <Route
      path="/admin"
      element={
        userRole === "admin" ? (
          <AdminPage />
        ) : userRole ? (
          <Navigate to={`/${userRole}`} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
