// setup our requires
const HTTP_PORT = 8080;
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Register handlerbars as the rendering engine for views
app.set("views", "./week9-assets");
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  res.redirect("/viewdata");
});

app.get("/viewdata", (req, res) => {
  const employees = [{
    name: "John",
    age: 23,
    occupation: "developer",
    company: "Scotiabank"
  },
  {
    name: "Sarah",
    age: 32,
    occupation: "manager",
    company: "TD"
  }];

  res.render("viewdata", {
    employees: employees,
    layout: false // do not use the default Layout (main.hbs)
  });
});

// start the server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);