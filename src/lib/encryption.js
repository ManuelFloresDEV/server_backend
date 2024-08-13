const bcryptjs = require("bcryptjs");

const SALT_ROUNDS = 10;

function encrypt(plainText) {
  return bcryptjs.hashSync(plainText, SALT_ROUNDS);
}

function compare(plainText, hash) {
  return bcryptjs.compareSync(plainText, hash);
}

module.exports = {
  compare,
  encrypt,
};
