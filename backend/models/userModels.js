const mongoose = require("mongoose");

// Create Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required:true,
  },
  age: {
    type: Number,
  } 
},
{timestamps:true}
);

// Create Model
const User = mongoose.model("User",userSchema);
module.exports = User;