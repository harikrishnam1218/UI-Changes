/**
 * @description Doctor adding available slots.
 * @author Hari
 * @param
*/
addSlot = (date, time, specialist, docmail) => {

    const obj = { docmail, date, time, specialist, available: true }
    const sloturl = "http://localhost:3000/slots";
    let httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
        httpReq.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 201) {
                    resolve(this.resolve);
                    console.log(this.response);
                    alert("slot has been booked");
                } else {
                    reject({ reason: `Failed to execute addSlot  Api Due to server issue, Status Code ${this.status}` });
                }
            }
        }
        httpReq.open("post", sloturl, true);
        httpReq.setRequestHeader("Content-type", "application/json");
        httpReq.send(JSON.stringify(obj));
    });
}
/**
 * @description Checking already slot is available if available return the page else add the slot data.
 * @author Hari
*/

checkSlotAvailable = () => {
    const date = document.getElementById("dateId").value;
    const time = document.getElementById("timeId").value;
    const specialist = document.getElementById("specialist").value;

    // fetch the User Data from from session Storage
    const emailId = sessionStorage.getItem("userId");
    if (emailId === null) {
        alert("Please Login again");
        //return false;
        window.location.assign('homepage.html');
    }

    let ToDate = new Date();
    if (date === null || !date.length > 0) {
        document.getElementById('errdate').innerHTML = "<span class='color-class'><b>Please Provide Availabl Date</b></span>";
        document.getElementById('dateId').autofocus;
        return false;
    }
    else if (new Date(date).getTime() <= ToDate.getTime()) {
        document.getElementById('errdate').innerHTML = "<span class='color-class'><b>The Date must be Bigger or Equal to today date</b></span>";
        return false;
    }

    if (time === null || !time.length > 0) {
        document.getElementById('errtime').innerHTML = "<span class='color-class'><b>Please Provide Available Time</b></span>";
        return false;
    }
    if (specialist === null || !specialist.length > 0) {
        document.getElementById('errspecialist').innerHTML = "<span class='color-class'><b>Please Provide Available specialist</b></span>";
        return false;
    }

    if (emailId === null) {
        alert("Please Login again");
        return false;
    }

    let httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest
    }
    else {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
        httpReq.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let data = JSON.parse(this.response);
                    const len = data.length;
                    if (len > 0) {
                        alert("Slot already available for the given Date,Time and Specialization.");
                        return false;
                    }
                    else
                        addSlot(date, time, specialist, emailId).then((response) => {
                            console.log(response);
                        }).catch((error) => {
                            console.log(error);
                        });
                } else {
                    reject({ reason: `Failed to execute checkSlotAvailable  Api Due to server issue, Status Code ${this.status}`});
                }
            }
        }
        httpReq.open('GET', `http://localhost:3000/slots?date=${date}&time=${time}&specialist=${specialist}&docmail=${emailId}`, true);
        httpReq.send();
    });
}

/**
 * @description Validation input field for add slot.
 * @author Hari
*/

validateSlotData = (dateId, timeId, specialist, emailId) => {
    // var [h,m] = timeId.split(":");
    //  var h=(h%12+12*(h%12==0))+":"+m; h >= 12 ? 'PM' : 'AM';
    const ToDate = new Date();
    if (dateId === null || !dateId.length > 0) {
        alert("Please Provide Availabl Date");
        return false;
    }
    else if (new Date(dateId).getTime() <= ToDate.getTime()) {
        alert("The Date must be Bigger or Equal to today date");
        return false;
    }

    if (timeId === null || !timeId.length > 0) {
        alert("Please Provide Availabl Time");
        return false;
    }
    if (specialist === null || !specialist.length > 0) {
        alert("Please Provide Availabl specialist ");
        return false;
    }

    if (emailId === null) {
        alert("Please Login again");
        return false;
    }

}
/**
 * @description The logout function will logout and redirect to Homepage
 * @author Hari
 */

logout = ()=>
{
    sessionStorage.removeItem('userId');
    window.location.assign('homepage.html');
}