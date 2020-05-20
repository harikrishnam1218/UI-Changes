//loadAppointmentData();
/**
 * @description The LoadAppointmentData function will  Load Appointment Details in Doctor View Page.
 * @author Hari
 * 
*/

loadAppointmentData = () => {

    const url = "http://localhost:3000/appointment";
    let httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
        httpReq.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    //If the table already available Remove table
                    let btable = document.getElementsByTagName("table").length;
                    if (btable > 0) {
                        let removeTab = document.getElementById('table');
                        let parentEl = removeTab.parentElement;
                        parentEl.removeChild(removeTab);
                    }

                    resolve(this.response);
                    let data = JSON.parse(this.response);
                    console.log(data);
                    //Creating Table and Header
                    let table = document.createElement("table");
                    table.id = "table";
                    let tbody = document.createElement("tbody");
                    let thead = document.createElement("thead");
                    let headTr = document.createElement("tr");
                    let headTd1 = document.createElement("td");
                    let headTd1Text = document.createTextNode("Id")
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
                    const headTd6Text = document.createTextNode("userId");
                    headTd6.appendChild(headTd6Text);

                    headTr.appendChild(headTd1);
                    headTr.appendChild(headTd2);
                    headTr.appendChild(headTd3);
                    headTr.appendChild(headTd4);
                    headTr.appendChild(headTd5);
                    headTr.appendChild(headTd6);

                    thead.appendChild(headTr);

                    const len = data.length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            const { id, docmail, date, time, specialist, userId } = data[i];
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

                            let td6 = document.createElement("td");
                            let td6Text = document.createTextNode(`${userId}`);
                            td6.appendChild(td6Text);

                            tbodyTr.appendChild(td1);
                            tbodyTr.appendChild(td2);
                            tbodyTr.appendChild(td3);
                            tbodyTr.appendChild(td4);
                            tbodyTr.appendChild(td5);
                            tbodyTr.appendChild(td6);
                            tbody.appendChild(tbodyTr);
                        }
                        table.appendChild(thead);
                    } else {
                        let data = document.createElement("h3");
                        const noDataText = document.createTextNode("No Patients avaialble");
                        data.appendChild(noDataText);
                        tbody.appendChild(data);
                    }
                    table.appendChild(tbody);

                    let body = document.getElementsByTagName("body")[0];
                    body.appendChild(table);

                } else {
                    reject({ reason: `Failed to execute loadAppointmentData  Api Due to server issue, Status Code ${this.status}` });
                }
            }
        }
        httpReq.open("get", url, true);
        httpReq.send();
    });
}
/**
 * @description Redirecting to Slot page
 * @author Hari
*/
redirectAddSlot = () => {
    window.location.href = "addslot.html";
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
