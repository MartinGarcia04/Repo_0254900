require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();


const apiKey = process.env.API_KEY;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});


app.listen(7000,()=>{
    console.log("Listen on port 7000");
});
