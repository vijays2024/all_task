const con=require("../connection/connection")
const path=require("path")
let f=require("../practice")
const delimeter=(req,res)=>{

    let query1=req.query.query ||""; 
    if(query1===""){
        res.render("Delimeter search/data.ejs",{noquery:0,query:"",data:null})
    }
    else{
    let string1="select * from student_master limit 10";
    if(query1!="select * from student_master limit 10"){
     string1=query1;
    }
    if(query1==="select * from student_master limit 10"){
 
    }
    else{
     query1=f.stringReturn(string1);
    }
    con.query(query1,(err,result)=>{
     if(err){
         res.send("something went wrong");
     }
   

     res.render("Delimeter search/data.ejs",{data:result,query:string1,noquery:1})
    
    })
}
 }

 module.exports={delimeter}