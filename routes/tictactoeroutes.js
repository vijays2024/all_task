const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { tictactoe } = require("../controllers/tictactoe");

router.get("/",authentication,tictactoe)
module.exports=router;