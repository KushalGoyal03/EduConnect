import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
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

const AdminPage = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState("register");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  useEffect(() => {
    // Fetch users from the backend on page load
    axios
      .get("http://localhost:5000/api/admin/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching users:", error);
      });
  }, []);

  const handleRegister = () => {
    if (username && password && userType && email) {
      const newUser = { email, username, password, role: userType };
      axios
        .post("http://localhost:5000/api/admin/register", newUser)
        .then((response) => {
          // Update the users list after successful registration
          setUsers([...users, newUser]);
          setUsername("");
          setPassword("");
          setUserType("");
          setEmail("");
          setSnackbarOpen(true);
        })
        .catch((error) => {
          setErrorSnackbarOpen(true);
        });
    }
  };

  const handleDelete = (emailToDelete) => {
    axios
      .delete("http://localhost:5000/api/admin/user", {
        data: { email: emailToDelete },
      }) // Send email in the request body
      .then((response) => {
        setUsers(users.filter((user) => user.email !== emailToDelete));
      })
      .catch((error) => {
        console.error("There was an error deleting the user:", error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseErrorSnackbar = () => {
    setErrorSnackbarOpen(false);
  };

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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
          position: "relative",
          paddingBottom: "1rem",
        }}
      >
        <Button
          variant={activeSection === "register" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => handleSectionChange("register")}
          sx={{
            marginRight: "0.5rem",
            width: "100px",
            fontSize: "0.8rem",
            background:
              "linear-gradient(to bottom, rgba(37, 17, 80, 0.9), rgba(50, 41, 68, 0.8))",
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
            width: "130px",
            fontSize: "0.8rem",
            background:
              "linear-gradient(to bottom, rgba(37, 17, 80, 0.9), rgba(50, 41, 68, 0.8))",
          }}
        >
          Teacher Records
        </Button>
        <Button
          variant={activeSection === "student" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => handleSectionChange("student")}
          sx={{
            width: "130px",
            fontSize: "0.8rem",
            background:
              "linear-gradient(to bottom, rgba(37, 17, 80, 0.9), rgba(50, 41, 68, 0.8))",
          }}
        >
          Student Records
        </Button>
      </Box>

      {/* Register Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: "400px",
          display: activeSection === "register" ? "block" : "none",
        }}
      >
        {/* User Registration Form */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            style: { color: "white" }, // Change label color
          }}
          sx={{
            "& fieldset": {
              borderColor: "white",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: "white", // Text color of the input
            },
          }}
        />
        <FormControl
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputLabel-root": {
              color: "white", // Label color
              "&.Mui-focused": {
                color: "white", // Label color on focus
              },
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "white", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color on focus
              },
              "& input": {
                color: "white", // Input text color
              },
            },
            "& .MuiSvgIcon-root": {
              color: "white", // Dropdown arrow color
            },
          }}
        >
          <InputLabel
            id="user-type-label"
            sx={{
              color: "white",
            }}
          >
            User Type
          </InputLabel>
          <Select
            labelId="user-type-label"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            label="User Type"
            sx={{
              "& .MuiOutlinedInput-input": {
                color: "white", // Text color of the input
              },
            }}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            {/* <MenuItem value="admin">Admin</MenuItem> */}
          </Select>
        </FormControl>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputLabelProps={{
            style: { color: "white" }, // Change label color
          }}
          sx={{
            "& fieldset": {
              borderColor: "white",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: "white", // Text color of the input
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
          InputProps={{
            endAdornment: (
              <IconButton onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
          InputLabelProps={{
            style: { color: "white" }, // Change label color
          }}
          sx={{
            "& fieldset": {
              borderColor: "white",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: "white", // Text color of the input
            },
          }}
        />
        <Button
          onClick={handleRegister}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            background:
              "linear-gradient(to bottom, rgba(37, 17, 80, 0.9), rgba(50, 41, 68, 0.9))",
          }}
        >
          Register User
        </Button>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          User registered successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseErrorSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error: Unable to register user!
        </Alert>
      </Snackbar>

      {/* Teacher Records */}
      <Box
        sx={{
          width: "100%",
          minHeight: "400px",
          display: activeSection === "teacher" ? "block" : "none",
        }}
      >
        <Typography variant="h6">Teacher Records</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teacherRecords.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user.email)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Student Records */}
      <Box
        sx={{
          width: "100%",
          minHeight: "400px",
          display: activeSection === "student" ? "block" : "none",
        }}
      >
        <Typography variant="h6">Student Records</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentRecords.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user.email)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminPage;
