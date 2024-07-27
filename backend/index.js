const express = require("express");
const cors = require("cors");
const init = require("./db");
const { userRouter } = require("./routes/user");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://moneytransferhub.netlify.app",
    credentials: true,
  })
);
app.options("*", cors()); // preflight options for all routes

app.use("/api/v1/users", userRouter);

app.listen(3000, () => {
  init();
  console.log("Server running on port 3000");
});
