const express=require("express");
const path=require("path")
const app=express();
const port=5000;
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
   res.render("index.ejs")
})

let f=require("./practice.js")
const mysql=require("mysql")

app.set('view engine', 'ejs');
app.get("/",(req,res)=>{
    res.send("home page");
})

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Vijay@123",
    database:"commonDatabase",

})
con.connect(function(err){
    if(err)
    throw err;
   console.log("connected");
})


app.get("/DelimeterSearch",(req,res)=>{

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

app.get("/cukooCube",(req,res)=>{
    // console.log(path.join(__dirname,"/views/cukoo cube/kuku_cube_exercise_js_.html"));

    res.sendFile(path.join(__dirname,"/views/cukoo cube/kuku_cube_exercise_js_.html"));
})

app.get("/dynamicTable",(req,res)=>{
   
    res.sendFile(path.join(__dirname,"/views/dynamic_table/DynamicTable.html"))
})
app.get("/TicTacToe",(req,res)=>{
    // res.send("TicTacToe");
    res.sendFile(path.join(__dirname,"/views/Tic Tac Toe/tictactoe.html"))
   
})

app.get("/htmlCss",(req,res)=>{
    res.send("htmlCss");
})


app.get("/javascriptEvents",(req,res)=>{

    res.sendFile(path.join(__dirname,"/views/javascript Events/javascriptEventPractice.html"))
})

app.get("/formsPractice",(req,res)=>{

    res.sendFile(path.join(__dirname,"/views/forms Practice/job_app_form_4.html"))
})





//exam grid app.js


app.get("/students",(req,res)=>{
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
app.get("/results",(req,res)=>{
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

app.get("/results/:id",(req,res)=>{
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


app.post('/postdata',(req,res)=>{
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
app.get("/jsonplaceholder",(req,res)=>{
    res.sendFile(__dirname+"/views/json Placeholder Api/index2.html")
})


app.get("/details",(req,res)=>{
    res.sendFile(__dirname+"/views/json Placeholder Api/personal.html")
})

