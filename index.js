const express = require("express");
const bodyParser = require("body-parser");

const Wiki = require("./Db/Models/Wiki");
require("./Db");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const saveWikiToDataBase = async (wiki) => {
  const dbWiki = new Wiki({ pages: wiki });
  await dbWiki.save(function (err, t) {
    if (err) {
      throw new Error("Wiki schema validation failed");
    }
  });
};

const getWikisFromDataBase = async () => await Wiki.find({});

const getWikiFromDataBase = async (id) => await Wiki.find({ _id: id });

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

//  get by id
app.get("/wikis/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const wiki = await getWikiFromDataBase(id);
    res.status(200).send(wiki);
  } catch (error) {
    res.status(400).send("Error in get by id endpoint");
  }
});

//  get all
app.get("/wikis", async function (req, res) {
  try {
    const wikis = await getWikisFromDataBase();
    res.status(200).send(wikis);
  } catch (error) {
    res.status(400).send("Error in get endpoint");
  }
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
