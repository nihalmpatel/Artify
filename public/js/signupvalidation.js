function signupvalidation(){
var username=document.getElementById("username").value;
var email=document.getElementById("email").value;
var password=document.getElementById("pass").value;
var cpassword=document.getElementById("cpass").value;
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
    alert("Please provide a valid email address");
    email.focus;
    return false;
    }
    
    if(password!=cpassword){
        alert("password does not match!");
    }
    
    else{
        document.write("Welcome "+username+"."+" Site is under construction. Please visit soon. Sorry, for the inconvenience!");
    }
    
}