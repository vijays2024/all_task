const path=require("path");


const htmlcss3=(req,res)=>{
    console.log(__dirname);
    console.log("end");
        res.render("htmlexercise3/index.ejs")
    }

module.exports={htmlcss3}    