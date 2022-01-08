const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const fs = require("fs");
const http = require("http");
const https = require("https");

const HTTP_PORT = process.env.PORT || 8080;
const HTTPS_PORT = 4433;
const WEEK12ASSETS = "./week12-assets/";
const SSL_KEY_FILE = WEEK12ASSETS + "server.key";
const SSL_CRT_FILE = WEEK12ASSETS + "server.crt";

// read in the contents of the HTTPS certificate and key
const https_options = {
  key: fs.readFileSync(__dirname + "/" + SSL_KEY_FILE),
  cert: fs.readFileSync(__dirname + "/" + SSL_CRT_FILE)
};

// A simple user object, hardcoded for this example
const user = {
  username: "sampleuser",
  password: "samplepassword",
  email: "sampleuser@example.com"
};

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// call this function after the https server starts listening for requests
function onHttpsStart() {
  console.log("Express https server listening on: " + HTTPS_PORT);
}

// Register handlerbars as the rendering engine for views
app.set("views", WEEK12ASSETS);
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Setup the static folder that static resources can load from
// like images, css files, etc.
app.use(express.static(WEEK12ASSETS));


// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Setup a route on the 'root' of the url to redirect to /login
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Display the login html page
app.get("/login", (req, res) => {
  res.render("login", { 
    layout: false // do not use the default Layout (main.hbs)
  });
});

// Process the login route
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username === "" || password === "") {
    // Render 'missing credentials'
    return res.render("login", { 
      errorMsg: "Missing credentials.",
      layout: false // do not use the default Layout (main.hbs)
     });
  }

  if(username === user.username && password === user.password) {
    // redirect the user to the dashboard page
    res.redirect("/dashboard");
  } else {
    // render 'invalid username or password'
    res.render("login", { 
      errorMsg: "invalid username or password!",
      layout: false // do not use the default Layout (main.hbs)
    });
  }
});

// redirect the user to the logout page
app.get("/logout", (req, res) => {
  res.redirect("/login");
});

// An authenticated route that requires the user to be logged in.
// Notice the middleware 'ensureLogin' that comes before the function
// that renders the dashboard page
app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    user: {username: user.username, email: user.email }, // since we only have one user, we simply return it to the view
    layout: false // do not use the default Layout (main.hbs)
  });
});

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});


// listen on ports HTTP_PORT and HTTPS_PORT. The default port for http is 80, https is 443. We use 8080 and 4433 here
// because sometimes port 80 is in use by other applications on the machine and using port 443 requires admin access on osx
http.createServer(app).listen(HTTP_PORT, onHttpStart);
https.createServer(https_options, app).listen(HTTPS_PORT, onHttpsStart);