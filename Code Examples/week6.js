const express = require("express");
const path = require("path");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('./week6-assets/public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/week6-assets/index.html"));
});

app.get("/ahchor-example", (req, res) => {
    res.sendFile(path.join(__dirname, "/week6-assets/anchor-example.html"));
});

app.get("/img-example", (req, res) => {
    res.sendFile(path.join(__dirname, "/week6-assets/img-example.html"));
});

app.get("/list-example", (req, res) => {
    res.sendFile(path.join(__dirname, "/week6-assets/list-example.html"));
});

app.get("/text-example", (req, res) => {
    res.sendFile(path.join(__dirname, "/week6-assets/text-example.html"));
});

app.get("/audio-example", (req, res) => {
    res.sendFile(path.join(__dirname, "/week6-assets/audio-example.html"));
});

app.get("/image-example", (req, res) => {
    res.sendFile(path.join(__dirname, "/week6-assets/image-example.html"));
});

app.get("/table-example", (req, res) => {
    res.sendFile(path.join(__dirname, "/week6-assets/table-example.html"));
});

app.get("/video-example", (req, res) => {
    res.sendFile(path.join(__dirname, "/week6-assets/video-example.html"));
});

// Handle '404' errors

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// listen on HTTP_PORT

app.listen(HTTP_PORT, ()=>{console.log("Express http server listening on: " + HTTP_PORT);});