const express = require("express");
const https = require("https");
const ejs = require("ejs");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
let posts = [];

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

// Environmental Variables
PASSWORD = process.env.PASSWORD
URL = process.env.URL
PORT = process.env.PORT

// Connect to mongodb server with Mongoose
mongoose.connect("mongodb+srv://admin-dane:"+PASSWORD+"@"+URL);

// Database Schema
const postSchema = {
  title: String,
  content: String
};

// Mongoose Model
const Post = mongoose.model("Post", postSchema);

// Routing

app.get("/", (req,res) => {
  Post.find({}, (err,foundItems) => {
    res.render("home", {homeContent:homeStartingContent, posts:foundItems});
  });
});

app.get("/about", (req,res) => {
  res.render("about", {aboutContent:aboutContent});
})

app.get("/contact", (req,res) => {
  res.render("contact", {contactContent:contactContent})
})

app.get("/compose", (req,res) => {
  res.render("compose")
})

app.get("/posts/:postName", (req,res) => {
  posts.forEach(function (post) {
    if (req.params.postName.toLowerCase() === post.title.toLowerCase().replace(/\s+/g, '-')){
      res.render("post", {postTitle:post.title, postContent:post.content})
    }
  })
})

app.post("/", (req,res) => {
  postTitle = req.body.postTitle;
  postContent = req.body.postContent;
  const post = new Post({
    title: postTitle,
    content: postContent
  });
post.save()
});

app.listen(3000, function(req,res){
  console.log("Server Is Running");
});


const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Aliquet risus feugiat in ante metus dictum. At in tellus integer feugiat scelerisque. Morbi tincidunt augue interdum velit euismod in pellentesque. Semper quis lectus nulla at volutpat diam ut venenatis tellus. Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Donec ultrices tincidunt arcu non sodales neque sodales. Suspendisse faucibus interdum posuere lorem ipsum dolor sit. Orci phasellus egestas tellus rutrum tellus pellentesque. Eu scelerisque felis imperdiet proin. In fermentum et sollicitudin ac orci. Duis ut diam quam nulla porttitor. Eu lobortis elementum nibh tellus molestie nunc. Ac tincidunt vitae semper quis lectus nulla at volutpat. Massa eget egestas purus viverra accumsan in nisl nisi."
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu scelerisque felis imperdiet proin fermentum leo vel. Dui faucibus in ornare quam viverra. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Tortor dignissim convallis aenean et tortor at. Augue ut lectus arcu bibendum at varius vel. Nunc sed velit dignissim sodales ut eu. Pellentesque habitant morbi tristique senectus et netus. Scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt. Lectus nulla at volutpat diam ut venenatis. Non diam phasellus vestibulum lorem sed risus ultricies. Bibendum neque egestas congue quisque egestas diam in. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida."
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor lacus luctus accumsan tortor. Et tortor consequat id porta nibh venenatis cras sed. Semper eget duis at tellus at urna condimentum. Vivamus at augue eget arcu dictum varius duis. Adipiscing diam donec adipiscing tristique risus nec feugiat. Netus et malesuada fames ac turpis egestas integer eget aliquet. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Senectus et netus et malesuada fames ac turpis. Iaculis nunc sed augue lacus viverra vitae. Accumsan sit amet nulla facilisi morbi. Massa tempor nec feugiat nisl pretium fusce id. Neque laoreet suspendisse interdum consectetur libero id. Tellus mauris a diam maecenas. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Eleifend quam adipiscing vitae proin sagittis nisl. Faucibus turpis in eu mi bibendum neque egestas. Mi tempus imperdiet nulla malesuada. Eleifend quam adipiscing vitae proin sagittis."
