const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");
const { title } = require("process");

// TODO: configure the express server
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views',path.join(__dirname,'views'));

const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let posts = [
  {
    title:"Test Post: lorem ipsum",
    content:longContent
  }
];
let name="";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/loginh",(req,res)=>{
  name=req.query.name;
  res.send(`Hello ${name}`);
});

app.post("/loginhp",(req,res)=>{
  name=req.body.name;
  res.send(`Hello ${name}`);
});

app.get("/loginejs",(req,res)=>{
  name=req.query.name;
  res.send(`Hello ${name}`);
});

app.post("/loginejsp",(req,res)=>{
  name=req.body.name;
  res.send(`Hello ${name}`);
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
