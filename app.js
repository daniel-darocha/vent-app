//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { json } = require("body-parser");
const _ = require('lodash');
const array = require('lodash/array');
const object = require('lodash/fp/object');
const { trimEnd } = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Global Variables

var posts = [];


// ---- Get Routes
app.get("/", function(req,res){
  res.render('home',{posts: posts});
  console.log("Someone accessed the home page from -> "+req.ip);
});

app.get("/posts/:postID", function(req,res){
  var postName = _.lowerCase(req.params.postID);
  
  posts.forEach(function(p){
    if (_.lowerCase(p.postTitle) === postName) {
      res.render('post', {title: p.postTitle, body: p.postBody});
    }
  });


})

app.get("/vent", function(req,res){

  res.render('vent',{});
});


app.get("/why", function(req,res){

  res.render('why',{});
});

// ---- Post Routes

app.post('/vent', function(req,res){

const post = {
postTitle: req.body.title, 
postBody: req.body.content
};

posts.push(post);

res.redirect("/");
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});


