const express = require("express");
const bodyParser = require("body-parser");

const Wiki = require("./Db/Models/Wiki");
require("./Db");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const saveWikiToDataBase = async (wiki) => {
  const dbWiki = new Wiki({ paginas: wiki });
  await dbWiki.save(function (err, t) {
    if (err) {
      throw new Error("Wiki schema validation failed");
    }
  });
};

const getWikiFromRepository = async (id) =>
  await Wiki.find({ id_repositorio: id });

//  insert
app.post("/wikis", async function (req, res) {
  try {
    const wiki = req.body;
    await saveWikiToDataBase(wiki);
    res.status(200).send(wiki);
  } catch (error) {
    res.status(400).send("Error at insertion");
  }
});

//  get by id_repositorio
app.get("/wikis/:id", async function (req, res) {
  try {
    const id = parseInt(req.params.id);
    const wiki = await getWikiFromRepository(id);
    res.status(200).send(wiki);
  } catch (error) {
    res.status(400).send("Error in get by repository id endpoint");
  }
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
