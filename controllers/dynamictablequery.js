const con=require("../connection/connection")
const path=require("path")

const dynamicquery=(req,res)=>{

    let Items_per_page=10
      const page=+req.query.page ||1;
      
     let offset=(page-1)*Items_per_page;
  
     let final_query;
 
       let query1=req.query.query || "select * from student"
     let limityes=false;
      query1=query1.trim();
     
      console.log(query1);
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
      
      try {
        con.query(query1,(err,result1)=>{
          if(err){
            res.render("dynamic query table/invalid.ejs",{errorDisplay:"invalid query "});
          }
          else {
            let total_row=result1.length;
             con.query(final_query,(err,result)=>{
              if(err){
           res.render("dynamic query table/invalid.ejs",{errorDisplay:"invalid query "});
                
    }
              else{
                  if(result.length==0){
                      res.render("dynamic query table/invalid.ejs",{errorDisplay:" No data found"});
                    
                    }
                 
                    else{
                   let key=Object.keys(result[0]);
                    console.log(limityes);
                    console.log(limitvalue);
                      if(limityes===true){
                          Items_per_page=5;
                          let lastPage=Math.ceil(limitvalue/Items_per_page);
                          res.render("dynamic query table/data.ejs",{result,key,
                              currentPage:page,
                              hasNextPage:page<lastPage,
                              hasPreviousPage:page>1, 
                              nextPage:page+1,
                              previousPage:page-1,
                              // lastPage:Math.ceil(limitvalue/Items_per_page),
                              lastIndex:limitvalue/Items_per_page,
                              final_query:query1,
                              noquery:1
                           })
                      }
                  
                      else {
                   
                        let lastIndex=Math.ceil(total_row/Items_per_page)
                      res.render("dynamic query table/data.ejs",{result,key,
                          currentPage:page,
                          hasNextPage:(Items_per_page*page)<total_row,
                          hasPreviousPage:page>1, 
                          nextPage:page+1,
                          previousPage:page-1,
                          // lastPage:Math.ceil(total_row/Items_per_page),
                          lastIndex:lastIndex,
                          final_query:query1,
                          noquery:1
                       })
                      }
                    }
                      
              }
          
          })
          }
        })
       
      } catch (error) {
        console.log(error);
      }
      
     
  
  }

  module.exports={dynamicquery}