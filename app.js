// Required Modules
const express = require("express");
const https = require("https");
const ejs = require("ejs");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

// URL Parsing
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

// Environmental Variables
PASSWORD = process.env.PASSWORD
URL = process.env.URL
PORT = process.env.PORT

// Connect to MongoDB server using Mongoose
mongoose.connect("mongodb+srv://admin-dane:"+PASSWORD+"@"+URL);

// Mongoose Database Schema
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

// Custom routing for created posts
app.get("/posts/:postName", (req,res) => {
  postName = capitalizeFirstLetter(req.params.postName).replace(/-/g, ' ');
  console.log(postName);
  Post.findOne({title: postName}, (err, foundPost) => {
    if (!err) {
      if (!foundPost) {
        res.send("Post does not exist")
      } else {
        res.render("post", {
          postTitle: foundPost.title,
          postContent: foundPost.content
        });
      }
    }
  })
})

// This is the post function that comes from the compose route to root
app.post("/", (req,res) => {
  postTitle = capitalizeFirstLetter(req.body.postTitle);
  postContent = req.body.postContent;
  const post = new Post({
    title: postTitle,
    content: postContent
  });
post.save();
res.redirect("/");
});

app.listen(3000, function(req,res){
  console.log("Server Is Running");
});

// Simple function to capitalize the first letter so i dont have to use lodash
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et. Ac auctor augue mauris augue neque gravida in. Vel facilisis volutpat est velit egestas. Auctor eu augue ut lectus arcu bibendum at varius vel. Sagittis aliquam malesuada bibendum arcu. Amet tellus cras adipiscing enim eu turpis. Quis viverra nibh cras pulvinar mattis nunc. Nisi porta lorem mollis aliquam. Et malesuada fames ac turpis. Gravida cum sociis natoque penatibus. Ornare quam viverra orci sagittis eu volutpat. Facilisi nullam vehicula ipsum a. Odio eu feugiat pretium nibh ipsum consequat nisl. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Nec ullamcorper sit amet risus nullam eget felis eget."
