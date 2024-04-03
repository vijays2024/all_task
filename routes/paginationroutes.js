const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { pagination } = require("../controllers/pagination");

router.get("/",authentication,pagination)
module.exports=router;