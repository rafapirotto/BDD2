const mongoose = require("mongoose");

const Page = require("./Page");
Schema = mongoose.Schema;

var wikiSchema = new Schema({
  paginas: [Page],
  id_repositorio: { type: Number, required: true },
});

module.exports = mongoose.model("Wiki", wikiSchema, "wikis");
