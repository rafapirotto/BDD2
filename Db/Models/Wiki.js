const mongoose = require("mongoose");

// const Page = require("./Page");
Schema = mongoose.Schema;

var revisionSchema = new Schema({
  contenido: { type: String, required: true },
  fecha: { type: String, required: true },
});

var pageSchema = new Schema({
  repositorio: { type: String, required: true },
  pagina: {
    titulo: { type: String, required: true },
    creador: { type: String, required: true },
    fecha_ultima_modificacion: { type: String, required: true },
    mensaje: { type: String, required: true },
    contenido: { type: String, required: true },
    revisiones: [revisionSchema],
  },
});

var wikiSchema = new Schema({
  paginas: [pageSchema],
});

module.exports = mongoose.model("Wiki", wikiSchema, "wikis");
