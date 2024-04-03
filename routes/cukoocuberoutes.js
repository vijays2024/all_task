const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { cukooCube } = require("../controllers/cukoocube");
router.get("/",authentication,cukooCube)

module.exports=router;