const con=require("../connection/connection")
const path=require("path")
const attendancecontroller= (req,res)=>{
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
   
                res.render("exam Grid/data.ejs",{
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
}

module.exports=attendancecontroller;
