const mongoose = require("mongoose");

const GuserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String },
  email: { type: String },
});

const User = mongoose.model("GUser", GuserSchema);
