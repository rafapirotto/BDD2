const axios = require("axios");

const animals = require("./animals.json");
const dataBases = require("./dataBases.json");
const cryptography = require("./cryptography.json");

const wikiContent = [animals, dataBases, cryptography];
const URL = "http://localhost:3000/wikis";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const handleRequest = async () => {
  try {
    const randomContentId = getRandomInt(0, wikiContent.length - 1);
    const randomContent = wikiContent[randomContentId];
    const repoId = Math.floor(Math.random() * 10 + 1);
    const body = { id_repositorio: repoId, ...randomContent };
    await axios.post(URL, body);
  } catch (error) {
    console.log(error);
  }
};

const loop = () => {
  setTimeout(function () {
    handleRequest();
    loop();
  }, 500);
};

loop();
