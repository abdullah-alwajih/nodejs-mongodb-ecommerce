const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
