const mongoose = require("mongoose");

const server = "127.0.0.1:27017";
const database = "wikis";

mongoose
  .connect(`mongodb://${server}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Couldn't connect to MongoDB....", err));
