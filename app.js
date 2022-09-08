const express = require("express");
const https = require("https");
const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("list")
});

app.post("/", function(req,res){

});

app.listen(3000, function(req,res){
  console.log("Server Is Running");
});
