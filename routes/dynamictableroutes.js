const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { dynamicTable } = require("../controllers/dynamicTable");


router.get("/",authentication,dynamicTable);
module.exports=router;