//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { json } = require("body-parser");
const _ = require('lodash');
const array = require('lodash/array');
const object = require('lodash/fp/object');
const { trimEnd } = require("lodash");
const cookieParser = require('cookie-parser')


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser())



// Global Variables

var posts = [];

// ---- Get Routes

app.get("/", function(req,res){
  let user = 'user'+Math.floor(Math.random() * 999999999);
  

  if (req.cookies.name === undefined) {
    res.cookie('name', user)
    res.render('home',{posts: posts});
  } else {
    res.render('home',{posts: posts, cookieName: req.cookies.name});
  }

  console.log(req.cookies.name + " accessed the home page from -> "+ req.ip);

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

app.post("/delete", function(req,res){

  for (var i = posts.length - 1; i >= 0; --i) {
    if (posts[i].userId == req.cookies.name && posts[i].postTitle == req.body.postBack) {
        posts.splice(i,1);
    }
}
  console.log(req.cookies.name+ " just deleted a post with the name: " + req.body.postBack);
  res.redirect("/");

});

app.post('/vent', function(req,res){

const post = {
postTitle: req.body.title, 
postBody: req.body.content,
userId: req.cookies.name
};

posts.push(post);

res.redirect("/");
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});


