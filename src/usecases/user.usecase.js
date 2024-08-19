const createError = require("http-errors");
const mongoose = require("mongoose");

const User = require("../model/user.model");
const encryption = require("../lib/encryption");
const jwt = require("../lib/jwt");

async function signup(data) {
  const existEmail = await User.findOne({ email: data.email });
  if (existEmail) throw createError(409, "user already exists");

  if (!data.password) throw createError(400, "password is required");

  const hash = encryption.encrypt(data.password);
  data.password = hash;

  const newUser = await User.create(data);

  const token = jwt.sign({ id: newUser._id });

  return { user: newUser, token };
}

async function getById(id) {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw createError(400, "Invalid ID format");

  const user = await User.findById(id);
  if (!user) throw createError(404, "user not found");

  return user;
}

async function login(data) {
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) throw createError(401, "invalid credential");

  const isValidPassword = encryption.compare(data.password, user.password);
  if (!isValidPassword) throw createError(401, "invalid credential");

  const token = jwt.sign({ id: user._id });

  return token;
}

module.exports = {
  login,
  getById,
  signup,
};
