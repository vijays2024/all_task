const express=require("express");
const authentication=require("./middleware/authentication.js")
const path=require("path")
const app=express();
const port=5000;

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



const alert=require("alert-node")
app.set("view engine",'ejs');
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


app.get("/DelimeterSearch",authentication,(req,res)=>{

   let query1=req.query.query ||"select * from student_master limit 10"; 
   let string1="select * from student_master limit 10";
   if(query1!="select * from student_master limit 10"){
    string1=query1;
   }
   if(query1==="select * from student_master limit 10"){

   }
   else{
    query1=f.stringReturn(string1);
   }
   con.query(query1,(err,result)=>{
    if(err){
        res.send("something went wrong");
    }
  
    let pathval=path.join(__dirname,"views/Delimeter search/data.ejs");
    res.render(pathval,{data:result,query:string1})
   })
}
);




app.listen(port,(err)=>{
    if(err){
        throw err
    }
    console.log(`server is running on port ${port}`);
})

app.get("/cukooCube",authentication,(req,res)=>{
    // console.log(path.join(__dirname,"/views/cukoo cube/kuku_cube_exercise_js_.html"));

    res.sendFile(path.join(__dirname,"/views/cukoo cube/kuku_cube_exercise_js_.html"));
})

app.get("/dynamicTable",authentication,(req,res)=>{
   
    res.sendFile(path.join(__dirname,"/views/dynamic_table/DynamicTable.html"))
})
app.get("/TicTacToe",authentication,(req,res)=>{
    // res.send("TicTacToe");
    res.sendFile(path.join(__dirname,"/views/Tic Tac Toe/tictactoe.html"))
   
})

app.get("/htmlCss",authentication,(req,res)=>{
    res.send("htmlCss");
})


app.get("/javascriptEvents",authentication,(req,res)=>{

    res.sendFile(path.join(__dirname,"/views/javascript Events/javascriptEventPractice.html"))
})

app.get("/formsPractice", authentication,(req,res)=>{

    res.sendFile(path.join(__dirname,"/views/forms Practice/job_app_form_4.html"))
})





//attendance grid
app.get("/attendance",authentication,(req,res)=>{
    // console.log(typeof req.query.page)
    const page=+req.query.page ||1;
    let Items_per_page=10;
    // console.log(typeof page)
    const offset=(page-1)*Items_per_page;
select=req.query.select || "2023-12-30";
arr=select.split("-");
    const lastIndex=20;
    
   

  let  query=`select student.stdentId,student.firstname,student.lastname,count(attendance.statusPA) as total_days from student inner join attendance where student.stdentId=attendance.studentId and attendance.statusPA="present" and attendance.attendanceDate between "${arr[0]}-${arr[1]}-01" and "${arr[0]}-${arr[1]}-${arr[2]}" group by student.stdentId order by student.stdentId  limit ${Items_per_page} offset ${offset}`


    con.query(query,(err,result)=>{
        if(err){
            console.log(err);
            res.send("something went wrong");
        }
        else {
        //    console.log(result);
        // /home/vijay-solanki/Alltasks/views/exam Grid/data.ejs
       
            res.render('/home/vijay-solanki/Alltasks/views/exam Grid/data.ejs',{
                 data:result,
                days:Number(`${arr[2]}`),
                currentPage:page,
                hasNextPage:(Items_per_page*page)<200,
                hasPreviousPage:page>1, 
                nextPage:page+1,
                previousPage:page-1,
                lastPage:Math.ceil(200/Items_per_page),
                lastIndex:lastIndex,
                month:Number(`${arr[1]}`),
                select:select,
            })
        }
    })
})




//exam grid app.js
app.get("/results",authentication,(req,res)=>{
    const page=+req.query.page ||1;
    let Items_per_page=10;
    const offset=(page-1)*Items_per_page;
select=req.query.select || "2023-12-30";
arr=select.split("-");
    const lastIndex=20;
    
   

  let  query=`select student.stdentId ,student.firstname,
  sum(CASE
      WHEN result_master.exam_id=1 THEN result_master.obtain_practical_marks
      else 0 end)
   AS total_prelim_practical_marks,
  sum(CASE
      WHEN result_master.exam_id=1 THEN result_master.obtain_theory_marks
      else 0 END)
   AS total_prelim_theory_marks,
  sum(CASE
      WHEN result_master.exam_id=2 THEN (result_master.obtain_practical_marks)
       else 0
  END) AS total_terminal_practical_marks,
  sum(CASE
      WHEN result_master.exam_id=2 THEN (result_master.obtain_theory_marks)
       else 0
  END) AS total_terminal_theory_marks,
  sum(CASE
      WHEN result_master.exam_id=3 THEN (result_master.obtain_practical_marks)
       else 0
  END)AS total_final_practical_marks,
  sum(CASE
      WHEN result_master.exam_id=3 THEN (result_master.obtain_theory_marks)
       else 0
  END )AS total_final_theory_marks
   from student inner join result_master where student.stdentId=result_master.student_id 
   group by student.stdentId
   limit ${Items_per_page} offset ${offset}`


    con.query(query,(err,result)=>{
        if(err){
            console.log(err);
            res.send("something went wrong");
        }
        else {
        //    console.log(result);

       // /home/vijay-solanki/Alltasks/views/exam Grid/data.ejs
            res.render('/home/vijay-solanki/Alltasks/views/exam Grid/search.ejs',{
                 results:result,
                days:Number(`${arr[2]}`),
                currentPage:page,
                hasNextPage:(Items_per_page*page)<200,
                hasPreviousPage:page>1, 
                nextPage:page+1,
                previousPage:page-1,
                lastPage:Math.ceil(200/Items_per_page),
                lastIndex:lastIndex,
                month:Number(`${arr[1]}`),
                select:select,
            })
        }
    })
})

app.get("/results/:id",authentication,(req,res)=>{
    let userId=req.params.id;
   
    const query=`
    select student.stdentId ,subject_master.subjectName,student.firstname,
    sum(CASE
        WHEN result_master.exam_id=1 THEN result_master.obtain_practical_marks
        else 0 end)
     AS prelim,
    sum(CASE
        WHEN result_master.exam_id=1 THEN result_master.obtain_theory_marks
        else 0 END)
     AS prelim_theory,
    sum(CASE
        WHEN result_master.exam_id=2 THEN (result_master.obtain_practical_marks)
         else 0
    END) AS terminal,
    sum(CASE
        WHEN result_master.exam_id=2 THEN (result_master.obtain_theory_marks)
         else 0
    END) AS terminal_theory,
    sum(CASE
        WHEN result_master.exam_id=3 THEN (result_master.obtain_practical_marks)
         else 0
    END)AS final,
    sum(CASE
        WHEN result_master.exam_id=3 THEN (result_master.obtain_theory_marks)
         else 0
    END )AS final_theory
     from ((student  inner join result_master  on student.stdentId=result_master.student_id )  
     left join subject_master on result_master.subject_id=subject_master.subjectId)
     where result_master.student_id =${userId}
     group by result_master.subject_id
     `;
    console.log(userId); 
  
     con.query(query,(err,result)=>{
        let query4=`select count(studentId) as total from attendance where statusPA='present' and studentId=${userId}`
        con.query(query4,(err,result1)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("success");
                console.log(result1);
            }
      res.render('/home/vijay-solanki/Alltasks/views/exam Grid/personal.ejs',{
                 data:result,
                 attendence:result1,
                 total_marks:0,
            })
        })
    
    })

})


app.post('/postdata',authentication,(req,res)=>{
    console.log(req.body);
    const Items_per_page = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * Items_per_page;
     let option1=req.body.option1;
    let fname = req.body.firstname;
    let prilim = req.body.prilim;
    let terminal = req.body.terminal;
    let final = req.body.final;
    let total = req.body.total;
   if(prilim===""){
    prilim=0;
   }
   if(terminal===""){
    terminal=0;
   }
   if(final===""){
    final=0;
   }
   if(total===""){
    total=0;
   }
  
    console.log(prilim);
    

    // if(req.body.and_or == 'and'){

    // }  
    con.query(`select * from (SELECT 
        student.stdentId,
        student.firstname,
        SUM(CASE
            WHEN exam_master.exam_type = 'prilim' THEN result_master.obtain_practical_marks
            ELSE 0
        END) AS total_prelim_practical_marks,
        SUM(CASE
            WHEN exam_master.exam_type = 'prilim' THEN result_master.obtain_theory_marks
            ELSE 0
        END) AS total_prelim_theory_marks,
        SUM(CASE
            WHEN exam_master.exam_type = 'Terminal' THEN result_master.obtain_practical_marks
            ELSE 0
        END) AS total_terminal_practical_marks,
        SUM(CASE
            WHEN exam_master.exam_type = 'Terminal' THEN result_master.obtain_theory_marks
            ELSE 0
        END) AS total_terminal_theory_marks,
        SUM(CASE
            WHEN exam_master.exam_type = 'Final' THEN result_master.obtain_practical_marks
            ELSE 0
        END) AS total_final_practical_marks,
        SUM(CASE
            WHEN exam_master.exam_type = 'Final' THEN result_master.obtain_theory_marks
            ELSE 0
        END) AS total_final_theory_marks,
        SUM(result_master.obtain_practical_marks + result_master.obtain_theory_marks) AS total
    FROM
        student
            INNER JOIN
        result_master ON student.stdentId = result_master.student_id
            INNER JOIN
        exam_master ON result_master.exam_id = exam_master.exam_id
    GROUP BY student.stdentId order by student.stdentId) as tt1 WHERE
    firstname LIKE '%${fname}%'
            ${option1} (total_prelim_practical_marks + total_prelim_theory_marks) > ${prilim}
            ${option1} (total_terminal_practical_marks + total_terminal_theory_marks) > ${terminal}
            ${option1} (total_final_practical_marks + total_final_theory_marks) > ${final}
            ${option1} total >${total}
            ;`,(err,rows)=>{
                console.log(rows);
        if(err) throw err;
       let lastIndex=Math.ceil(200/Items_per_page);
       
        res.render('/home/vijay-solanki/Alltasks/views/exam Grid/search.ejs',{results:rows, currentPage:page,
            hasNextPage:(Items_per_page*page)<200,
            hasPreviousPage:page>1, 
            nextPage:page+1,
            previousPage:page-1,
            lastPage:Math.ceil(200/Items_per_page),
            lastIndex:lastIndex});
    });
});



//json placeholder api

// /views/forms Practice/job_app_form_4.html
// /home/vijay-solanki/Alltasks/views/json Placeholder Api/index2.html
app.get("/jsonplaceholder",authentication,(req,res)=>{
    res.sendFile(__dirname+"/views/json Placeholder Api/index2.html")
})


app.get("/details",authentication,(req,res)=>{
    res.sendFile(__dirname+"/views/json Placeholder Api/personal.html")
})

//register login


app.get("/",(req,res)=>{
   if(req.cookies.token){
        let token=req.cookies.token;
        let user= jwt.verify(token,"sdjhksd");
        if(user.email==="vijay@gmail.com"){
   
        res.render("index");
        }
        else{
         res.redirect("/sign_in")
        }
     
    }
    else{
        res.render("signup");
    }
})


app.post("/sign_up", async (req,res)=>{
    try{
        
        const {fname,lname,email}=req.body;

        console.log(req.body);

       const isUserExist = await con.promise().query(`select * from users where email='${email}'`);

       console.log(isUserExist);
       
        if(isUserExist[0].length!==0){
            return res.json({msg:"invalid email"});
        }
        const characters='ABCDEFGHIJKLM1234567890NOPQRSTUVWXYZ';
        const charactersLength=characters.length;
        let counter=0;
        let salt=""
        let access_key=""
        while(counter<=12){
            salt+=characters.charAt(Math.floor(Math.random()*charactersLength))
            access_key+=characters.charAt(Math.floor(Math.random()*charactersLength));
            counter+=1;
        }
        salt=salt.slice(0,4);
        let response = await con.promise().query(`insert into users(first_name,last_name,email,salt,access_key) values ('${fname}','${lname}','${email}','${salt}','${access_key}')`);
        console.log(response);
        res.json({id:response[0].insertId,access_key,salt})
    }
    catch(error){
        console.log(error);
    }
})

app.get("/password",async (req,res)=>{
    try{
    const {id,access_key,salt}=req.query;
    console.log("id");
    console.log(id);
    let data= await con.promise().query(`select * from users where id='${id}'`)
    console.log(data);
    let isvalid=true;
    if(access_key !== data[0][0].access_key) isvalid=false;
    var diff = new Date().valueOf() - data[0][0].created_at.valueOf();
    console.log(diff);
    let hours=Math.floor(diff/(1000*60*60))
    console.log(hours);
    res.render("password",{id,access_key,hours,salt,isvalid})
}
    catch(error){
        console.log(error);
    }
   
})

app.post("/password",async (req,res)=>{
    try{
        const {id,salt,password,r_password}=req.body;
        // console.log(id);
        // console.log(req.body);
        // console.log(req);
        if(password===r_password){
            const hashed=md5(password+salt);
              let data=await con.promise().query(`update users set password='${hashed}' where id=${id}`)
            res.json({status:200,msg:"Account activated successfully"});
        
        }
        else{
            res.json({status:400,msg:"please enter same password"});
        }
res.json({})
    }

catch(error){
    console.log(error);
}
})

app.get("/sign_in",(req,res)=>{
    res.render("signin.ejs")
})

app.post("/sign_in",async (req,res)=>{
    try{
        const {email,password}=req.body;
        let isUserExist=await con.promise().query(`select * from users where email='${email}'`)
        if(isUserExist[0].length==0){
            return res.json({msg:"Invalid email or password",msg2:""})

        }
        const user=isUserExist[0][0];
        const id=user.id;
        const d_password=md5(password+user.salt);
        if(user.password!==d_password){
            return res.json({msg:"Invalid email or password",msg2:""})
        } 
        const token=jwt.sign({email},"sdjhksd",{expiresIn:"1h"})
        res.cookie('token',token,{expires:new Date(Date.now()+900000),httpOnly:true})
        console.log("token",token);
      return res.json({msg:"login succesfully",token,msg_2:"click here to <a href=/> Go to dashboard</a>"})

    }
    catch(error){
        console.log(error);
    }
})
// app.get("/home",(req,res)=>{
//     res.render("home")
// })
app.get("/logout",authentication,(req,res)=>{
    res.clearCookie('token');
    res.redirect("/sign_in")
})

app.get("/forgotPassword1",(req,res)=>{
    res.render("forgotPassword1.ejs");
})
app.get("/forgotPassword",(req,res)=>{
    res.render("forgotPassword.ejs")
})
app.post("/forgotPassword1",async (req,res)=>{
    let email=req.body.email;
    console.log(req.body);
    
    let result= await con.promise().query(`select * from users where email='${email}'`)
    console.log(result[0]);
    if(result[0].length===0){
        return res.json({msg:"Invalid Email"})
    }
    else {
        console.log("end");
        return res.json({msg:"succesfull",email:email})
    
    }
   
})
app.post("/forgotPassword",async (req,res)=>{

    try{
    let email=req.body.email;    
    let password=req.body.password;
   
    let result=await con.promise().query(`select salt from users where email='${email}'`)
    console.log(result[0][0].salt);
    let salt=result[0][0].salt;
    let  hashed=md5(password+salt);

    let data=await con.promise().query(`update users set password='${hashed}' where email='${email}'`)
    console.log(data);
    if(data.length>0){
        return res.json({msg:"succesfull"})
    }
    
    }
    catch(error){
        console.log(error);
    }

})

//pagination  

app.get("/pagination",authentication,(req,res)=>{
    let Items_per_page=10;
    const page=+req.query.pages ||1;
    const offset=(page-1)*Items_per_page;
    const sortcolumn=req.query.sort || 'firstname';
    const sortOrder=req.query.sortOrder || 'ASC'
    
   
    con.query('select count(*) AS total from student_master',(err,result)=>{
        if(err){
            console.log(err);
            res.send("something went wrong");
        }
      else {
        const total=result[0].total;
        const lastIndex=Math.floor(total/10);
   const query=`select * from student_master order by ${sortcolumn} ${sortOrder} limit 10 offset ${offset} `;

   const values=[sortcolumn,offset,10];
    // con.query('select * from student_master limit ?,?',[offset,10],(err,result)=>{
           con.query(query,values,(err,result)=>{
        if(err){
            console.log(err);

            res.send("something went wrong");
        }
        else {
           
        
        
            res.render('/home/vijay-solanki/Alltasks/views/pagination/data.ejs',{
                data:result,
                currentPage:page,
                hasNextPage:(Items_per_page*page)<total,
                hasPreviousPage:page>1, 
                nextPage:page+1,
                previousPage:page-1,
                lastPage:Math.ceil(total/Items_per_page),
                lastIndex:lastIndex,
                sortBy:sortcolumn,
                sortOrder:sortOrder,
            })
        }
    })
}
})

})



//job application form using ajax

app.get("/form",authentication,(req,res)=>{


    res.render("/home/vijay-solanki/Alltasks/views/Ajax with Job Form/form2.ejs",{data:null,data1:null,data2:null,data3:null,data4:null,data5:null,data6:null,data7:null})
})

app.get("/jobappAjax",authentication,(req,res)=>{
    let sql3='select * from basic_detail';
    con.query(sql3,(err,result)=>{
        if(err){
            throw err;
        }
        else{
            console.log(result);
            res.render('/home/vijay-solanki/Alltasks/views/Ajax with Job Form/data.ejs',{users:result})
        }
       
    })
})


app.get("/form/update/:id",authentication,(req,res)=>{
    var userId=req.params.id;
    if(userId){
        let sql=`select * from basic_detail where id='${userId}'`;
        con.query(sql,(err,results)=>{
            if(err){
                throw err;
            }
            else{
                console.log(sql);
                console.log(results);

            let sql2=`select * from education_detail where employeeid='${userId}'`

            con.query(sql2,(err,result2)=>{
               if(err){
                console.log(err);
               }
               else{
                console.log(result2);
  
                let sql3=`select * from work_experiance  where employeeid='${userId}'`;
                con.query(sql3,(err,result3)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(result3);
                   let sql4=`select  * from lang_known where  employeeid='${userId}'`
                        con.query(sql4,(err,result4)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(result4);

                    let sql5=`select * from tech_know where  employeeid='${userId}' `  ;        
                    con.query(sql5,(err,result5)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(result5);

                       let sql6=`select * from reference_contact  where  employeeid='${userId}'`
                       con.query(sql6,(err,result6)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(result6);

                         let sql7=`select * from preferences where  employeeid='${userId}'`   

                         con.query(sql7,(err,result7)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(result7);
                                res.render('/home/vijay-solanki/Alltasks/views/Ajax with Job Form/form2.ejs',{data1:results[0],data:result2,data2:null,data3:result3,data4:result4,j:0,data5:result6,data6:result5,i:0,data7:result7[0]})
                            }
                         })
                          
                        }
                       })     
                           
                        }
                    })
                             
                            }
                        })
                        
                    }
                })
             
               }
            })
                
            }
        })
    }
})

app.post("/save-details",authentication,(req,res)=>{
   console.log(req.body);
let mainId;
   let data=req.body;
   const {fname,lname,desig,emailid,Pnumber,add1,add2,city,state,statusRelation,gendervalue,zipcode,dob}=data;

console.log(fname,lname,desig,emailid,Pnumber,add1,add2,city,state,statusRelation,gendervalue,zipcode,dob);
//education details
let {boardnames,passingyears,percentages}=data;
//work experiance
let {cnamesarr,designationsarr,fromdatesarr,todatesarr}=data;
console.log(req.body);
//preference
let {refnamesarr,refcontactsarr,refrelationsarr}=data;

//language known 
let {languageknown}=data;
let {lidarr}=data;

//techknown
let {techknown}=data;
let {tidarr}=data;

//preferences
let {location,noticeP,expectedCTC,currentCTC,department}=data;
let {pid}=data;

if(data.idb==='')
{  
var sql=`insert into basic_detail (firstname,lastname,designation,email,phone,relation,add1,add2,city,state,zipcode,dob,gender) values("${fname}","${lname}", "${desig}","${emailid}","${Pnumber}","${statusRelation}","${add1}","${add2}","${city} ","${state}","${zipcode}","${dob}","${gendervalue}")`;
   console.log(sql);
con.query(sql,(err,result)=>{
 if(err){
     console.log(err);
 }
 else{
 mainId=result.insertId;
console.log(result);
for(let i=0;i<boardnames.length;i++){
    var sql2=`insert into education_detail (employeeid,boardname,passingyear,percentage) values('${mainId}','${boardnames[i]}','${passingyears[i]}','${percentages[i]}')`
con.query(sql2,(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(result);

    }
})

}
//work experiance
for(let i=0;i<cnamesarr.length;i++){
    let query1=`insert into work_experiance (employeeid,companyname,designation,fromdate,todate) values('${mainId}','${cnamesarr[i]}','${designationsarr[i]}','${fromdatesarr[i]}','${todatesarr[i]}')`;
    con.query(query1,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
    
        }
    })

    }


console.log(languageknown);
console.log(techknown);

    for(let i=0;i<languageknown.length;i++){
        let condition=Object.keys(languageknown[i]).length;
        

        // console.log(val);
        // console.log();
        if(condition>0){
         let val=Object.keys(languageknown[i])[0];
        let valarr=languageknown[i][val];
        let query2=`insert into lang_known (employeeid,language,canread,canwrite,canspeak) values ('${mainId}','${val}','${valarr[0]}','${valarr[1]}','${valarr[2]}')`;
    
        con.query(query2,(err,result)=>{
            if(err){
             console.log(err);
            }
            else{
                console.log(result);
            }
        })
        }
    }
    for(let i=0;i<techknown.length;i++){
       
        // console.log(val);
        // console.log()

        let condition=Object.keys(techknown[i]).length;
    

        // console.log(val);
        // console.log();
        if(condition>0 ){
            let val=Object.keys(techknown[i])[0];
        let level=techknown[i][val];
     
        let query3=`insert into tech_know (employeeid,techname,level) values('${mainId}','${val}','${level}')`;
        con.query(query3,(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
            }
        })
    }
}
    
for(let i=0;i<refnamesarr.length;i++ ){
    let query1=`insert into reference_contact (employeeid,companyname,contactnumber,relation) values('${mainId}','${refnamesarr[i]}','${refcontactsarr[i]}','${refrelationsarr[i]}')`
    
    con.query(query1,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
        console.log(result);
        }
    })
    
    
    }
    console.log(mainId+" mainfnfj");
    
    let query7=`insert into preferences(employeeid,preferedlocation,noticePeriod,expectedctc,currentctc,department) values('${mainId}','${location}','${noticeP}','${expectedCTC}','${currentCTC}','${department}')`
    con.query(query7,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
           
        }
    })
    res.send("succesfull");
    }
 
})
}

//update logic
else{

let idb=data.idb;
let {widfinalarr,ridfinalarr,eidfinalarr }=data


var sql=`update basic_detail set firstname='${fname}',lastname='${lname}',designation='${desig}' ,email='${emailid}',phone='${Pnumber}',gender='${gendervalue}',relation='${statusRelation}',add1='${add1}',add2='${add2}',city='${city}',state='${state}',zipcode='${zipcode}',dob='${dob}' where id='${idb}'`
      
con.query(sql,(err,result)=>{
            if(err){
                throw err;
            }
            else{ 
                console.log("records updated successfully");

for(let i=0;i<boardnames.length;i++){
    var update2;
    if(eidfinalarr[i]!=""){
     update2=`update  education_detail set  boardname ='${boardnames[i]}',passingyear='${passingyears[i]}',percentage='${percentages[i]}' where id='${eidfinalarr[i]}'`;
    }
    else {
     update2=`insert into education_detail (employeeid,boardname,passingyear,percentage) values('${idb}','${boardnames[i]}','${passingyears[i]}','${percentages[i]}')`
    }

    con.query(update2,(err,result2)=>{
        if(err){
            throw err;
        }
        else{
            console.log(result2);
        }
    })
}


//work experiance update
for(let i=0;i<cnamesarr.length;i++){
    var update3;

    if(widfinalarr[i]!=""){
        update3=`update work_experiance set companyname='${cnamesarr[i]}',designation='${designationsarr[i]}',fromdate='${fromdatesarr[i]}',todate='${todatesarr[i]}' where id='${widfinalarr[i]}'`;
    }
    else{
        update3=`insert into work_experiance (employeeid,companyname,designation,fromdate,todate) values('${idb}','${cnamesarr[i]}','${designationsarr[i]}','${fromdatesarr[i]}','${todatesarr[i]}')`;
    }
    con.query(update3,(err,result)=>{
        if(err){
            throw err;
        }
        else{
            console.log(result);
        }
    })
}

//reference update
for(let i=0;i<refnamesarr.length;i++ ){
    var update4;
if(ridfinalarr[i]!=""){

    update4=`update reference_contact  set companyname='${refnamesarr[i]}',contactnumber='${refcontactsarr[i]}',relation='${refrelationsarr[i]}' where id='${ridfinalarr[i]}'`
}   
else{
 update4=`insert into reference_contact (employeeid,companyname,contactnumber,relation) values('${idb}','${refnamesarr[i]}','${refcontactsarr[i]}','${refrelationsarr[i]}')`
} 
    con.query(update4,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
        console.log(result);
        }
    })
    
    
    }

//preference Id;    

let update5=`update preferences set preferedlocation='${location}',noticePeriod='${noticeP}', expectedctc ='${expectedCTC}',currentctc='${currentCTC}',department='${department}' where id='${pid}'`


con.query(update5,(err,result)=>{
    if(err){
        throw err;
    }
    else{
        console.log(result);
    }

})


//language known update
for(let i=0;i<languageknown.length;i++){
    let condition=Object.keys(languageknown[i]).length;
    

    // console.log(val);
    // console.log();
    if(condition>0 ){
        let val=Object.keys(languageknown[i])[0];
    let valarr=languageknown[i][val];
    if(lidarr[i]!="") {   
    
    let update6=`update lang_known set language='${val}',canread='${valarr[0]}',canwrite='${valarr[1]}',canspeak='${valarr[2]}' where id=${lidarr[i]}`;
     con.query(update6,(err,result)=>{
        if(err){
         console.log(err);
        }
        else{
            console.log(result);
        }
    })
}  
else if(lidarr[i]==="" ){
    let update6=`insert into lang_known (employeeid,language,canread,canwrite,canspeak) values ('${idb}','${val}','${valarr[0]}','${valarr[1]}','${valarr[2]}')`;
    con.query(update6,(err,result)=>{
        if(err){
         console.log(err);
        }
        else{
            console.log(result);
        }
    })


}
    }
}


//technology known
for(let i=0;i<techknown.length;i++){
    let condition=Object.keys(techknown[i]).length;
    

    // console.log(val);
    // console.log();
    if(condition>0 ){
    let val=Object.keys(techknown[i])[0];
    let level=techknown[i][val];
    if(tidarr[i]!="") {   
    
    let update7=`update tech_know set  techname='${val}',level='${level}' where id='${tidarr[i]}'`;
     con.query(update7,(err,result)=>{
        if(err){
         console.log(err);
        }
        else{
            console.log(result);
        }
    })
}  
else if(tidarr[i]==="" ){
    let update7=`insert into tech_know (employeeid,techname,level) values('${idb}','${val}','${level}')`;
    con.query(update7,(err,result)=>{
        if(err){
         console.log(err);
        }
        else{
            console.log(result);
        }
    })


}
    }
}

            }
            res.redirect("/home/vijay-solanki/Alltasks/views/Ajax with Job Form/data.ejs");
        })
       

    
}
})


app.get("/sorting",authentication,(req,res)=>{
    res.sendFile(__dirname+"/views/sorting/sorting_exercise.html")
})
// /home/vijay-solanki/Alltasks/views/htmlCSSExercise/index.html
app.get("/htmlcss1",authentication,(req,res)=>{
    res.sendFile(__dirname+"/views/htmlCSSExercise/index.html")
})
app.get("/htmlcss2",authentication,(req,res)=>{
    res.sendFile(__dirname+"/views/htmlcssexercise2/index.html")
})

app.get("/htmlcss3",authentication,(req,res)=>{
    res.sendFile(__dirname+"/views/htmlexercise3/index.html")
})


//dynamic query table


app.get("/dynamicquery",authentication,(req,res)=>{
  let Items_per_page=10
    const page=+req.query.page ||1;
    
   let offset=(page-1)*Items_per_page;

   let final_query;
    const lastIndex=20;
     const query1=req.query.query || "select * from student"
   let limityes=false;

    let arr=query1.split(" ");
    console.log(arr.indexOf("limit"));
    let po=arr.indexOf("limit");
    let limitvalue=arr[po+1];
  
    arr[po+1]=5;
    const limitquery=arr.join(" ");
    if(arr.includes("limit")){
        offset=(page-1)*arr[po+1];
        limityes=true;
        final_query=`${limitquery}  offset ${offset}`
    }
    else{
        final_query=`${query1} limit 10 offset ${offset}`
    }
    console.log(query1);
    
    
    
    con.query(final_query,(err,result)=>{
        if(err){
            // console.log("data not found");
            // /home/vijay-solanki/Alltasks/views/dynamic query table/invalid.ejs
           res.render("/home/vijay-solanki/Alltasks/views/dynamic query table/invalid.ejs",{errorDisplay:"invalid query "});
            
           
        }
        else{
            if(result.length==0){
                res.render("/home/vijay-solanki/Alltasks/views/dynamic query table/invalid.ejs",{errorDisplay:" No data found"});
              }
              else{


                let key=Object.keys(result[0]);
              console.log(limityes);
              console.log(limitvalue);
                if(limityes===true){
                    Items_per_page=5;
                    let lastPage=Math.ceil(limitvalue/Items_per_page);
                    res.render("data.ejs",{result,key,
                        currentPage:page,
                        hasNextPage:page<lastPage,
                        hasPreviousPage:page>1, 
                        nextPage:page+1,
                        previousPage:page-1,
                        lastPage:Math.ceil(limitvalue/Items_per_page),
                        lastIndex:limitvalue/Items_per_page,
                        final_query:query1,
                        
                     })
                }
                // /home/vijay-solanki/Alltasks/views/dynamic query table/data.ejs
                else {
                res.render("/home/vijay-solanki/Alltasks/views/dynamic query table/data.ejs",{result,key,
                    currentPage:page,
                    hasNextPage:(Items_per_page*page)<200,
                    hasPreviousPage:page>1, 
                    nextPage:page+1,
                    previousPage:page-1,
                    lastPage:Math.ceil(200/Items_per_page),
                    lastIndex:lastIndex,
                    final_query:query1,
                    
                 })
                }
              }
                
        }
    
    })

})