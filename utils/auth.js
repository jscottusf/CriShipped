const crypto = require("crypto");

const hashPassword = plaintext => {
  return crypto
    .createHmac("sha256", "secret key")
    .update(plaintext)
    .digest("hex");
};

module.exports = { hashPassword };
