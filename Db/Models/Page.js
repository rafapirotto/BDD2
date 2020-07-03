const mongoose = require("mongoose");

const Revision = require("./Revision");
Schema = mongoose.Schema;

var pageSchema = new Schema({
  pagina: {
    titulo: { type: String, required: true },
    creador: { type: String, required: true },
    fecha_ultima_modificacion: { type: String, required: true },
    mensaje: { type: String, required: false },
    contenido: { type: String, required: true },
    revisiones: [Revision],
  },
});

module.exports = pageSchema;
