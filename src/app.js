const express = require("express");
const app = express();
const path = require("path");
const bodyparser=require("body-parser");
const multer=require("multer");
const upload=multer();
const cookieparser=require("cookie-parser");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const User=require("../module/Schema")
const jwt=require("jsonwebtoken")

const port = 8000               //process.env.PORT;
app.listen(port);

// env file configaration
const dotenv = require("dotenv");

dotenv.config({path: "../config.env"})
require("./mongo")

app.use(express.json())  // at sobsomoi ja route a amr massage console asa tar age likhte hoba
//
app.use(require("../router/route"))
//

// define json


// set server.js
const studentrouter=require("../router/server");
app.use(studentrouter);

// set static.file
app.use("/static",express.static("public"))

// show diroctury
console.log(path.join(__dirname))


app.get("/",(req,res)=>{
    
    res.json({name:"sudip",title:"basak"});
});
// decliar id length
app.get("/app/:id([0-9]{5})",(req,res)=>{    //([0-9]{5} at dia ami diclaire kote pari ar minimum id 5 ta dita hobe
      res.send("thire id is "+ req.params.id)
      //res.send(bodyparser.urlencoded({urlextends=false}));
      
});

//set up view engine
app.set("view engine","pug")
app.set("../views")

// from pug
app.get("/from",(req,res)=>{
      res.render("from")
})

app.use((bodyparser.json()));//for parsing application json
app.use(bodyparser.urlencoded({extended:true}))//from url-encoded

//app.use(upload.array());


//create user authantication token
// const createtoken=async ()=>{
//     const token= await jwt.sign({id:"6248264d6a828c550cc69139"},"hiamisudipbasak",{
//         expiresIn:"5 second"
//     })
//     console.log(token)

//     const checktoken=await jwt.verify(token,"hiamisudipbasak")
//     console.log(checktoken)
// }

// createtoken()









// mongodb+srv://G9:<password>@cluster0.v1f4d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb+srv://G9:<password>@cluster0.v1f4d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

