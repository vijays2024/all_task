const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { formsPractice } = require("../controllers/formspractice");

router.get("/",formsPractice);


module.exports=router;