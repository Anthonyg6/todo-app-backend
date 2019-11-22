const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  content: { type: String }
});

module.exports = mongoose.model("Todo", todoSchema);
