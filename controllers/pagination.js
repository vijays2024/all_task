const con=require("../connection/connection")
const path=require("path")



const pagination=(req,res)=>{
    let Items_per_page=10;
    const page=+req.query.pages ||1;
    const offset=(page-1)*Items_per_page;
    const sortcolumn=req.query.sort || 'firstname';
    const sortOrder=req.query.sortOrder || 'ASC'
    
   try {
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
    
   } catch (error) {
    
   }
   

}

module.exports={pagination}