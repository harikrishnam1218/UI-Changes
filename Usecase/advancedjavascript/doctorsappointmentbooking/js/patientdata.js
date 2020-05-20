//loadSlotData();
/**
 * The Function will load the Slot relared Data Provided By Doctor Availability
 */
loadSlotData = () => {
    const url = "http://localhost:3000/slots";
    /**
     * AJAX call for getting slots Slots data the patient has been going to Book
     */
    let httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("Microsoft.XMLHTTP");
    }
    httpReq.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let btable = document.getElementsByTagName("table").length;
                if (btable > 0) {
                    let removeTab = document.getElementById('table');
                    let parentEl = removeTab.parentElement;
                    parentEl.removeChild(removeTab);
                }
                let data = JSON.parse(this.response);
                console.log(data);

                let table = document.createElement("table");
                table.id = "table";
                let tbody = document.createElement("tbody");
                let thead = document.createElement("thead");
                let headTr = document.createElement("tr");
                let headTd1 = document.createElement("td");
                const headTd1Text = document.createTextNode("Id")
                headTd1.appendChild(headTd1Text);

                let headTd2 = document.createElement("td");
                const headTd2Text = document.createTextNode("Doctor Email");
                headTd2.appendChild(headTd2Text);

                let headTd3 = document.createElement("td");
                const headTd3Text = document.createTextNode("Date");
                headTd3.appendChild(headTd3Text);

                let headTd4 = document.createElement("td");
                const headTd4Text = document.createTextNode("Time (24 Hours Format)");
                headTd4.appendChild(headTd4Text);

                let headTd5 = document.createElement("td");
                const headTd5Text = document.createTextNode("Specialist");
                headTd5.appendChild(headTd5Text);

                let headTd6 = document.createElement("td");
                const headTd6Text = document.createTextNode("Status");
                headTd6.appendChild(headTd6Text);

                let headTd7 = document.createElement("td");
                const headTd7Text = document.createTextNode("Disease");
                headTd7.appendChild(headTd7Text);

                let headTd8 = document.createElement("td");
                const headTd8Text = document.createTextNode("Action");
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

                const len = data.length;
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        const { id, docmail, date, time, specialist, available } = data[i];
                        let tbodyTr = document.createElement("tr");

                        let td1 = document.createElement("td");
                        let td1Text = document.createTextNode(`${id}`);
                        td1.appendChild(td1Text);

                        let td2 = document.createElement("td");
                        let td2Text = document.createTextNode(`${docmail}`);
                        td2.appendChild(td2Text);

                        let td3 = document.createElement("td");
                        let td3Text = document.createTextNode(`${date}`);
                        td3.appendChild(td3Text);

                        let td4 = document.createElement("td");
                        let td4Text = document.createTextNode(`${time}`);
                        td4.appendChild(td4Text);

                        let td5 = document.createElement("td");
                        let td5Text = document.createTextNode(`${specialist}`);
                        td5.appendChild(td5Text);
                        let availableStatus = "Slot Booked";
                        if (available !== undefined && available === true) {
                            availableStatus = " Slot available";
                        }

                        let td6 = document.createElement("td");
                        let td6Text = document.createTextNode(`${availableStatus}`);
                        td6.appendChild(td6Text);


                        let td7 = document.createElement("td");
                        let inputText = document.createElement("input");
                        inputText.setAttribute("type", "text");

                        if (available != null && available === false) {
                            inputText.setAttribute("disabled", true)
                        }

                        td7.appendChild(inputText);

                        let td8 = document.createElement("td");
                        let slotButton = document.createElement('button');

                        if (available != null && available === false) {
                            slotButton.setAttribute("disabled", true)
                        }
                        //Patient Can Book the Slot provided by the Doctor availability
                        slotButton.addEventListener('click', function () {
                            let data1 = this.parentElement.parentElement.cells;

                            const userId = sessionStorage.getItem("userId");
                            if (userId === null) {
                                alert("Please Login again");
                                return false;
                            }
                            let slotId = data1[0].innerHTML;
                            let docmail = data1[1].innerHTML;
                            let date = data1[2].innerHTML;
                            let time = data1[3].innerHTML;
                            let specialist = data1[4].innerHTML;
                            let reason = data1[6].childNodes[0].value;

                            if (reason === null || reason === "" || !reason.length > 0) {
                                alert("Please Provide Reason to Book The Slot");
                                return false;
                            }
                            let ob1 = {
                                slotId, docmail, date, time, specialist, userId, reason
                            };

                            /* AJAX Call For Patient Book Appointment for Doctor Availability  */

                            const bookingUrl = "http://localhost:3000/appointment";
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
                                            console.log(this.response);

                                            console.log(`slotId ${slotId}`);

                                            const emailId = sessionStorage.getItem("userId");
                                            if (emailId === null) {
                                                alert("Please Login again !!");
                                                return false;
                                            }

                                            /* AJAX Call For updating status after confirming Booking Slot  */

                                            const url = `http://localhost:3000/slots/${slotId}`;
                                            let ob2 = { available: false, docmail, date, time, specialist };
                                            let slotReq;
                                            if (window.XMLHttpRequest) {
                                                slotReq = new XMLHttpRequest();
                                            } else {
                                                slotReq = ActiveXObject("Microsoft.XMLHTTP");
                                            }
                                            return new Promise(function (resolve, reject) {
                                                slotReq.onreadystatechange = function () {
                                                    if (this.readyState === 4) {
                                                        if (this.status === 200) {
                                                            resolve(this.response);
                                                            //console.log("slot  " + slotId + " status has been modified");
                                                            loadSlotData();
                                                        } else {
                                                            reject({ reason: `Failed to execute update available status  Api Due to server issue, Status Code ${this.status}` });
                                                        }
                                                    }
                                                }
                                                slotReq.open("put", url, true);
                                                slotReq.setRequestHeader("Content-type", "application/json");
                                                slotReq.send(JSON.stringify(ob2));
                                            });
                                            //alert("slot has been booked ");
                                        } else {
                                            reject({ reason: `Failed to execute bookappointment  Api Due to server issue, Status Code ${this.status}` });
                                        }
                                    }
                                }
                                httpReq.open("post", bookingUrl, true);
                                httpReq.setRequestHeader("Content-type", "application/json");
                                httpReq.send(JSON.stringify(ob1));
                            });
                        });
                        const bookslot = document.createTextNode('Book Slot');
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
                    let data = document.createElement("h3");
                    const noDataText = document.createTextNode("Slots not avaialble");
                    data.appendChild(noDataText);
                    tbody.appendChild(data);
                }
                table.appendChild(tbody);

                let body = document.getElementsByTagName("body")[0];
                body.appendChild(table);

            } else {
                reject({ reason: `Failed to execute deleteData  Api Due to server issue, Status Code ${this.status}` });
            }
        }
    }
    httpReq.open("get", url, true);
    httpReq.send();
}

/**
 * The logout function will logout and redirect to Homepage
 */
logout = ()=>
{
    sessionStorage.removeItem('userId');
    window.location.assign('homepage.html');
}