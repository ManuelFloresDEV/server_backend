const express = require("express");
const userUseCase = require("../usecases/user.usecase");
const createError = require("http-errors");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.email) throw createError(400, "required email");

    if (!userData.password) throw createError(400, "required password");

    const token = await userUseCase.login(userData);
    res.json({
      success: true,
      message: "user logged in",
      data: { token },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
