const mongoose = require("mongoose");
Schema = mongoose.Schema;

var pageSchema = new Schema({
  repositorio: { type: String, required: true },
  titulo: { type: String, required: true },
  creador: { type: String, required: true },
  fecha_ultima_modificacion: { type: String, required: true },
  mensaje: { type: String, required: true },
  contenido: { type: String, required: true },
  revisiones: [
    {
      contenido: { type: String, required: true },
      fecha: { type: String, required: true },
    },
  ],
  required: true,
});

module.exports = mongoose.model("Page", pageSchema);
