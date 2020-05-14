function signup() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("emailId").value;
    var password = document.getElementById("pwd").value;
    var mobile = document.getElementById("mobile").value;
    var address = document.getElementById("textarea").value;
    var emailPattern = "[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
    var passwordpattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$&]).{8,12}$";
    
    if(!password.length>0){
        alert("please Enter Email ID");
        return false;
    }else if(!password.match(passwordpattern)){
        alert("Please Enter Valid Password");
        return false;
    }
    if (name === null || !name.length > 0) {
        alert("Please Enter name");
        return false;
    }
    if (!email.length > 0) {
        alert("Please Enter Email Id");
        return false;
    } else if (!email.match(emailPattern)) {
        alert("Please Enter valid Email");
        return false;
    }
    if (mobile === null || mobile === "") {
        alert("Please Enter Mobile");
        return false;
    } else if (mobile.length != 10) {
        alert("Please Enter 10 digit Mobile Number");
        return false;
    }
    if (address === null) {
        alert("Please Enter Address");
        return false;
    } else if (address === "" || address.length <= 0) {
        alert("Please Enter Address");
        return false;
    }
    var obj1 = { "name": name, "mobile": mobile, "email": email, "password": password, "address": address };
    console.log(obj1);
    userData(email);
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("");
    }
    httpReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            alert("Record Inserted !!");
            console.log(this.response);
            window.location.assign("loginpage.html");

        }
    }
    httpReq.open("post", "http://localhost:3000/users", true);
    httpReq.setRequestHeader("Content-type", "application/json");
    httpReq.send(JSON.stringify(obj1));
}

function userData(email) {
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
        alert("Registered email already available.Please try with different email ID");
            }
        }
    }
    httpReq.open("get",userDataUrl,true);
    httpReq.send();
}