var scrollable_btn=document.getElementsByClassName("sixth-row")

function addfunc(){
    scrollable_btn[0].scrollBy({
        left:200,
        behavior:"smooth",
    })
}

function reducefunc(){
    scrollable_btn[0].scrollBy({
        left:-200,
        behavior:"smooth",
    })
}


var wordpress=document.getElementById("wordpresscontent");
var magento=document.getElementById("magentocontent");
var laravel=document.getElementById("laravelcontent");
var php=document.getElementById("phpcontent");
wordpress.style.display="block";
magento.style.display="none";
laravel.style.display="none";
php.style.display="none";


function fun(a){
 wordpress.style.display="none";
magento.style.display="none";
laravel.style.display="none";
php.style.display="none";
if(a==1){
    wordpress.style.display="block";
}
else if(a==2){
    magento.style.display="block";  
}
else if(a==3){
    laravel.style.display="block";
}
else if(a==4){
    php.style.display="block";
}

}