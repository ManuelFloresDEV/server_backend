const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const secret = process.env.JWT_SECRET;

if (!secret) throw createError(500, "JWT_SECRET is not defined");

function sign(payload) {
  return jwt.sign(payload, secret, { expiresIn: "1w" });
}

function verify(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  verify,
  sign,
};
