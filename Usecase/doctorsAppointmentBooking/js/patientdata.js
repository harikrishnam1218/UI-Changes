loadSlotData();
function loadSlotData() {
    var btable = document.getElementsByTagName("table").length;
    if (btable > 0) {
        var removeTab = document.getElementById('table');
        var parentEl = removeTab.parentElement;
        parentEl.removeChild(removeTab);
    }
    var url = "http://localhost:3000/slots";

    /*AJAX call for getting slots Slots data the patient has been going to Book*/

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

            var table = document.createElement("table");
            table.id = "table";
            var tbody = document.createElement("tbody");
            var thead = document.createElement("thead");
            var headTr = document.createElement("tr");
            var headTd1 = document.createElement("td");
            var headTd1Text = document.createTextNode("Id")
            headTd1.appendChild(headTd1Text);

            var headTd2 = document.createElement("td");
            var headTd2Text = document.createTextNode("Doctor Email");
            headTd2.appendChild(headTd2Text);

            var headTd3 = document.createElement("td");
            var headTd3Text = document.createTextNode("Date");
            headTd3.appendChild(headTd3Text);

            var headTd4 = document.createElement("td");
            var headTd4Text = document.createTextNode("Time");
            headTd4.appendChild(headTd4Text);

            var headTd5 = document.createElement("td");
            var headTd5Text = document.createTextNode("Specialist");
            headTd5.appendChild(headTd5Text);

            var headTd6 = document.createElement("td");
            var headTd6Text = document.createTextNode("Status");
            headTd6.appendChild(headTd6Text);

            var headTd7=  document.createElement("td");
            var headTd7Text=  document.createTextNode("Reason for Book");
            headTd7.appendChild(headTd7Text);        

            var headTd8 = document.createElement("td");
            var headTd8Text = document.createTextNode("Action");
            headTd8.appendChild(headTd8Text);

            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);
            headTr.appendChild(headTd3);
            headTr.appendChild(headTd4);
            headTr.appendChild(headTd5);
            headTr.appendChild(headTd6);
            headTr.appendChild(headTd7);
            headTr.appendChild(headTd8);

            thead.appendChild(headTr);

            var len = data.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {

                    var tbodyTr = document.createElement("tr");

                    var td1 = document.createElement("td");
                    var td1Text = document.createTextNode(data[i].id);
                    td1.appendChild(td1Text);

                    var td2 = document.createElement("td");
                    var td2Text = document.createTextNode(data[i].docmail);
                    td2.appendChild(td2Text);

                    var td3 = document.createElement("td");
                    var td3Text = document.createTextNode(data[i].date);
                    td3.appendChild(td3Text);

                    var td4 = document.createElement("td");
                    var td4Text = document.createTextNode(data[i].time);
                    td4.appendChild(td4Text);

                    var td5 = document.createElement("td");
                    var td5Text = document.createTextNode(data[i].specialist);
                    td5.appendChild(td5Text);

                    var td6 = document.createElement("td");
                    var td6Text = document.createTextNode(data[i].available);
                    td6.appendChild(td6Text);


                    var td7 = document.createElement("td");
                    var inputText = document.createElement("input");
                    inputText.setAttribute("type","text");

                    if (data[i].available != null && data[i].available === false) {
                        inputText.setAttribute("disabled", true)
                    }

                    td7.appendChild(inputText);

                    var td8 = document.createElement("td");
                    var    slotButton = document.createElement('button');

                    if (data[i].available != null && data[i].available === false) {
                        slotButton.setAttribute("disabled", true)
                    }
                    slotButton.addEventListener('click', function () {
                        var data1 = this.parentElement.parentElement.cells;

                        var emailId = sessionStorage.getItem("userId");
                        if (emailId === null) {
                            alert("Please Login again");
                            return false;
                        }
                        var slotId = data1[0].innerHTML;
                        var docmail = data1[1].innerHTML;
                        var date = data1[2].innerHTML;
                        var time = data1[3].innerHTML;
                        var spec = data1[4].innerHTML;
                        var reason=data1[6].childNodes[0].value;

                        if(reason===null ||reason==="" ||!reason.length>0){
                            alert("Please Provide Reason to Book The Slot");
                            return false;
                        }
                        var ob1 = {
                            "slotId": slotId, "docmail": docmail,
                            "date": date, "time": time, "specialist": spec, "userId": emailId,"reason":reason
                        };
                        console.log("reason :"+reason);

                    /* AJAX Call For Book Appointment for Doctor  */

                        var bookingUrl = "http://localhost:3000/appointment";
                        var httpReq;
                        if (window.XMLHttpRequest) {
                            httpReq = new XMLHttpRequest();
                        } else {
                            httpReq = ActiveXObject("");
                        }
                        httpReq.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 201) {
                                console.log(this.response);

                                console.log("slotId " + slotId);

                                var emailId = sessionStorage.getItem("userId");
                                if (emailId === null) {
                                    alert("Please Login again !!");
                                    return false;
                                }

                            /* AJAX Call For updating status after confirming Booking   */

                                var url = "http://localhost:3000/slots/" + slotId;
                                var ob2 = { "available": false, "docmail": docmail, "date": date, "time": time, "specialist": spec };
                                var httpReq;
                                if (window.XMLHttpRequest) {
                                    httpReq = new XMLHttpRequest();
                                } else {
                                    httpReq = ActiveXObject("");
                                }
                                httpReq.onreadystatechange = function () {
                                    if (this.readyState === 4 && this.status === 200) {
                                        console.log("slot  " + slotId + " status has been modified");
                                        loadSlotData();
                                    }
                                }
                                httpReq.open("put", url, true);
                                httpReq.setRequestHeader("Content-type", "application/json");
                                httpReq.send(JSON.stringify(ob2));


                                alert("slot has been booked ");
                            }
                        }
                        httpReq.open("post", bookingUrl, true);
                        httpReq.setRequestHeader("Content-type", "application/json");
                        httpReq.send(JSON.stringify(ob1));

                    });
                    var bookslot = document.createTextNode('Book Slot');
                    slotButton.appendChild(bookslot);

                    td8.appendChild(slotButton);

                    tbodyTr.appendChild(td1);
                    tbodyTr.appendChild(td2);
                    tbodyTr.appendChild(td3);
                    tbodyTr.appendChild(td4);
                    tbodyTr.appendChild(td5);
                    tbodyTr.appendChild(td6);
                    tbodyTr.appendChild(td7);
                    tbodyTr.appendChild(td8);


                    tbody.appendChild(tbodyTr);
                }
                table.appendChild(thead);
            } else {
                var data = document.createElement("h3");
                var noDataText = document.createTextNode("Slots not avaialble");
                data.appendChild(noDataText);
                tbody.appendChild(data);
            }
            table.appendChild(tbody);

            var body = document.getElementsByTagName("body")[0];
            body.appendChild(table);

        }
    }
    httpReq.open("get", url, true);
    httpReq.send();
}
