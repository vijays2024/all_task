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


//attendance controller
const attendancecontroller=require("../controllers/attendence")
router.get("/attendance",authentication,attendancecontroller);
//cukoo cube controller
const { cukooCube } = require("../controllers/cukoocube");
router.get("/cukooCube",authentication,cukooCube)
//delimeter
const { delimeter } = require("../controllers/delimetersearch");

router.get("/DelimeterSearch",delimeter);

//dynamic query 
const { dynamicquery } = require("../controllers/dynamictablequery");
router.get("/dynamicquery",authentication,dynamicquery)

//dynamic table
const { dynamicTable } = require("../controllers/dynamicTable");
router.get("/dynamicTable",authentication,dynamicTable);

//examgrid 
const { resultcontroller, resultwithId, postdata } = require("../controllers/examgrid");

router.get("/results",authentication,resultcontroller)
router.get("/results/:id",authentication,resultwithId);
router.post("/results/postdata",authentication,postdata)

//formspractice

const { formsPractice } = require("../controllers/formspractice");

router.get("/formsPractice",authentication,formsPractice);

//htmlcss1
const { htmlcss1 } = require("../controllers/htmlcss1");

router.get("/htmlcss1",authentication,htmlcss1);

//htmlcss2
const { htmlcss2 } = require("../controllers/htmlcss2");
router.get("/htmlcss2",authentication,htmlcss2)

//htmlcss3

const {htmlcss3}=require("../controllers/htmlcss3");
router.get("/htmlcss3",authentication,htmlcss3)
//javascriptevents

const { javascriptEvents } = require("../controllers/javascriptevents");

router.get("/javascriptEvents",authentication,javascriptEvents);

//jobapp form ajax
const { jobappAjax, savedetailspost, getform, formupdateget } = require("../controllers/jobappwithajax");

router.get("/jobappAjax",authentication,jobappAjax);
router.post("/jobappAjax/save-details",authentication,savedetailspost)

router.get("/jobappAjax/form",authentication,getform)

router.get("/jobappAjax/form/update/:id",authentication,formupdateget)

//json placeholderapi

const { jsonplaceholderapi, details } = require("../controllers/jsonplaceholder");


router.get("/jsonplaceholder",authentication,jsonplaceholderapi);
router.get("/jsonplaceholder/details",authentication,details)

//pagination
const { pagination } = require("../controllers/pagination");

router.get("/pagination",authentication,pagination);



//sorting

const { sorting } = require("../controllers/sorting");
router.get("/sorting",authentication,sorting)

//tictactoe
const { tictactoe } = require("../controllers/tictactoe");

router.get("/TicTacToe",authentication,tictactoe)




module.exports=router;