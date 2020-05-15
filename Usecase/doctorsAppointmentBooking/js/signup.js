function signup(email) {
    var name = document.getElementById("name").value;
    //var email = document.getElementById("emailId").value;
    var mobile = document.getElementById("mobile").value;
   
    var role = document.getElementById("roles").value;
    //validation(name,email,mobile,role);   
    
    

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
            alert( name + "Registered Successfully !!");            
            window.location.assign("logindoctorappointment.html");

        }
    }
    httpReq.open("post", "http://localhost:3000/users", true);
    httpReq.setRequestHeader("Content-type", "application/json");
    httpReq.send(JSON.stringify(obj1));
}

function userData() {
    var email = document.getElementById("emailId").value;

    var emailPattern = "[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
    
    if (!email.length > 0) {
        alert("Please Enter Email Id");
        return false;
    } else if (!email.match(emailPattern)) {
        alert("Please Enter valid Email");
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
                alert("USer Data  already available.Please try with different email");
                return false;
            }else{
                signup(email);
            }
        }
    }
    httpReq.open("get",userDataUrl,true);
    httpReq.send();
}
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