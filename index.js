require("dotenv").config();
const server = require("./src/server");
const db = require("./src/lib/db");
const port = process.env.PORT || 8080;

db.connect()
  .then(() => {
    server.listen(port, () => {
      console.log("server in port", port);
    });
  })
  .catch((error) => {
    console.log("DB connection error:", error);
  });
