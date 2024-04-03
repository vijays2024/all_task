const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { sorting } = require("../controllers/sorting");
router.get("/",authentication,sorting)

module.exports=router;