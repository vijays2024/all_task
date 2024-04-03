const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { delimeter } = require("../controllers/delimetersearch");

router.get("/",delimeter);
module.exports=router;