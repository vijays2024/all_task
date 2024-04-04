const con=require("../connection/connection")
const path=require("path")


const tictactoe=(req,res)=>{
      res.render("Tic Tac Toe/tictactoe.ejs")
 }

 module.exports={tictactoe}