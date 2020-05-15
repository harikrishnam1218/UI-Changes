/**
 * The signup function will Register The User Data
 * @param {*} email 
 */
function signup(email) {
    var name = document.getElementById("name").value;
    var mobile = document.getElementById("mobile").value;
    var role = document.getElementById("roles").value;

    if (name === null || !name.length > 0) {
        document.getElementById("name").autofocus;
        document.getElementById('errname').innerHTML="<span class='color-class'><b> Please Enter Name</b></span>";
        return false;
    }

    if (mobile === null || mobile === "") {
        document.getElementById("mobile").autofocus;
       document.getElementById('errmobile').innerHTML="<span class='color-class'><b> Please Enter Mobile</b></span>";
        return false;
    } else if (mobile.length != 10) {
        document.getElementById("mobile").autofocus;
        document.getElementById('errmobile').innerHTML="<span class='color-class'><b> Please Enter 10 digit Mobile Number</b></span>";
        return false;
    }
    if (role === null || !role.length > 0) {
        alert("Please Select ROle");
        return false;
    }

    var minm = 100000; 
    var maxm = 999999; 
    var password= Math.floor(Math.random() * (maxm - minm + 1)) + minm; 
    var obj1 = { "name": name, "mobile": mobile, "email": email, "password": password, "role":role };
    console.log(obj1);
   
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("");
    }
    httpReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            console.log(this.response);
           // alert( name + "Registered Successfully !!");            
            window.location.assign("logindoctorappointment.html");

        }
    }
    httpReq.open("post", "http://localhost:3000/users", true);
    httpReq.setRequestHeader("Content-type", "application/json");
    httpReq.send(JSON.stringify(obj1));
}
/**
 * The userData Function Will check the Entered User is already avaialable.if the User is not avaialable register the User Information
 * else throw error the User already avaialble.
 */
function userData() {
    var email = document.getElementById("emailId").value;

    var emailPattern = "[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
    
    if (!email.length > 0) {
        var email = document.getElementById("emailId").autofocus
        document.getElementById('erremail').innerHTML="<span class='color-class'><b> Please Enter Email Id</b></span>";
        return false;
    } else if (!email.match(emailPattern)) {
        var email = document.getElementById("emailId").autofocus
        document.getElementById('erremail').innerHTML="<span class='color-class'> <b> Please Enter valid Email</b></span>";
        return false;
    }
    var userDataUrl="http://localhost:3000/users?email="+email;
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("");
    }
    httpReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.response);
            console.log(data);
            var len = data.length;
            if (len > 0) {
                alert("Email already available.Please try with different Email");
                return false;
            }else{
                signup(email);
            }
        }
    }
    httpReq.open("get",userDataUrl,true);
    httpReq.send();
}
/**
 * The validation function will validate the input field if any validation will fail it will return to the registration page 
 * else the flow will continue.
 * @param {*} name 
 * @param {*} email 
 * @param {*} mobile 
 * @param {*} role 
 */
function validation(name,email,mobile,role)
{
    var emailPattern = "[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
    
    if (!email.length > 0) {
        alert("Please Enter Email Id");
        return false;
    } else if (!email.match(emailPattern)) {
        alert("Please Enter valid Email");
        return false;
    }

    if (name === null || !name.length > 0) {
        alert("Please Enter name");
        return false;
    }

    if (mobile === null || mobile === "") {
        alert("Please Enter Mobile");
        return false;
    } else if (mobile.length != 10) {
        alert("Please Enter 10 digit Mobile Number");
        return false;
    }
    if (role === null || !role.length > 0) {
        alert("Please Select ROle");
        return false;
    }
    
}
/**
 * Redirecting to Login page
*/
function redirectLoginpage(){
    window.location.href = "logindoctorappointment.html";
}
/**
 * Redirecting to Home page
*/
function redirectHomepage(){
    window.location.href = "homepage.html";
}

/**
 * Redirecting to Home page
*/
function redirectAboutPage(){
    window.location.href = "aboutpage.html";
}
