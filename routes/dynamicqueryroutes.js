const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { dynamicquery } = require("../controllers/dynamictablequery");
router.get("/",authentication,dynamicquery)

module.exports=router;