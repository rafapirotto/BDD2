const mongoose = require("mongoose");

Schema = mongoose.Schema;

var wikiSchema = new Schema({
  pages: [
    {
      titulo: String,
      creador: String,
      fecha_ultima_modificacion: String,
      mennsaje: String,
      contenido: String,
      revisiones: [{ contenido: String, fecha: String }],
    },
  ],
});

module.exports = mongoose.model("Wiki", wikiSchema, "wikis");
