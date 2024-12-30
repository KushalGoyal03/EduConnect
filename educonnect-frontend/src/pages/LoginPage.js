import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  Container,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      // Replace with your backend API URL
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      // Handle the role-based navigation
      handleLogin(data.role);

      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "teacher") {
        navigate("/teacher");
      } else if (data.role === "student") {
        navigate("/student");
      } else {
        setErrorMessage("Invalid user role.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Login
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errorMessage && !email}
          helperText={errorMessage && !email ? "Email is required." : ""}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errorMessage && !password}
          helperText={errorMessage && !password ? "Password is required." : ""}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            sx={{ textAlign: "center" }}
          >
            {errorMessage}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   IconButton,
//   Typography,
//   CircularProgress,
//   Container,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const LoginPage = ({ handleLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!username || !password) {
//       setErrorMessage("Both fields are required");
//       return;
//     }
//     setErrorMessage("");
//     setIsLoading(true);

//     setTimeout(() => {
//       if (username === "student" && password === "password") {
//         handleLogin("student");
//         navigate("/student");
//       } else if (username === "teacher" && password === "password") {
//         handleLogin("teacher");
//         navigate("/teacher");
//       } else if (username === "admin" && password === "adminpass") {
//         handleLogin("admin");
//         navigate("/admin");
//       } else {
//         setErrorMessage("Invalid credentials");
//         setIsLoading(false);
//       }
//     }, 2000);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100%",
//         color: "white",
//       }}
//     >
//       <Typography variant="h4" component="h1" gutterBottom>
//         Login Page
//       </Typography>
//       <form
//         onSubmit={handleSubmit}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           width: "100%",
//           alignItems: "center",
//         }}
//       >
//         <TextField
//           label="Username"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           error={!!errorMessage && !username}
//           helperText={errorMessage && !username ? "Username is required" : ""}
//           sx={{
//             marginBottom: "1rem",
//             marginLeft: "-2rem",
//             width: "130%",
//             justifyContent: "center",
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "white", // Change the border color
//               },
//               "&:hover fieldset": {
//                 borderColor: "white", // Change border color on hover
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "white", // Change border color when focused
//               },
//             },
//             "& .MuiInputBase-input": {
//               color: "white", // Change the text color
//             },
//             "& .MuiInputLabel-root": {
//               color: "white", // Color of the label when not focused
//             },
//             "& .MuiInputLabel-root.Mui-focused": {
//               color: "white", // Color of the label when focused
//             },
//           }}
//         />
//         <div
//           style={{
//             width: "100%",
//           }}
//         >
//           <TextField
//             label="Password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             error={!!errorMessage && !password}
//             helperText={errorMessage && !password ? "Password is required" : ""}
//             InputProps={{
//               endAdornment: (
//                 <IconButton
//                   onClick={togglePasswordVisibility}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               ),
//             }}
//             sx={{
//               marginBottom: "1rem",
//               marginLeft: "-2rem",
//               width: "130%",
//               justifyContent: "center",
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "white", // Change the border color
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "white", // Change border color on hover
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "white", // Change border color when focused
//                 },
//               },
//               "& .MuiInputBase-input": {
//                 color: "white", // Change the text color
//               },
//               "& .MuiInputLabel-root": {
//                 color: "white", // Color of the label when not focused
//               },
//               "& .MuiInputLabel-root.Mui-focused": {
//                 color: "white", // Color of the label when focused
//               },
//             }}
//           />
//         </div>
//         {errorMessage && (
//           <Typography
//             color="error"
//             sx={{
//               marginBottom: "1rem",
//               color: "yellow",
//               marginLeft: "40px",
//             }}
//           >
//             {errorMessage}
//           </Typography>
//         )}
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           disabled={isLoading}
//           sx={{
//             marginTop: "0.5rem",
//             padding: "0.75rem",
//             fontSize: "1rem",
//             width: "130%",
//             justifyContent: "center",
//             marginLeft: "-2rem",
//             background:
//               "linear-gradient(to bottom, rgba(50, 41, 68, 0.8), rgba(37, 17, 80, 0.8))",
//           }}
//         >
//           {isLoading ? <CircularProgress size={24} /> : "Login"}
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default LoginPage;
