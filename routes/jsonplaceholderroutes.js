const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { jsonplaceholderapi, details } = require("../controllers/jsonplaceholder");


router.get("/",authentication,jsonplaceholderapi);
router.get("/details",authentication,details)

module.exports=router;