fetchproducts();
function fetchproducts() {
    document.getElementById("headerProductId").innerHTML="PRODUCTS LIST";
    
    var btable=document.getElementsByTagName("table").length;
    if(btable>0){
       var removeTab = document.getElementById('table');
       var parentEl = removeTab.parentElement;
           parentEl.removeChild(removeTab);
   }
  
    var url = "http://localhost:3000/products";
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
            var headTd1Text = document.createTextNode("PRODUCT NAME")
            headTd1.appendChild(headTd1Text);

            var headTd2 = document.createElement("td");
            var headTd2Text = document.createTextNode("DESCRIPTION");
            headTd2.appendChild(headTd2Text);

            var headTd3 = document.createElement("td");
            var headTd3Text = document.createTextNode("PRICE");
            headTd3.appendChild(headTd3Text);

            var headTd4 = document.createElement("td");
            var headTd4Text = document.createTextNode("QUANTITY");
            headTd4.appendChild(headTd4Text);


            var headTd5 = document.createElement("td");
            var headTd5Text = document.createTextNode("ACTION");
            headTd5.appendChild(headTd5Text);


            var headTd6 = document.createElement("td");
            var headTd6Text = document.createTextNode("ID");
            headTd6.appendChild(headTd6Text);

            var headTd7 = document.createElement("td");
            var headTd7Text = document.createTextNode("Rating");
            headTd7.appendChild(headTd7Text);

            headTr.appendChild(headTd6);
            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);
            headTr.appendChild(headTd7);
            headTr.appendChild(headTd3);
            headTr.appendChild(headTd4);
            headTr.appendChild(headTd5);

            thead.appendChild(headTr);

            //var tbody = document.createElement("tbody");
            var len = data.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {

                    var tbodyTr = document.createElement("tr");

                    var td1 = document.createElement("td");
                    var td1Text = document.createTextNode(data[i].id);
                    td1.appendChild(td1Text);

                    var td2 = document.createElement("td");
                    var td2Text = document.createTextNode(data[i].productname);
                    td2.appendChild(td2Text);

                    var td3 = document.createElement("td");
                    var td3Text = document.createTextNode(data[i].description);
                    td3.appendChild(td3Text);

                    var td7 = document.createElement("td");
                    var td7Text = document.createTextNode(data[i].rating);
                    td7.appendChild(td7Text);

                    var td4 = document.createElement("td");
                    var td4Text = document.createTextNode(data[i].price);
                    td4.appendChild(td4Text);

                    var td5 = document.createElement("td");
                    var qtext = document.createElement("input");
                    qtext.setAttribute("type", "number");
                    qtext.setAttribute("id", "quantity" + data[i].id);
                    qtext.setAttribute("size", 1);
                    qtext.setAttribute("step", "1");
                    qtext.setAttribute("value", "1");                  
                    td5.appendChild(qtext);


                    var td6 = document.createElement("td");
                    var addcartButton = document.createElement('button');

                    addcartButton.addEventListener('click', function () {                        
                        var data1 = this.parentElement.parentElement.cells;
                        //console.log(data1);
                        var id1 = data1[0].innerHTML;
                        var quantityvalue = document.getElementById("quantity" + id1).value;

                        // if(!parseInt(quantityvalue)>0){
                        //     alert("Please provide Correct Quantity Value");
                        //     return false;
                        // }

                        var ob1 = {
                            "id": data1[0].innerHTML, "productName": data1[1].innerHTML,
                            "price": data1[4].innerHTML, "description": data1[2].innerHTML, "rating": data1[3].innerHTML, "quantity": quantityvalue
                        };
                        //  var existing = sessionStorage.getItem("cartData");
                        //  //JSON.parse(existing);
                        //  existing = existing ? existing.split(',') : [];
                        //  existing =existing.pushArrayItem(ob1);
                   // window.sessionStorage.setItem("cartData", JSON.stringify(ob1));
                    var emailId = sessionStorage.getItem("userId");
                    if(emailId===null){
                        alert("Please Login again");
                        return false;
                    }
                    var cartdata = {
                        "productId": data1[0].innerHTML, "productName": data1[1].innerHTML,"email":emailId,
                        "price": data1[4].innerHTML, "description": data1[2].innerHTML, "rating": data1[3].innerHTML, "quantity": quantityvalue
                    };
                   var cartUrl= "http://localhost:3000/cartItems";
                    var httpReq;
                    if(window.XMLHttpRequest){
                        httpReq=new XMLHttpRequest();
                    }else{
                        httpReq=ActiveXObject("");
                    }
                    httpReq.onreadystatechange=function(){
                        if(this.readyState===4 && this.status===201){
                        //alert("added to cart Successfully!!");
                         console.log(this.response);                
                        }
                    }
                    httpReq.open("post",cartUrl,true);
                    httpReq.setRequestHeader("Content-type","application/json");
                    httpReq.send(JSON.stringify(cartdata));

                    });
                    var addcartText = document.createTextNode('addcart');
                    addcartButton.appendChild(addcartText);
                    td6.appendChild(addcartButton);

                    tbodyTr.appendChild(td1);
                    tbodyTr.appendChild(td2);
                    tbodyTr.appendChild(td3);
                    tbodyTr.appendChild(td7);
                    tbodyTr.appendChild(td4);
                    tbodyTr.appendChild(td5);
                    tbodyTr.appendChild(td6);


                    tbody.appendChild(tbodyTr);
                }
                table.appendChild(thead);
            } else {
                var data = document.createElement("h3");
                var noDataText = document.createTextNode("PRODUCT DETAILS NOT FOUND");
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
