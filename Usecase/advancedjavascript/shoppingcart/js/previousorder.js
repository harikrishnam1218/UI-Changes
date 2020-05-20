/**
 * The function previousorder is used to fetch previos orders.
 * 
 */
previousOrder=()=> {

    const email = sessionStorage.getItem("userId");
    if (email === null) {
        alert("Please Login again !!");
        return false;
    }
    const url = `http://localhost:3000/orders?email=${email}` ;

    let previousOrderRequest;
    if (window.XMLHttpRequest) {
        previousOrderRequest = new XMLHttpRequest();
    } else {
        previousOrderRequest = ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
    previousOrderRequest.onreadystatechange = function () {
        
        if (this.readyState === 4) {
            if(this.status != 200){
                reject({ reason: `Failed to execute previousorder  Api Due to server issue, Status Code ${this.status}` });
            }else{
            document.getElementById("headerProductId").innerHTML = " PREVIOUS ORDER LIST";
            let btable = document.getElementsByTagName("table").length;
            if (btable > 0) {
                let removeTab = document.getElementById('table');
                let parentEl = removeTab.parentElement;
                parentEl.removeChild(removeTab);
            }
            resolve(this.response);
            let table = document.createElement("table");
            table.id = "table";
            let tbody = document.createElement("tbody");
            let thead = document.createElement("thead");

            let headTr = document.createElement("tr");

            let headTd1 = document.createElement("td");
            const headTd1Text = document.createTextNode("ID")
            headTd1.appendChild(headTd1Text);

            let headTd2 = document.createElement("td");
            const headTd2Text = document.createTextNode("PRODUCT ID");
            headTd2.appendChild(headTd2Text);

            let headTd3 = document.createElement("td");
            const headTd3Text = document.createTextNode("EMAIL");
            headTd3.appendChild(headTd3Text);

            let headTd4 = document.createElement("td");
            const headTd4Text = document.createTextNode("TOTAL PRICE");
            headTd4.appendChild(headTd4Text);


            let headTd5 = document.createElement("td");
            const headTd5Text = document.createTextNode("QUANTITY");
            headTd5.appendChild(headTd5Text);


            let headTd6 = document.createElement("td");
            const headTd6Text = document.createTextNode("ORDER DATE");
            headTd6.appendChild(headTd6Text);

            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);
            headTr.appendChild(headTd3);
            headTr.appendChild(headTd4);
            headTr.appendChild(headTd5);
            headTr.appendChild(headTd6);

            thead.appendChild(headTr);

            let data = JSON.parse(this.response);
            // console.log(data);
            const len = data.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    const {id,productId,email,totalPrice,quantity,orderDate}=data[i];
                    let tbodyTr = document.createElement("tr");

                    let td1 = document.createElement("td");
                    let td1Text = document.createTextNode(`${id}`);
                    td1.appendChild(td1Text);

                    let td2 = document.createElement("td");
                    let td2Text = document.createTextNode(`${productId}`);
                    td2.appendChild(td2Text);

                    let td3 = document.createElement("td");
                    let td3Text = document.createTextNode(`${email}`);
                    td3.appendChild(td3Text);

                    let td4 = document.createElement("td");
                    let td4Text = document.createTextNode(`${totalPrice}`);
                    td4.appendChild(td4Text);

                    let td5 = document.createElement("td");
                    let td5Text = document.createTextNode(`${quantity}`);
                    td5.appendChild(td5Text);

                    let td6 = document.createElement("td");
                    let td6Text = document.createTextNode(`${orderDate}`);
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
                const noDataText = document.createTextNode("ORDER DATA NOT FOUND");
                data.appendChild(noDataText);
                tbody.appendChild(data);
            }
            table.appendChild(tbody);

            let body = document.getElementsByTagName("body")[0];
            body.appendChild(table);
        }
    }

}
    previousOrderRequest.open("get", url, true);
    previousOrderRequest.send();
});
}