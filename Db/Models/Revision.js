const mongoose = require("mongoose");
Schema = mongoose.Schema;

var revisionSchema = new Schema({
  contenido: { type: String, required: true },
  fecha: { type: String, required: true },
});

module.exports = revisionSchema;
