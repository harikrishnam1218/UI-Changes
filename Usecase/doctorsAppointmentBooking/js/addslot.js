/**
 * Doctor adding available slots.
*/
function addSlot(dateId, timeId, specialist, emailId) {

    var obj = {
        "docmail": emailId,
        "date": dateId,
        "time": timeId,
        "specialist": specialist,
        "available": true
    }
    var sloturl = "http://localhost:3000/slots";
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("");
    }
    httpReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            console.log(this.response);
            alert("slot has been booked");
        }
    }
    httpReq.open("post", sloturl, true);
    httpReq.setRequestHeader("Content-type", "application/json");
    httpReq.send(JSON.stringify(obj));

}
/**
 * Checking already slot is available if available return the page else add the slot data.
*/

function checkSlotAvailable() {
    var date = document.getElementById("dateId").value;
    var time = document.getElementById("timeId").value;
    var specialist = document.getElementById("specialist").value;

    // fetch the User Data from from session Storage
    var emailId = sessionStorage.getItem("userId");
    if (emailId === null) {
        alert("Please Login again");
        return false;
    }

    var ToDate = new Date();
    if (date === null || !date.length > 0) {
        document.getElementById('errdate').innerHTML="<span class='color-class'><b>Please Provide Availabl Date</b></span>";
        document.getElementById('dateId').autofocus;
        return false;
    }
    else if (new Date(date).getTime() <= ToDate.getTime()) {
        document.getElementById('errdate').innerHTML="<span class='color-class'><b>The Date must be Bigger or Equal to today date</b></span>";
        return false;
    }

    if (time === null || !time.length > 0) {
        document.getElementById('errtime').innerHTML="<span class='color-class'><b>Please Provide Available Time</b></span>";
        return false;
    }
    if (specialist === null || !specialist.length > 0) {
     document.getElementById('errspecialist').innerHTML="<span class='color-class'><b>Please Provide Available specialist</b></span>";
        return false;
    }

    if (emailId === null) {
        alert("Please Login again");
        return false;
    }

    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest
    }
    else {
        httpReq = new ActiveXObject();
    }

    httpReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.response);
            var len = data.length;
            if (len > 0) {
                alert("Slot already available for the given Date,Time and Specialization.");
                return false;
            }
            else
                addSlot(date, time, specialist, emailId);
        }

    }

    httpReq.open('GET', "http://localhost:3000/slots?date=" + date + "&time=" + time + "&specialist=" + specialist + "&docmail=" + emailId, true);
    httpReq.send();

}

/**
 * Validation input field for add slot.
*/

function validateSlotData(dateId, timeId, specialist, emailId) {
    // var [h,m] = timeId.split(":");
    //  var h=(h%12+12*(h%12==0))+":"+m; h >= 12 ? 'PM' : 'AM';
    var ToDate = new Date();
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