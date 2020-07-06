const express = require("express");
const bodyParser = require("body-parser");

const Wiki = require("./Db/Models/Wiki");
require("./Db");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const saveWikiToDataBase = async (wiki) => {
  wiki.id_repositorio = parseInt(wiki.id_repositorio);
  const dbWiki = new Wiki(wiki);
  await dbWiki.save(function (err, t) {
    if (err) {
      throw new Error("Wiki schema validation failed");
    }
  });
};

const getWikiFromRepository = async (id) =>
  await Wiki.find({ id_repositorio: id });

// Insertar wiki en repositorio
app.post("/wikis", async function (req, res) {
  try {
    const wiki = req.body;
    await saveWikiToDataBase(wiki);
    res.status(200).send(wiki);
  } catch (error) {
    res.status(400).send("Error at insertion" + error);
  }
});

// Obtener wiki por id de repositorio
app.get("/wikis/:id", async function (req, res) {
  try {
    const id = parseInt(req.params.id);
    const wiki = await getWikiFromRepository(id);
    if (wiki.length === 0)
      res.status(200).send("No hay una wiki para ese repositorio");
    else res.status(200).send(generateUserPagesHtml(id, wiki));
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in get by repository id endpoint");
  }
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});

const generateUserPagesHtml = (repositoryId, wiki) => {
  let html =
    "<style>body { margin: 16px } table { font-family: arial, " +
    "sans-serif; border-collapse: collapse; width: 100%; } td, th { border: 1px solid #dddddd; " +
    "text-align: left; padding: 8px; }</style>";

  html += `<h2>Wiki del respositorio ${repositoryId}</h2>`;
  wiki.forEach((w) => {
    w.paginas.forEach((p) => {
      html += "<table>";
      html += "<tr>";
      html += `<th colspan="4">Pagina:</th>`;
      html += `<tr style="background-color: #dddddd;">`;
      html += "<th>Titulo</th>";
      html += "<th>Creador</th>";
      html += "<th>Utima modificacion</th>";
      html += "<th>Contenido</th></tr>";
      html += "<tr>";
      html += `<td>${p.pagina.titulo}</td>`;
      html += `<td>${p.pagina.creador}</td>`;
      html += `<td>${p.pagina.fecha_ultima_modificacion}</td>`;
      html += `<td>${p.pagina.contenido}</td>`;
      html += "</tr>";
      html += "<tr>";
      html += `<th colspan="4">Revisiones:</th>`;
      html += "</tr>";
      html += `<tr style="background-color: #dddddd;">`;
      html += `<th colspan="2">Fecha</th>`;
      html += `<th colspan="2">Contenido</th>`;
      html += "</tr>";
      p.pagina.revisiones.forEach((r) => {
        html += "<tr>";
        html += `<td colspan="2">${r.fecha}</td>`;
        html += `<td colspan="2">${r.contenido}</td>`;
        html += "</tr>";
      });
      html += "</table>";
      html += "<br></br>";
    });
  });
  return html;
};
