require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { filmBilgi: {} });
});

app.post("/filmbul", (req, res) => {
  let filmAdi = req.body.title;

  getFilm(filmAdi).then(
    (gelenFilm) => {
      res.render("index", {
        filmBilgi: gelenFilm,
      });
    },
    (err) => {
      console.log(err);
    }
  );
});

async function getFilm(title) {
  let film;
  await axios
    .get(`http://www.omdbapi.com/?t=${title}&apikey=${process.env.API_KEY}`)
    .then((response) => {
      film = response;
    })
    .catch((error) => {
      console.log(error);
    });

  return film.data;
}

app.listen(8000);
