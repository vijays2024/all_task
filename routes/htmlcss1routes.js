const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { htmlcss1 } = require("../controllers/htmlcss1");

router.get("/",authentication,htmlcss1);
module.exports=router;