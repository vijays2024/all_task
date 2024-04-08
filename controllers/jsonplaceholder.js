const con=require("../connection/connection")
const path=require("path")




const jsonplaceholderapi=(req,res)=>{
    res.render("json Placeholder Api/index2.ejs")
}

const details=(req,res)=>{
    res.render("json Placeholder Api/personal.ejs")
};

module.exports={jsonplaceholderapi,details}