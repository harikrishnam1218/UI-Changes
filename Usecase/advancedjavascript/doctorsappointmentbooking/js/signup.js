/**
 * The signup function will Register The User Data
 * @param {*} email 
 */
 signup=(email) =>{
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const role = document.getElementById("roles").value;

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

    const minm = 100000; 
    const maxm = 999999; 
    const password= Math.floor(Math.random() * (maxm - minm + 1)) + minm; 
    const obj1 = { name,  mobile,  email,  password, role };
    console.log(obj1);
   
    let httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
    httpReq.onreadystatechange = function () {
        if (this.readyState === 4 ) {
            if(this.status === 201){
            console.log(this.response);            
            window.location.assign("logindoctorappointment.html");
        }else{
            reject({ reason: `Failed to execute signup  Api Due to server issue, Status Code ${this.status}` });
        }
        }
    }
    httpReq.open("post", "http://localhost:3000/users", true);
    httpReq.setRequestHeader("Content-type", "application/json");
    httpReq.send(JSON.stringify(obj1));
});
}
/**
 * The userData Function Will check the Entered User is already avaialable.if the User is not avaialable register the User Information
 * else throw error the User already avaialble.
 */
 userData=()=> {
    const email = document.getElementById("emailId").value;
    const emailPattern = "[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
    
    if (!email.length > 0) {
        let email = document.getElementById("emailId").autofocus
        document.getElementById('erremail').innerHTML="<span class='color-class'><b> Please Enter Email Id</b></span>";
        return false;
    } else if (!email.match(emailPattern)) {
        let email = document.getElementById("emailId").autofocus
        document.getElementById('erremail').innerHTML="<span class='color-class'> <b> Please Enter valid Email</b></span>";
        return false;
    }
    const userDataUrl=`http://localhost:3000/users?email=${email}`;
    let httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
    httpReq.onreadystatechange = function () {
        if (this.readyState === 4 ) {
            if(this.status === 200){
            let data = JSON.parse(this.response);
            console.log(data);
            const len = data.length;
            if (len > 0) {
                alert("Email already available.Please try with different Email");
                return false;
            }else{
                signup(email).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }else{
            reject({ reason: `Failed to execute userData  Api Due to server issue, Status Code ${this.status}` });
        }
    }
}
    httpReq.open("get",userDataUrl,true);
    httpReq.send();
});
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
    const emailPattern = "[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
    
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
 redirectLoginpage=()=>{
    window.location.href = "logindoctorappointment.html";
}
/**
 * Redirecting to Home page
*/
 redirectHomepage=()=>{
    window.location.href = "homepage.html";
}

/**
 * Redirecting to Home page
*/
 redirectAboutPage=()=>{
    window.location.href = "aboutpage.html";
}
