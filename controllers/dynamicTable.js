const con=require("../connection/connection")
const path=require("path")
// app.get("/dynamicTable",authentication,)

const dynamicTable=(req,res)=>{
   
        res.render("dynamic_table/DynamicTable.ejs")
    }

module.exports={dynamicTable}    

