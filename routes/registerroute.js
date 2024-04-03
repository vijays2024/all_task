const express=require("express");
const app=express()
const router=express.Router()

const authentication = require("../middleware/authentication");
const { homeget, registerpost, getPassword, postPassword, getlogin, postlogin, logout, forgotPassword1get, forgotPassword1post, forgotPasswordget, forgotPasswordpost } = require("../controllers/register");

router.get("/",homeget);
router.post("/sign_up",registerpost);
router.get("/password",getPassword)
router.post("/password",postPassword)

router.get("/sign_in",getlogin)

router.post("/sign_in",postlogin);
router.get("/logout",logout)
router.get("/forgotPassword1",forgotPassword1get)
router.post("/forgotPassword1",forgotPassword1post)
router.get("/forgotPassword",forgotPasswordget)
router.post("/forgotPassword",forgotPasswordpost)

module.exports=router;