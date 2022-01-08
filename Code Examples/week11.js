const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const Sequelize = require("sequelize");

const HTTP_PORT = process.env.PORT || 8080;
const WEEK11ASSETS = "./week11-assets/";



// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// instruct the app to use the "express.urlencoded" middleware
app.use(express.urlencoded({ extended: true }));

// instruct the app to use express handlebars for the view engine with the .hbs extension
app.set("views", WEEK11ASSETS);
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Setup the static folder that static resources can load from
// like images, css files, etc.
app.use(express.static(WEEK11ASSETS));

// define the connection to our Postgres instance 
const sequelize = new Sequelize("database", "user", "password", {
  host: "host",
  dialect: "postgres",
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false }
  },
  query:{raw:true}
});

// Define our Models - "Name"

const Name = sequelize.define("Name", {
  fName: Sequelize.STRING,  // first Name
  lName: Sequelize.STRING, // Last Name
});

// synchronize the database before we do anything else
sequelize.sync().then(() => {

  // define the "/" route
  app.get("/", (req, res) => {

    // fetch all of the names and order them by id
    Name.findAll({
      order: ["id"]
    }).then((data) => {
      // render the "viewTable" view with the data
      res.render("viewTable", {
        data: data,
        layout: false // do not use the default Layout (main.hbs)
      });
    });
  });

  // define the "/updateName" route
  app.post("/updateName", (req, res) => {

    // check to see if both first name & last name fields are blank
    if (req.body.lName.length == 0 && req.body.fName.length == 0) {
      // remove a record from the  "Name" model with the data from req.body
      Name.destroy({
        where: { id: req.body.id }
      }).then(() => {
        console.log("successsfully removed user: " + req.body.id);
        res.redirect("/"); // redirect back to the home page
      });
    } else {
      // update a record using the "Name" model with the data from req.body
      Name.update({
        lName: req.body.lName,
        fName: req.body.fName
      }, {
          where: { id: req.body.id }
        }).then(() => {
          console.log("successfully updated name: " + req.body.id);
          res.redirect("/"); // redirect back to the home page
        });
    }
  });

  // define the "/addName" route
  app.post("/addName", (req, res) => {
    // create a record using the "Name" model with the data from req.body
    Name.create({
      lName: req.body.lName,
      fName: req.body.fName
    }).then(() => {
      console.log("successfully created a new name");
      res.redirect("/");
    });
  });

  // start the server to listen on HTTP_PORT
  app.listen(HTTP_PORT, onHttpStart);

});