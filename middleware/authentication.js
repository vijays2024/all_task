const express=require("express");

const app=express();

const jwt=require("jsonwebtoken")



const authentication=async (req,res,next)=>{
    if(req.cookies.token){
        let token=req.cookies.token;
        try{
       let user= jwt.verify(token,"sdjhksd");
       if(user.email==="vijay@gmail.com"){
        next();
       }
    }
    catch(error){
        console.log("hello");
        res.redirect("/sign_in")
    }
     }

    else{
        res.redirect("/sign_in")
    }
}


module.exports=authentication;