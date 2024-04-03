const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { jobappAjax, savedetailspost, getform, formupdateget } = require("../controllers/jobappwithajax");

router.get("/",authentication,jobappAjax);
router.post("/save-details",authentication,savedetailspost)

router.get("/form",authentication,getform)

router.get("/form/update/:id",authentication,formupdateget)
module.exports=router