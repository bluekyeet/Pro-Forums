// Node.js - Backend

const express = require("express");
const app = express();
const fs = require("fs");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());

let posts = [];

try {
  const data = fs.readFileSync("posts.json");
  posts = JSON.parse(data);
} catch (err) {
  console.error(err);
}

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const post = req.body;
  posts.push(post);

  fs.writeFile("posts.json", JSON.stringify(posts), (err) => {
    if (err) console.error(err);
    res.send(post);
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3000");
});