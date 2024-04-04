const express=require("express");
const authentication=require("./middleware/authentication.js")
const path=require("path")
const app=express();
const port=5000;
const attendancecontroller=require("./controllers/attendence.js")
require("dotenv").config()
const bodyParser=require("body-parser");
const crypto=require("crypto");

const bcrypt=require("bcrypt");



const md5=require("md5")
const jwt=require("jsonwebtoken")
const cookieparser=require("cookie-parser");
app.use(cookieparser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

const mysql=require("mysql2")

app.set('view engine', 'ejs');
app.use("/",require("./routes/allroutes.js"))
app.listen(port,(err)=>{
    if(err){
        throw err
    }
    console.log(`server is running on port ${port}`);
})

