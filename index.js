"use strict";

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let db = [
  [
    "My first Day",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec arcu libero, ultricies non mollis ac, lobortis nec dui. Nullam nec volutpat dolor. Nunc blandit est sed hendrerit iaculis. Nullam at justo eget elit lacinia suscipit at eu leo. Fusce pretium lacus sit amet lectus finibus, eu ultrices mi commodo. Sed ultrices ex lectus, eget interdum mi mattis quis. Phasellus eu fermentum sapien, ultrices volutpat orci. Proin ullamcorper consectetur tempor. Mauris elementum mollis arcu nec ornare.",
  ],
  [
    "My second Day",
    "Cras id quam quam. Donec sollicitudin ligula et metus laoreet venenatis. Duis vel leo vel dui dapibus vestibulum congue et mauris. In pharetra mauris eu libero eleifend fermentum ullamcorper eu nibh. Aenean tempor lacinia interdum. Nam lobortis ipsum semper dignissim elementum. Aliquam erat volutpat. Mauris pellentesque nibh ac nunc condimentum, malesuada euismod tellus porttitor. Morbi pretium at nisl ut dignissim.",
  ],
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    data: db,
  });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

//Adding new post via submit button POST method
app.post("/", (req, res) => {
  let post = [];
  if (req.body["operationType"] === "1") {
    post.push(req.body["title"]);
    post.push(req.body["post"]);
    db.push(post);
  } else if (req.body["operationType"] === "2") {
    let i = req.body["indexOfdb"];
    db[i][0] = req.body["title"];
    db[i][1] = req.body["post"];
  } else if (req.body["operationType"] === "3") {
    let i = req.body["indexOfdb"];
    db.splice(i,1);
  }

  res.render("index.ejs", {
    data: db,
  });
});

//read post
app.post("/read", (req, res) => {
  let i = req.body["indexOfdb"];
  console.log(i);
  res.render("read.ejs", {
    data: db,
    index: i,
  });
});

//edit post
app.post("/edit", (req, res) => {
  let i = req.body["indexOfdb"];
  console.log(i);
  res.render("edit.ejs", {
    data: db,
    index: i,
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
