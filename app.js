const express=require("express");
const authentication=require("./middleware/authentication.js")
const path=require("path")
const app=express();
const port=5000;
const attendancecontroller=require("./controllers/attendence.js")
require("dotenv").config()
const bodyParser=require("body-parser");
const crypto=require("crypto");

const bcrypt=require("bcrypt");



const md5=require("md5")
const jwt=require("jsonwebtoken")
const cookieparser=require("cookie-parser");
app.use(cookieparser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
const attendancerouter=require("./routes/attendanceroute.js")


// const alert=require("alert-node")

// app.get("/",(req,res)=>{
//    res.render("index.ejs")
// })


let f=require("./practice.js")
const mysql=require("mysql2")

app.set('view engine', 'ejs');


var con=mysql.createConnection({
    host:`${process.env.HOST}`,
    user:`${process.env.DBUSER}`,
    password:`${process.env.DBPASSWORD}`,
    database:`${process.env.DATABASE}`,
    port: 3306
})
con.connect(function(err){
    if(err)
    throw err;
   console.log("connected");
})

//delimeter search

app.use("/DelimeterSearch",require("./routes/delimeteroutes.js"))
app.listen(port,(err)=>{
    if(err){
        throw err
    }
    console.log(`server is running on port ${port}`);
})


app.use("/cukooCube",require("./routes/cukoocuberoutes.js"))

app.use("/dynamicTable",require("./routes/dynamictableroutes.js"))


app.use("/TicTacToe",require("./routes/tictactoeroutes.js"))


app.use("/javascriptEvents",require("./routes/javascripteventsroutes.js"))



app.use("/formsPractice",require("./routes/formspracticeroutes.js"))






//attendance grid



app.use('/attendance',require("./routes/attendanceroute.js"));

//exam grid app.js


app.use("/results",require("./routes/examgridroutes.js"))



//json placeholder api
app.use("/jsonplaceholder",require("./routes/jsonplaceholderroutes.js"))


//register login
app.use("/",require("./routes/registerroute.js"))

//pagination  

app.use("/pagination",require("./routes/paginationroutes.js"))





//job application form using ajax
app.use("/jobappAjax",require("./routes/jobappformajaxroutes.js"))

// app.get("/form",authentication,(req,res)=>{


//     res.render(path.join(__dirname,"/views/Ajax with Job Form/form2.ejs"),{data:null,data1:null,data2:null,data3:null,data4:null,data5:null,data6:null,data7:null})
// })

// app.get("/jobappAjax",authentication,(req,res)=>{
//     let sql3='select * from basic_detail';
//     con.query(sql3,(err,result)=>{
//         if(err){
//             throw err;
//         }
//         else{
//             console.log(result);
//             res.render(path.join(__dirname,'/views/Ajax with Job Form/data.ejs'),{users:result})
//         }
       
//     })
// })


// app.get("/form/update/:id",authentication,(req,res)=>{
//     var userId=req.params.id;
//     if(userId){
//         let sql=`select * from basic_detail where id='${userId}'`;
//         con.query(sql,(err,results)=>{
//             if(err){
//                 throw err;
//             }
//             else{
//                 console.log(sql);
//                 console.log(results);

//             let sql2=`select * from education_detail where employeeid='${userId}'`

//             con.query(sql2,(err,result2)=>{
//                if(err){
//                 console.log(err);
//                }
//                else{
//                 console.log(result2);
  
//                 let sql3=`select * from work_experiance  where employeeid='${userId}'`;
//                 con.query(sql3,(err,result3)=>{
//                     if(err){
//                         console.log(err);
//                     }
//                     else{
//                         console.log(result3);
//                    let sql4=`select  * from lang_known where  employeeid='${userId}'`
//                         con.query(sql4,(err,result4)=>{
//                             if(err){
//                                 console.log(err);
//                             }
//                             else{
//                                 console.log(result4);

//                     let sql5=`select * from tech_know where  employeeid='${userId}' `  ;        
//                     con.query(sql5,(err,result5)=>{
//                         if(err){
//                             console.log(err);
//                         }
//                         else{
//                             console.log(result5);

//                        let sql6=`select * from reference_contact  where  employeeid='${userId}'`
//                        con.query(sql6,(err,result6)=>{
//                         if(err){
//                             console.log(err);
//                         }
//                         else{
//                             console.log(result6);

//                          let sql7=`select * from preferences where  employeeid='${userId}'`   

//                          con.query(sql7,(err,result7)=>{
//                             if(err){
//                                 console.log(err);
//                             }
//                             else{
//                                 console.log(result7);
//                                 res.render(path.join(__dirname,'/views/Ajax with Job Form/form2.ejs'),{data1:results[0],data:result2,data2:null,data3:result3,data4:result4,j:0,data5:result6,data6:result5,i:0,data7:result7[0]})
//                             }
//                          })
                          
//                         }
//                        })     
                           
//                         }
//                     })
                             
//                             }
//                         })
                        
//                     }
//                 })
             
//                }
//             })
                
//             }
//         })
//     }
// })

// app.post("/save-details",authentication,(req,res)=>{
//    console.log(req.body);
// let mainId;
//    let data=req.body;
//    const {fname,lname,desig,emailid,Pnumber,add1,add2,city,state,statusRelation,gendervalue,zipcode,dob}=data;

// console.log(fname,lname,desig,emailid,Pnumber,add1,add2,city,state,statusRelation,gendervalue,zipcode,dob);
// //education details
// let {boardnames,passingyears,percentages}=data;
// //work experiance
// let {cnamesarr,designationsarr,fromdatesarr,todatesarr}=data;
// console.log(req.body);
// //preference
// let {refnamesarr,refcontactsarr,refrelationsarr}=data;

// //language known 
// let {languageknown}=data;
// let {lidarr}=data;

// //techknown
// let {techknown}=data;
// let {tidarr}=data;

// //preferences
// let {location,noticeP,expectedCTC,currentCTC,department}=data;
// let {pid}=data;

// if(data.idb==='')
// {  
// var sql=`insert into basic_detail (firstname,lastname,designation,email,phone,relation,add1,add2,city,state,zipcode,dob,gender) values("${fname}","${lname}", "${desig}","${emailid}","${Pnumber}","${statusRelation}","${add1}","${add2}","${city} ","${state}","${zipcode}","${dob}","${gendervalue}")`;
//    console.log(sql);
// con.query(sql,(err,result)=>{
//  if(err){
//      console.log(err);
//  }
//  else{
//  mainId=result.insertId;
// console.log(result);
// for(let i=0;i<boardnames.length;i++){
//     var sql2=`insert into education_detail (employeeid,boardname,passingyear,percentage) values('${mainId}','${boardnames[i]}','${passingyears[i]}','${percentages[i]}')`
// con.query(sql2,(err,result)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(result);

//     }
// })

// }
// //work experiance
// for(let i=0;i<cnamesarr.length;i++){
//     let query1=`insert into work_experiance (employeeid,companyname,designation,fromdate,todate) values('${mainId}','${cnamesarr[i]}','${designationsarr[i]}','${fromdatesarr[i]}','${todatesarr[i]}')`;
//     con.query(query1,(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(result);
    
//         }
//     })

//     }


// console.log(languageknown);
// console.log(techknown);

//     for(let i=0;i<languageknown.length;i++){
//         let condition=Object.keys(languageknown[i]).length;
        

//         // console.log(val);
//         // console.log();
//         if(condition>0){
//          let val=Object.keys(languageknown[i])[0];
//         let valarr=languageknown[i][val];
//         let query2=`insert into lang_known (employeeid,language,canread,canwrite,canspeak) values ('${mainId}','${val}','${valarr[0]}','${valarr[1]}','${valarr[2]}')`;
    
//         con.query(query2,(err,result)=>{
//             if(err){
//              console.log(err);
//             }
//             else{
//                 console.log(result);
//             }
//         })
//         }
//     }
//     for(let i=0;i<techknown.length;i++){
       
//         // console.log(val);
//         // console.log()

//         let condition=Object.keys(techknown[i]).length;
    

//         // console.log(val);
//         // console.log();
//         if(condition>0 ){
//             let val=Object.keys(techknown[i])[0];
//         let level=techknown[i][val];
     
//         let query3=`insert into tech_know (employeeid,techname,level) values('${mainId}','${val}','${level}')`;
//         con.query(query3,(err,result)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log(result);
//             }
//         })
//     }
// }
    
// for(let i=0;i<refnamesarr.length;i++ ){
//     let query1=`insert into reference_contact (employeeid,companyname,contactnumber,relation) values('${mainId}','${refnamesarr[i]}','${refcontactsarr[i]}','${refrelationsarr[i]}')`
    
//     con.query(query1,(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//         console.log(result);
//         }
//     })
    
    
//     }
//     console.log(mainId+" mainfnfj");
    
//     let query7=`insert into preferences(employeeid,preferedlocation,noticePeriod,expectedctc,currentctc,department) values('${mainId}','${location}','${noticeP}','${expectedCTC}','${currentCTC}','${department}')`
//     con.query(query7,(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(result);
           
//         }
//     })
//     res.send("succesfull");
//     }
 
// })
// }

// //update logic
// else{

// let idb=data.idb;
// let {widfinalarr,ridfinalarr,eidfinalarr }=data


// var sql=`update basic_detail set firstname='${fname}',lastname='${lname}',designation='${desig}' ,email='${emailid}',phone='${Pnumber}',gender='${gendervalue}',relation='${statusRelation}',add1='${add1}',add2='${add2}',city='${city}',state='${state}',zipcode='${zipcode}',dob='${dob}' where id='${idb}'`
      
// con.query(sql,(err,result)=>{
//             if(err){
//                 throw err;
//             }
//             else{ 
//                 console.log("records updated successfully");

// for(let i=0;i<boardnames.length;i++){
//     var update2;
//     if(eidfinalarr[i]!=""){
//      update2=`update  education_detail set  boardname ='${boardnames[i]}',passingyear='${passingyears[i]}',percentage='${percentages[i]}' where id='${eidfinalarr[i]}'`;
//     }
//     else {
//      update2=`insert into education_detail (employeeid,boardname,passingyear,percentage) values('${idb}','${boardnames[i]}','${passingyears[i]}','${percentages[i]}')`
//     }

//     con.query(update2,(err,result2)=>{
//         if(err){
//             throw err;
//         }
//         else{
//             console.log(result2);
//         }
//     })
// }


// //work experiance update
// for(let i=0;i<cnamesarr.length;i++){
//     var update3;

//     if(widfinalarr[i]!=""){
//         update3=`update work_experiance set companyname='${cnamesarr[i]}',designation='${designationsarr[i]}',fromdate='${fromdatesarr[i]}',todate='${todatesarr[i]}' where id='${widfinalarr[i]}'`;
//     }
//     else{
//         update3=`insert into work_experiance (employeeid,companyname,designation,fromdate,todate) values('${idb}','${cnamesarr[i]}','${designationsarr[i]}','${fromdatesarr[i]}','${todatesarr[i]}')`;
//     }
//     con.query(update3,(err,result)=>{
//         if(err){
//             throw err;
//         }
//         else{
//             console.log(result);
//         }
//     })
// }

// //reference update
// for(let i=0;i<refnamesarr.length;i++ ){
//     var update4;
// if(ridfinalarr[i]!=""){

//     update4=`update reference_contact  set companyname='${refnamesarr[i]}',contactnumber='${refcontactsarr[i]}',relation='${refrelationsarr[i]}' where id='${ridfinalarr[i]}'`
// }   
// else{
//  update4=`insert into reference_contact (employeeid,companyname,contactnumber,relation) values('${idb}','${refnamesarr[i]}','${refcontactsarr[i]}','${refrelationsarr[i]}')`
// } 
//     con.query(update4,(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//         console.log(result);
//         }
//     })
    
    
//     }

// //preference Id;    

// let update5=`update preferences set preferedlocation='${location}',noticePeriod='${noticeP}', expectedctc ='${expectedCTC}',currentctc='${currentCTC}',department='${department}' where id='${pid}'`


// con.query(update5,(err,result)=>{
//     if(err){
//         throw err;
//     }
//     else{
//         console.log(result);
//     }

// })


// //language known update
// for(let i=0;i<languageknown.length;i++){
//     let condition=Object.keys(languageknown[i]).length;
    

//     // console.log(val);
//     // console.log();
//     if(condition>0 ){
//         let val=Object.keys(languageknown[i])[0];
//     let valarr=languageknown[i][val];
//     if(lidarr[i]!="") {   
    
//     let update6=`update lang_known set language='${val}',canread='${valarr[0]}',canwrite='${valarr[1]}',canspeak='${valarr[2]}' where id=${lidarr[i]}`;
//      con.query(update6,(err,result)=>{
//         if(err){
//          console.log(err);
//         }
//         else{
//             console.log(result);
//         }
//     })
// }  
// else if(lidarr[i]==="" ){
//     let update6=`insert into lang_known (employeeid,language,canread,canwrite,canspeak) values ('${idb}','${val}','${valarr[0]}','${valarr[1]}','${valarr[2]}')`;
//     con.query(update6,(err,result)=>{
//         if(err){
//          console.log(err);
//         }
//         else{
//             console.log(result);
//         }
//     })


// }
//     }
// }


// //technology known
// for(let i=0;i<techknown.length;i++){
//     let condition=Object.keys(techknown[i]).length;
    

//     // console.log(val);
//     // console.log();
//     if(condition>0 ){
//     let val=Object.keys(techknown[i])[0];
//     let level=techknown[i][val];
//     if(tidarr[i]!="") {   
    
//     let update7=`update tech_know set  techname='${val}',level='${level}' where id='${tidarr[i]}'`;
//      con.query(update7,(err,result)=>{
//         if(err){
//          console.log(err);
//         }
//         else{
//             console.log(result);
//         }
//     })
// }  
// else if(tidarr[i]==="" ){
//     let update7=`insert into tech_know (employeeid,techname,level) values('${idb}','${val}','${level}')`;
//     con.query(update7,(err,result)=>{
//         if(err){
//          console.log(err);
//         }
//         else{
//             console.log(result);
//         }
//     })


// }
//     }
// }

//             }
//             res.redirect(path.join(__dirname,"/views/Ajax with Job Form/data.ejs"));
//         })
       

    
// }
// })


// app.get("/sorting",authentication,(req,res)=>{
//     res.sendFile(__dirname+"/views/sorting/sorting_exercise.html")
// })

// app.get("/htmlcss1",authentication,(req,res)=>{
//     res.sendFile(__dirname+"/views/htmlCSSExercise/index.html")
// })

app.use("/sorting",require("./routes/sortingroute.js"))

app.use("/htmlcss1",require("./routes/htmlcss1routes.js"))


app.get("/htmlcss2",authentication,(req,res)=>{
    res.sendFile(__dirname+"/views/htmlcssexercise2/index.html")
})

app.get("/htmlcss3",authentication,(req,res)=>{
    res.sendFile(__dirname+"/views/htmlexercise3/index.html")
})


//dynamic query table
app.use("/dynamicquery",require("./routes/dynamicqueryroutes.js"))
