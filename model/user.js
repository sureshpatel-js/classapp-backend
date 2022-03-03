const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = new Schema({
  fNmae: {
    type: String,
    required: true,
  },
  lName:{
    type: String,
    required: true, 
  }
});
