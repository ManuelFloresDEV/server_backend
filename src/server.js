const express = require("express");
const userRoutes = require("./routes/user.router");
const loginRouter = require("./routes/login.router");
const postRouter = require("./routes/post.router");

const app = express();

app.use(express.json());
app.use("/user", userRoutes);
app.use("/auth", loginRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "devToAPI",
  });
});

module.exports = app;
