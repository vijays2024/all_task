const con=require("../connection/connection")
const path=require("path")


const tictactoe=(req,res)=>{
      res.sendFile("/home/vijay-solanki/Alltasks/views/Tic Tac Toe/tictactoe.html")
 }

 module.exports={tictactoe}