const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = process.env.port || 3000;
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { response } = require("express");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ahish Kovalam",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Ahish Kovalam",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ahish Kovalam",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }

        forecast(latitude, longitude, (error, data) => {
          if (error) {
            return res.send({ error });
          }
          return res.send({
            forecast: data,
            location,
            address: req.query.address,
          });
        });
      }
    );
  } else {
    res.send({ error: "Please provide address in query string!!!" });
  }
});

app.get("/help/*", (req, res) => {
  res.render("pageNotFound", {
    title: "404",
    name: "Ahish Kovalam",
    errorMessage: "Help Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("pageNotFound", {
    title: "404",
    name: "Ahish Kovalam",
    errorMessage: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
