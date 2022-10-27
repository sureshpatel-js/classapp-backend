const mongoose = require("mongoose");
const { Schema } = mongoose;
const languageSchema = new Schema({
  language_name: {
    type: String,
  },
  created_by: {
    type: String,
  },
});
const LanguageModel = mongoose.model("Language", languageSchema);
module.exports = LanguageModel;
