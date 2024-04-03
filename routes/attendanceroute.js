const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const attendancecontroller=require("../controllers/attendence")




router.get("/",authentication,attendancecontroller);

module.exports=router