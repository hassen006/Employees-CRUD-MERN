const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Name: String,
    Email: String,
    Address: String,
    Phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
