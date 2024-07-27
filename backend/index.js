const express = require("express");
const init = require("./db");
const User = require("./model/User");
const cors = require("cors");
const { userRouter } = require("./routes/user");
const app = express();
app.use(express.json());
app.use(cors({ origin: "https://moneytransferhub.netlify.app" }));
app.use("/api/v1/users", userRouter);

app.listen(3000, () => {
  init();
});
