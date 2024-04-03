const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { javascriptEvents } = require("../controllers/javascriptevents");

router.get("/",javascriptEvents);
module.exports=router