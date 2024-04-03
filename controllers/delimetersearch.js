const con=require("../connection/connection")
const path=require("path")
let f=require("../practice")
const delimeter=(req,res)=>{

    let query1=req.query.query ||"select * from student_master limit 10"; 
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
   
    //  let pathval=path.join(__dirname,"views/Delimeter search/data.ejs");
     res.render("/home/vijay-solanki/Alltasks/views/Delimeter search/data.ejs",{data:result,query:string1})
    })
 }

 module.exports={delimeter}