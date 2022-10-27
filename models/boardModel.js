const mongoose = require("mongoose");
const { Schema } = mongoose;
const BoardSchema = new Schema({
    language_name: {
        type: String,
    },
    created_by: {
        type: String,
    },
});
const BoardModel = mongoose.model("board", BoardSchema);
module.exports = BoardModel;
