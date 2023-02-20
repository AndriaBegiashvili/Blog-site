//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const { kebabCase, lowerCase } = require("lodash");

const homeStartingContent = "Take a look around, explore our articles, and let us know what you think. We're always open to feedback and suggestions, and we can't wait to hear from you.";
const aboutContent = "We're thrilled to have you here. Our blog is a space where we share our thoughts, insights, and experiences on a variety of topics, including [insert your blog's topics here]. Our goal is to create a platform where we can connect with like-minded individuals and share our perspectives on the world around us.Through our blog, we hope to inspire, educate, and entertain our readers. We'll be covering a range of topics, from [insert a few topic examples here] to [insert a few more topic examples here]. Our team of writers is passionate about creating engaging content that sparks conversation and encourages our readers to think critically about the issues that matter most to them.We believe that everyone has a story to tell, and we want to provide a space where those stories can be heard. Whether you're a seasoned blogger or a newbie just starting out, we welcome you to join our community and share your thoughts with us.Thank you for visiting our blog, and we look forward to connecting with you soon!";
const contactContent = "Please Do Not Contact us";

const app = express();
let saved = []

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
  res.render("home", {homeStartingContent, saved})
});
app.get("/about",(req,res)=>{
  res.render("about", {aboutContent})
});
app.get("/contact",(req,res)=>{
  res.render("contact", {contactContent})
});
app.get("/compose",(req,res)=>{
  res.render("compose")
});
app.post("/compose",(req,res)=>{
  let name = req.body.postTitle
  let text = req.body.postText
  let post = {
    name,
    text 
  }
  saved.push(post)
  res.redirect("/")
});

app.get("/:blog",(req,res)=>{
  let blog = req.params.blog
  saved.forEach((post)=>{
    var stitle = post.name
    var stext = post.text

    if( blog === stitle){
      res.render("post", {stitle, stext,blog})
    }
    if (blog === kebabCase(stitle)){
      res.render("post",{stitle, stext, blog})
    }
  })

// app.get("/posts/:postName", function(req, res){
//   const requestedTitle = _.lowerCase(req.params.postName);

//   posts.forEach(function(post){
//     const storedTitle = _.lowerCase(post.title);

//     if (storedTitle === requestedTitle) {
//       res.render("post", {
//         title: post.title,
//         content: post.content
//       });
//     }
//   });

// });
});
















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
