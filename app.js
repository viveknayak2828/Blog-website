const express = require('express')    
const bodyparser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')

const homecontent = "welcome to home"  
const aboutcontent = "welcome to about"
const contactcontent = "welcome to contact"

const app = express()  //app will be using express

app.set('view engine','ejs');   //app use ejs as view engine
app.use(bodyparser.urlencoded({extended:true}))  //necessary code to pass data
app.use(express.static("public")); //serve public folder as static



app.get("/", function(req,res){
    res.render("home", {
        startingcontent:homecontent,
         posts:posts
    }); 
})

app.get("/about", function(req,res){
    res.render("about",{about:aboutcontent} )
})

let posts = []

app.get("/contact",(req,res)=>{
    res.render("contact", {contact:contactcontent})
})

app.get("/compose", (req,res)=>{
    res.render("compose");
})
 
app.post("/compose", function(req,res){
    const post = {
        title:req.body.posttitle,
        content:req.body.newcontent
    }
    posts.push(post)
    res.redirect("/")
})

app.get("/posts/:postname", function(req,res){
      const requestedtitle = _.lowerCase(req.params.postname )  //request parameters 16

      for(var i=0; i<posts.length; i++){
        const storedtitle = _.lowerCase(posts[i].title )

        if (storedtitle === requestedtitle){
            res.render("post",{
                title: posts[i].title,
                content: posts[i].content
            })
              }
      }
})

app.listen(3000, function(){
    console.log("running")
})