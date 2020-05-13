function previousorder() {
document.getElementById("headerProductId").innerHTML="ORDER LIST";
    var btable = document.getElementsByTagName("table").length;
    if (btable > 0) {
        var removeTab = document.getElementById('table');
        var parentEl = removeTab.parentElement;
        parentEl.removeChild(removeTab);
    }

    var email = sessionStorage.getItem("userId");
    if(email===null){
        alert("Please Login again !!");
        return false;
    }
    var url = "http://localhost:3000/orders?email=" + email;

    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("");
    }
    httpReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            var table = document.createElement("table");
            table.id = "table";
            var tbody = document.createElement("tbody");
            var thead = document.createElement("thead");

            var headTr = document.createElement("tr");

            var headTd1 = document.createElement("td");
            var headTd1Text = document.createTextNode("ID")
            headTd1.appendChild(headTd1Text);

            var headTd2 = document.createElement("td");
            var headTd2Text = document.createTextNode("PRODUCT ID");
            headTd2.appendChild(headTd2Text);

            var headTd3 = document.createElement("td");
            var headTd3Text = document.createTextNode("EMAIL");
            headTd3.appendChild(headTd3Text);

            var headTd4 = document.createElement("td");
            var headTd4Text = document.createTextNode("TOTAL PRICE");
            headTd4.appendChild(headTd4Text);


            var headTd5 = document.createElement("td");
            var headTd5Text = document.createTextNode("QUANTITY");
            headTd5.appendChild(headTd5Text);


            var headTd6 = document.createElement("td");
            var headTd6Text = document.createTextNode("ORDER DATE");
            headTd6.appendChild(headTd6Text);

            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);
            headTr.appendChild(headTd3);
            headTr.appendChild(headTd4);
            headTr.appendChild(headTd5);
            headTr.appendChild(headTd6);

            thead.appendChild(headTr);

            var data = JSON.parse(this.response);
            // console.log(data);
            var len = data.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var tbodyTr = document.createElement("tr");

                    var td1 = document.createElement("td");
                    var td1Text = document.createTextNode(data[i].id);
                    td1.appendChild(td1Text);

                    var td2 = document.createElement("td");
                    var td2Text = document.createTextNode(data[i].productId);
                    td2.appendChild(td2Text);

                    var td3 = document.createElement("td");
                    var td3Text = document.createTextNode(data[i].email);
                    td3.appendChild(td3Text);

                    var td4 = document.createElement("td");
                    var td4Text = document.createTextNode(data[i].totalPrice);
                    td4.appendChild(td4Text);

                    var td5 = document.createElement("td");
                    var td5Text = document.createTextNode(data[i].quantity);
                    td5.appendChild(td5Text);

                    var td6 = document.createElement("td");
                    var td6Text = document.createTextNode(data[i].orderDate);
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
                var data = document.createElement("h3");
                var noDataText = document.createTextNode("ORDER DATA NOT FOUND");
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