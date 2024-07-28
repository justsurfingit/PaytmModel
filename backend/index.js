const express = require("express");
const cors = require("cors");
const init = require("./db");
const { userRouter } = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: "*", // Your frontend URL
    credentials: true, // If you need to include cookies or credentials
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

// Routes
app.use("/api/v1/users", userRouter);

// Initialize the database and start the server
app.listen(PORT, () => {
  init();
  console.log(`Server running on port ${PORT}`);
});
