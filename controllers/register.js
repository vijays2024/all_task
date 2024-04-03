const con=require("../connection/connection")
const path=require("path")
const crypto=require("crypto");

const bcrypt=require("bcrypt");



const md5=require("md5")
const jwt=require("jsonwebtoken")
// const cookieparser=require("cookie-parser");
// app.use(cookieparser())
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.json())
const homeget=(req,res)=>{
    if(req.cookies.token){
         let token=req.cookies.token;
         let user= jwt.verify(token,"sdjhksd");
         if(user.email==="vijay@gmail.com"){
    
         res.render("index");
         }
         else{
          res.redirect("/sign_in")
         }
      
     }
     else{
         res.render("signup");
     }
 }

const registerpost=async (req,res)=>{
    try{
        
        const {fname,lname,email}=req.body;

        console.log(req.body);

       const isUserExist = await con.promise().query(`select * from users where email='${email}'`);

       console.log(isUserExist);
       
        if(isUserExist[0].length!==0){
            return res.json({msg:"invalid email"});
        }
        const characters='ABCDEFGHIJKLM1234567890NOPQRSTUVWXYZ';
        const charactersLength=characters.length;
        let counter=0;
        let salt=""
        let access_key=""
        while(counter<=12){
            salt+=characters.charAt(Math.floor(Math.random()*charactersLength))
            access_key+=characters.charAt(Math.floor(Math.random()*charactersLength));
            counter+=1;
        }
        salt=salt.slice(0,4);
        let response = await con.promise().query(`insert into users(first_name,last_name,email,salt,access_key) values ('${fname}','${lname}','${email}','${salt}','${access_key}')`);
        console.log(response);
        res.json({id:response[0].insertId,access_key,salt})
    }
    catch(error){
        console.log(error);
    }
}

const getPassword=async (req,res)=>{
    try{
    const {id,access_key,salt}=req.query;
    console.log("id");
    console.log(id);
    let data= await con.promise().query(`select * from users where id='${id}'`)
    console.log(data);
    let isvalid=true;
    if(access_key !== data[0][0].access_key) isvalid=false;
    var diff = new Date().valueOf() - data[0][0].created_at.valueOf();
    console.log(diff);
    let hours=Math.floor(diff/(1000*60*60))
    console.log(hours);
    res.render("password",{id,access_key,hours,salt,isvalid})
}
    catch(error){
        console.log(error);
    }
   
}

const postPassword=async (req,res)=>{
    try{
        const {id,salt,password,r_password}=req.body;
        // console.log(id);
        // console.log(req.body);
        // console.log(req);
        if(password===r_password){
            const hashed=md5(password+salt);
              let data=await con.promise().query(`update users set password='${hashed}' where id=${id}`)
            res.json({status:200,msg:"Account activated successfully"});
        
        }
        else{
            res.json({status:400,msg:"please enter same password"});
        }
res.json({})
    }

catch(error){
    console.log(error);
}
}

const getlogin=(req,res)=>{
    res.render("signin.ejs")
}

const postlogin=async (req,res)=>{
    try{
        const {email,password}=req.body;
        let isUserExist=await con.promise().query(`select * from users where email='${email}'`)
        if(isUserExist[0].length==0){
            return res.json({msg:"Invalid email or password",msg2:""})

        }
        const user=isUserExist[0][0];
        const id=user.id;
        const d_password=md5(password+user.salt);
        if(user.password!==d_password){
            return res.json({msg:"Invalid email or password",msg2:""})
        } 
        const token=jwt.sign({email},"sdjhksd",{expiresIn:"1h"})
        res.cookie('token',token,{expires:new Date(Date.now()+900000),httpOnly:true})
        console.log("token",token);
      return res.json({msg:"login succesfully",token,msg_2:"click here to <a href=/> Go to dashboard</a>"})

    }
    catch(error){
        console.log(error);
    }
}


const logout=(req,res)=>{
    res.clearCookie('token');
    res.redirect("/sign_in")
}


const forgotPassword1get=(req,res)=>{
    res.render("forgotPassword1.ejs");
}

const forgotPassword1post=async (req,res)=>{
    let email=req.body.email;
    console.log(req.body);
    
    let result= await con.promise().query(`select * from users where email='${email}'`)
    console.log(result[0]);
    if(result[0].length===0){
        return res.json({msg:"Invalid Email"})
    }
    else {
        console.log("end");
        return res.json({msg:"succesfull",email:email})
    
    }
   
}

const forgotPasswordget=(req,res)=>{
    res.render("forgotPassword.ejs")
}

const forgotPasswordpost=async (req,res)=>{

    try{
    let email=req.body.email;    
    let password=req.body.password;
   
    let result=await con.promise().query(`select salt from users where email='${email}'`)
    console.log(result[0][0].salt);
    let salt=result[0][0].salt;
    let  hashed=md5(password+salt);

    let data=await con.promise().query(`update users set password='${hashed}' where email='${email}'`)
    console.log(data);
    if(data.length>0){
        return res.json({msg:"succesfull"})
    }
    
    }
    catch(error){
        console.log(error);
    }

}

module.exports={homeget,registerpost,getlogin,getPassword,forgotPassword1get,forgotPassword1post,forgotPasswordget,
forgotPasswordpost,logout,postlogin,postPassword}