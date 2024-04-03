const con=require("../connection/connection")
const path=require("path")
// app.get("/dynamicTable",authentication,)

const dynamicTable=(req,res)=>{
   
        res.sendFile("/home/vijay-solanki/Alltasks/views/dynamic_table/DynamicTable.html")
    }

module.exports={dynamicTable}    