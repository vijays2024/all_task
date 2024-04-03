const con=require("../connection/connection")
const path=require("path")




const jsonplaceholderapi=(req,res)=>{
    res.sendFile("/home/vijay-solanki/Alltasks/views/json Placeholder Api/index2.html")
}

const details=(req,res)=>{
    res.sendFile("/home/vijay-solanki/Alltasks/views/json Placeholder Api/personal.html")
};

module.exports={jsonplaceholderapi,details}