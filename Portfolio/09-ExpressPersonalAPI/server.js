const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine","ejs");


var names=[];

app.route("/")
.get((req,res)=>{
    res.render("index",{})
});

app.listen(5000,()=>{
    console.log("Runing in 5000");
});