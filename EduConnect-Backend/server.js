const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs"); // Missing in your file
const User = require("./models/User"); // Ensure the User model is imported correctly
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Admin Initialization Function
const initializeAdmin = async () => {
  const adminEmail = "admin@classsmart.com";
  const adminPassword = "admin123"; // Change this in production
  try {
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = new User({
        username: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      await admin.save();
      console.log("Admin account created");
    } else {
      console.log("Admin account already exists");
    }
  } catch (error) {
    console.error("Error initializing admin:", error.message);
  }
};

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/classsmart")
  .then(async () => {
    console.log("Database connected");
    await initializeAdmin(); // Ensure admin user is created
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log("Database connection error:", err));

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const authRoutes = require("./routes/auth");
// const adminRoutes = require("./routes/admin");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);

// const initializeAdmin = async () => {
//   const adminEmail = "admin@classsmart.com";
//   const adminPassword = "admin123"; // Change this in production
//   const existingAdmin = await User.findOne({ email: adminEmail });

//   if (!existingAdmin) {
//     const hashedPassword = await bcrypt.hash(adminPassword, 10);
//     const admin = new User({
//       username: "Admin",
//       email: adminEmail,
//       password: hashedPassword,
//       role: "admin",
//     });
//     await admin.save();
//     console.log("Admin account created");
//   } else {
//     console.log("Admin account already exists");
//   }
// };

// // Call the initializeAdmin function after connecting to the database
// mongoose
//   .connect("mongodb://localhost:27017/classsmart")
//   .then(async () => {
//     console.log("Database connected");
//     await initializeAdmin();
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.log(err));

// // Database Connection
// // mongoose
// //   .connect('mongodb://localhost:27017/classsmart', {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
// //   .catch(err => console.log(err));
