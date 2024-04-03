const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { resultcontroller, resultwithId, postdata } = require("../controllers/examgrid");

router.get("/",authentication,resultcontroller)
router.get("/:id",authentication,resultwithId);
router.post("/postdata",authentication,postdata)

module.exports=router;