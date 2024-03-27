// let string1=":gota_vijay_tirth$tirthgma$vijay@gmail.com:gandhinagarxyz_rushikesh:dehgam"
function stringReturn(string1){

let arr=['_','^','$',':']

let firstname=[];
let middlename=[];
let email=[];
let city=[];
let str="";
let ch;
let res=false;
let special;
for(let i=0;i<string1.length;i++){
   ch=string1.charAt(i);
   
   if(arr.includes(ch)===true){
   
    res=true;
    if(special==="_"){
        firstname.push(str);
    }
    if(special==="^"){
      middlename.push(str);
    }
    if(special==="$"){
        email.push(str);
    }
    if(special===":"){
        city.push(str)
    }
    special=ch;
    str="";
   }
   else{
    res=false;
     
   }
if(res===false){
    str+=ch;
    if(i==string1.length-1){
      if(special==='_'){
        firstname.push(str);
      }
      if(special===":"){
        city.push(str);
      }
      if(special==="$"){
        email.push(str)
      }
      if(special==="^"){
        middlename.push(str);
      }
    }
   }

}

let fnameq="";
let mnameq="";
let emailq="";
let cityq=""

for(let i=0;i<firstname.length;i++){
    if(i==0 && firstname.length>1){
        fnameq+=`(firstname like '%${firstname[i]}%' or `
    }
    else if(i==0 && firstname.length==1){
        fnameq+=`(firstname like '%${firstname[i]}%')`
    }
    else if(i===firstname.length-1){
        fnameq+=`firstname like '%${firstname[i]}%')`
    }
    else {
        fnameq+=`firstname like '%${firstname[i]}%' or `
    }
}
for(let i=0;i<middlename.length;i++){
    if(i==0 && middlename.length>1){
        mnameq+=`(middlename like '%${middlename[i]}%' or `
    }
    else if(i==0 && middlename.length==1){
        mnameq+=`(middlename like '%${middlename[i]}%')`
    }
    else if(i===middlename.length-1){
        mnameq+=`middlename like '%${middlename[i]}%')`
    }
    else {
        mnameq+=`middlename like '%${middlename[i]}%' or `
    }
}
for(let i=0;i<email.length;i++){
    if(i==0 && email.length>1){
        emailq+=`(emailId like '%${email[i]}%' or `
    }
    else if(i==0 && email.length==1){
        emailq+=`(emailId  like '%${email[i]}%')`
    }
    else if(i===email.length-1){
        emailq+=`emailId  like '%${email[i]}%')`
    }
    else {
        emailq+=`emailId  like '%${email[i]}%' or `
    }
}

for(let i=0;i<city.length;i++){
    if(i==0 && city.length>1){
        cityq+=`(city like '%${city[i]}%' or `
    }
    else if(i==0 &&city.length==1){
        cityq+=`(city  like '%${city[i]}%')`
    }
    else if(i===city.length-1){
        cityq+=`city  like '%${city[i]}%')`
    }
    else {
        cityq+=`city  like '%${city[i]}%' or `
    }
}



let option1="";
let option2="";
let option3="";
if(middlename.length>0){
    option1="and";
}
if(email.length>0){
    option2="and";
}
if(city.length>0){
    option3="and";
}
// let final_query=`select * from student_master where ${fnameq} and ${mnameq} and  ${emailq} and  ${cityq}`
let final_query=`select * from student_master where ${fnameq} ${option1} ${mnameq} ${option2}  ${emailq} ${option3}  ${cityq}`
console.log(final_query);
return final_query;
}

module.exports={stringReturn};