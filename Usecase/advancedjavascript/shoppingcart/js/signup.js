/**
 * The signup function will register the data in data base 
 */
signup = () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("emailId").value;
    let password = document.getElementById("pwd").value;
    let mobile = document.getElementById("mobile").value;
    let address = document.getElementById("textarea").value;

    let passwordpattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$&]).{8,12}$";

    if (!password.length > 0) {
        alert("please Enter Email ID");
        return false;
    } else if (!password.match(passwordpattern)) {
        alert("Please Enter Valid Password");
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
    if (address === null) {
        alert("Please Enter Address");
        return false;
    } else if (address === "" || address.length <= 0) {
        alert("Please Enter Address");
        return false;
    }
    var obj1 = { name, mobile, email, password, address };
    console.log(obj1);

    let registerReq;
    if (window.XMLHttpRequest) {
        registerReq = new XMLHttpRequest();
    } else {
        registerReq = ActiveXObject("");
    }
    return new Promise(function (resolve, reject) {
        registerReq.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 201) {
                    console.log(this.response);
                    resolve(this.response);
                    window.location.assign("loginpage.html");

                }
                else {
                    reject({ reason: "Failed the Api to execute Due to server issue" });
                }
            }
        }


        registerReq.open("post", "http://localhost:3000/users", true);
        registerReq.setRequestHeader("Content-type", "application/json");
        registerReq.send(JSON.stringify(obj1));
    });
}
/**
 * the userData function is used to check the registered Email id is avaialble or not if it is not available call sign up function.
 *  else throw error message.  
 */
userData = () => {
    let email = document.getElementById("emailId").value;
    let emailPattern = "[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
    if (!email.length > 0) {
        alert("Please Enter Email Id");
        return false;
    } else if (!email.match(emailPattern)) {
        alert("Please Enter valid Email");
        return false;
    }
    const userDataUrl = `http://localhost:3000/users?email=${email}`;
    let httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else {
        httpRequest = ActiveXObject("");
    }
    return new Promise((resolve, reject) => {
        httpRequest.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let data = JSON.parse(this.response);
                    console.log(data);
                    const len = data.length;
                    if (!len > 0) {
                        signup().then((response)=>{
                        console.log(response);
                        }).catch((error)=>{
                            console.log(error);
                        });
                    } else {
                        alert("Registered Email already available.Please try with different Email ID");
                        return false;
                    }
                } else {
                    reject({ reason: "Failed the Api to execute Due to server issue" });
                }
            }
        }
        httpRequest.open("get", userDataUrl, true);
        httpRequest.send();
    });
}