const express = require("express");
const createError = require("http-errors");
const userUseCase = require("../usecases/user.usecase");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(400).json({
    success: false,
    message: "User ID is required",
  });
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userUseCase.getById(id);

    res.json({
      success: true,
      message: "user By Id",
      data: { user },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userUseCase.signup(userData);

    res.json({
      success: true,
      message: "user created",
      data: { user: newUser },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
