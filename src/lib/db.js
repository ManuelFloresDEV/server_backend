const mongoose = require("mongoose");

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_POST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const CONN = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_POST}/${DB_NAME}`;

function connect() {
  return mongoose.connect(CONN);
}

module.exports = { connect };
