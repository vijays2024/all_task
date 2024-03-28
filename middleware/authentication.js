const express=require("express");

const app=express();

const jwt=require("jsonwebtoken")



const authentication=async (req,res,next)=>{
    // console.log(req.cookies);
  console.log("hello");
    if(req.cookies.token){
        let token=req.cookies.token;
       let user= jwt.verify(token,"sdjhksd");
       if(user.email==="vijay@gmail.com"){
       console.log(user);
       console.log("world");
       }
       else{
        res.redirect("/sign_in")
       }
        next();
    }
    else{
        res.redirect("/sign_in")
    }
//     let token=req.cookies.token;
//     if(!token){
//         res.redirect("/sign_in");
//     }
//    let user= jwt.verify(token,"sdjhksd")
//    console.log(user);
}
module.exports=authentication;