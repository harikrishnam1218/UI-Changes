/**
 * The Function will check the authentication and based on role the page will redirect to Patient view or Doctor View
 */
loginData = () => {
    const emailId = document.getElementById("emailId").value;
    const password = document.getElementById("pwd").value;
    const url = `http://localhost:3000/users?email=${emailId}&password=${password}`;
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("");
    }
    return new Promise(function (resolve, reject) {
        httpReq.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let data = JSON.parse(this.response);
                    resolve(this.response);
                    console.log(data);
                    const len = data.length;
                    if (len > 0) {
                        let userRole = `${data[0].role}`;
                        window.sessionStorage.setItem("userId", emailId);
                        // alert("Login Successful !!");
                        if (userRole === "patient") {
                            window.location.assign("patientpage.html");
                        } else {
                            window.location.assign("doctorpage.html");
                        }

                    } else {
                        alert("login Failed, Please try again");
                    }
                } else {
                    reject({ reason: `Failed to execute loginData  Api Due to server issue, Status Code ${this.status}` });
                }
            }
        }
        httpReq.open("get", url, true);
        httpReq.send();
    });
}
/**
 * Redirecting to Login page
*/
redirectSignUpPage = () => {
    window.location.href = "signuppage.html";
}
/**
 * Redirecting to Home page
*/
redirectHomepage = () => {
    window.location.href = "homepage.html";
}

/**
 * Redirecting to Home page
*/
redirectAboutPage = () => {
    window.location.href = "aboutpage.html";
}
