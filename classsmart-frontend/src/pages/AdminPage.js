/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
//import DeleteConfirmationDialog from "../components/admin/DeleteConfirmationDialog";

const AdminPage = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(""); // New state for ID
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [activeSection, setActiveSection] = useState("register"); // Default to register section
  //   const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  //   const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  // State for Teacher Records
  //   const [isTeacherDialogOpen, setIsTeacherDialogOpen] = useState(false);
  //   const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  //   // State for Student Records
  //   const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  //   const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleRegister = () => {
    // Check if all fields are filled
    if (username && password && userType && userId) {
      // Check for duplicate userId and role combination
      const isDuplicate = users.some(
        (user) => user.id === userId && user.role === userType
      );
      //   if (isDuplicate) {
      //     // Show error message for duplicate ID and role
      //     setErrorSnackbarOpen(true); // Separate Snackbar for errors
      //     return;
      //   }

      // Create a new user object
      const newUser = { id: userId, username, password, role: userType };

      // Add the new user to the list
      setUsers([...users, newUser]);

      // Clear input fields
      setUsername("");
      setPassword("");
      setUserType("");
      setUserId("");

      // Show success Snackbar
      // setSnackbarOpen(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleDelete = (userIdToDelete, recordTypeToDelete) => {
    const filteredUsers = users.filter(
      (user) =>
        !(user.id === userIdToDelete && user.role === recordTypeToDelete)
    );
    setUsers(filteredUsers);
  };

  //   const handleTeacherDeleteClick = (id) => {
  //     setSelectedTeacherId(id);
  //     setIsTeacherDialogOpen(true);
  //   };

  //   const handleCancelDeleteTeacher = () => {
  //     setIsTeacherDialogOpen(false);
  //   };

  //   // Student Delete Handlers
  //   const handleStudentDeleteClick = (id) => {
  //     setSelectedStudentId(id);
  //     setIsStudentDialogOpen(true);
  //   };

  //   const handleCancelDeleteStudent = () => {
  //     setIsStudentDialogOpen(false);
  //   };

  //   const handleDeleteStudentRecord = (recordType, recordId) => {
  //     // Common logic for deleting a record
  //     // console.log(`Deleted ${recordType} with ID: ${recordId}`);

  //     handleDelete(recordId, recordType);

  //     // Handle closing the dialog and resetting the selected record
  //     setIsStudentDialogOpen(false);
  //     setSelectedStudentId(null);
  //   };

  //   const handleDeleteTeacherRecord = (recordType, recordId) => {
  //     // Common logic for deleting a record
  //     // console.log(`Deleted ${recordType} with ID: ${recordId}`);

  //     handleDelete(recordId, recordType);

  //     // Handle closing the dialog and resetting the selected record
  //     setIsTeacherDialogOpen(false);
  //     setSelectedTeacherId(null);
  //   };

  //   const handleConfirmDeleteStudent = () => {
  //     handleDeleteStudentRecord("student", selectedStudentId); // Call common delete function
  //   };

  //   const handleConfirmDeleteTeacher = () => {
  //     handleDeleteTeacherRecord("teacher", selectedTeacherId); // Call common delete function
  //   };

  //   const handleCloseSnackbar = () => {
  //     setSnackbarOpen(false);
  //   };

  //   // Function to close the error Snackbar
  //   const handleCloseErrorSnackbar = () => {
  //     setErrorSnackbarOpen(false);
  //   };

  // Filter users by role
  const teacherRecords = users.filter((user) => user.role === "teacher");
  const studentRecords = users.filter((user) => user.role === "student");

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Admin Dashboard
      </Typography>

      {/* Buttons for toggling between sections */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
          position: "relative", // Ensure consistent button height
          paddingBottom: "1rem", // Add some padding to maintain layout
        }}
      >
        <Button
          variant={activeSection === "register" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => handleSectionChange("register")}
          sx={{
            marginRight: "0.5rem",
            width: "100px", // Reduced button size
            background:
              "linear-gradient(to bottom, rgba(37, 17, 80, 0.9), rgba(50, 41, 68, 0.5))",
            fontSize: "0.8rem", // Smaller text size
            padding: "0.1rem",
          }}
        >
          Register
        </Button>
        <Button
          variant={activeSection === "teacher" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => handleSectionChange("teacher")}
          sx={{
            marginRight: "1rem",
            width: "130px", // Reduced button size
            fontSize: "0.8rem", // Smaller text size
            padding: "0.1rem",
            background:
              "linear-gradient(to bottom, rgba(37, 17, 80, 0.9), rgba(50, 41, 68, 0.5))",
          }}
        >
          Teacher Records
        </Button>
        <Button
          variant={activeSection === "student" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => handleSectionChange("student")}
          sx={{
            width: "130px", // Reduced button size
            fontSize: "0.8rem", // Smaller text size
            padding: "0.1rem",
            background:
              "linear-gradient(to bottom, rgba(37, 17, 80, 0.9), rgba(50, 41, 68, 0.5))",
          }}
        >
          Student Records
        </Button>
      </Box>

      {/* Register Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: "400px", // Ensure this section has a minimum height
          display: activeSection === "register" ? "block" : "none", // Only display when active
        }}
      >
        <TextField
          label="User ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{
            marginBottom: "0.5rem", // Reduced gap between fields
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Change the border color
              },
              "&:hover fieldset": {
                borderColor: "white", // Change border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Change border color when focused
              },
            },
            "& .MuiInputBase-input": {
              color: "white", // Change the text color
            },
            "& .MuiInputLabel-root": {
              color: "white", // Color of the label when not focused
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // Color of the label when focused
            },
          }}
        />

        <FormControl
          fullWidth
          margin="normal"
          sx={{
            marginBottom: "0.5rem", // Reduced gap between fields
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Change the border color
              },
              "&:hover fieldset": {
                borderColor: "white", // Change border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Change border color when focused
              },
            },
            "& .MuiInputBase-input": {
              color: "white", // Change the text color
            },
            "& .MuiInputLabel-root": {
              color: "white", // Color of the label when not focused
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // Color of the label when focused
            },
          }}
        >
          <InputLabel>User Type</InputLabel>
          <Select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            label="User Type"
            sx={{ width: "100%" }}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            marginBottom: "0.5rem", // Reduced gap between fields
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Change the border color
              },
              "&:hover fieldset": {
                borderColor: "white", // Change border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Change border color when focused
              },
            },
            "& .MuiInputBase-input": {
              color: "white", // Change the text color
            },
            "& .MuiInputLabel-root": {
              color: "white", // Color of the label when not focused
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // Color of the label when focused
            },
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            marginBottom: "0.5rem", // Reduced gap between fields
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Change the border color
              },
              "&:hover fieldset": {
                borderColor: "white", // Change border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Change border color when focused
              },
            },
            "& .MuiInputBase-input": {
              color: "white", // Change the text color
            },
            "& .MuiInputLabel-root": {
              color: "white", // Color of the label when not focused
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // Color of the label when focused
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        <Button
          onClick={handleRegister}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: "1rem",
            background:
              "linear-gradient(to bottom, rgba(37, 17, 80, 0.9), rgba(50, 41, 68, 0.5))",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Register User
        </Button>
      </Box>

      {/* Success Snackbar */}
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          User registered successfully!
        </Alert>
      </Snackbar> */}

      {/* Error Snackbar */}
      {/* <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseErrorSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        severity="error"
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error: Duplicate User ID and Role combination!
        </Alert>
      </Snackbar> */}

      {/* Teacher Records Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: "400px", // Ensure this section has a minimum height
          display: activeSection === "teacher" ? "block" : "none", // Only display when active
        }}
      >
        {teacherRecords.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // Fill the available height
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            No record available.
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "1rem",
              background:
                "linear-gradient(to bottom, rgba(37, 17, 80, 0.9), rgba(50, 41, 68, 0.5))",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="teacher records table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    USERNAME
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    PASSWORD
                  </TableCell>
                  {/* <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    ROLE
                  </TableCell> */}
                  {/* <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    DELETE
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {teacherRecords.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell sx={{ color: "white" }}>{user.id}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {user.username}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {user.password}
                    </TableCell>
                    {/* <TableCell sx={{ color: "white" }}>{user.role}</TableCell> */}
                    {/* <TableCell>
                      <Button
                        onClick={() => handleTeacherDeleteClick(user.id)}
                        color="secondary"
                        sx={{ color: "white", background: "red" }}
                        variant="contained"
                        size="small"
                      >
                        Delete
                      </Button>
                     // { Delete Confirmation Dialog }
                      <DeleteConfirmationDialog
                        open={isTeacherDialogOpen}
                        onClose={handleCancelDeleteTeacher}
                        onConfirm={handleConfirmDeleteTeacher}
                        itemName="teacher record"
                      />
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Student Records Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: "400px", // Ensure this section has a minimum height
          display: activeSection === "student" ? "block" : "none", // Only display when active
        }}
      >
        {studentRecords.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // Fill the available height
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            No record available.
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "1rem",
              background:
                "linear-gradient(to bottom, rgba(37, 17, 80, 0.9), rgba(50, 41, 68, 0.5))",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="student records table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    USERNAME
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    PASSWORD
                  </TableCell>
                  {/* <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    ROLE
                  </TableCell> */}
                  {/* <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    DELETE
                  </TableCell>{" "} */}
                </TableRow>
              </TableHead>
              <TableBody>
                {studentRecords.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell sx={{ color: "white" }}>{user.id}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {user.username}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {user.password}
                    </TableCell>
                    {/* <TableCell sx={{ color: "white" }}>{user.role}</TableCell> */}
                    {/* <TableCell>
                      <Button
                        onClick={() => handleStudentDeleteClick(user.id)}
                        color="secondary"
                        sx={{ color: "white", background: "red" }}
                        variant="contained"
                        size="small"
                      >
                        Delete
                      </Button>
                      //{ Delete Confirmation Dialog }
                      <DeleteConfirmationDialog
                        open={isStudentDialogOpen}
                        onClose={handleCancelDeleteStudent}
                        onConfirm={handleConfirmDeleteStudent}
                        itemName="student record"
                      />
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default AdminPage;
