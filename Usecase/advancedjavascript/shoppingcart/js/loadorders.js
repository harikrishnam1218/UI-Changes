fetchproducts();
/**
 * The fetchproducts will get the lasi of products available
 * 
 */
function fetchproducts() {
  
    const url = "http://localhost:3000/products";
    let itemProductsRequest;
    if (window.XMLHttpRequest) {
        itemProductsRequest = new XMLHttpRequest();
    } else {
        itemProductsRequest = ActiveXObject("");
    }
    itemProductsRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("headerProductId").innerHTML="PRODUCTS LIST";
    
            let btable=document.getElementsByTagName("table").length;
            if(btable>0){
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
            let headTd1Text = document.createTextNode("PRODUCT NAME")
            headTd1.appendChild(headTd1Text);

            let headTd2 = document.createElement("td");
            let headTd2Text = document.createTextNode("DESCRIPTION");
            headTd2.appendChild(headTd2Text);

            let headTd3 = document.createElement("td");
            let headTd3Text = document.createTextNode("PRICE");
            headTd3.appendChild(headTd3Text);

            let headTd4 = document.createElement("td");
            let headTd4Text = document.createTextNode("QUANTITY");
            headTd4.appendChild(headTd4Text);


            let headTd5 = document.createElement("td");
            let headTd5Text = document.createTextNode("ACTION");
            headTd5.appendChild(headTd5Text);


            let headTd6 = document.createElement("td");
            let headTd6Text = document.createTextNode("ID");
            headTd6.appendChild(headTd6Text);

            let headTd7 = document.createElement("td");
            let headTd7Text = document.createTextNode("Rating");
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
            const len = data.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {

                    let tbodyTr = document.createElement("tr");

                    let td1 = document.createElement("td");
                    let td1Text = document.createTextNode(data[i].id);
                    td1.appendChild(td1Text);

                    let td2 = document.createElement("td");
                    let td2Text = document.createTextNode(data[i].productname);
                    td2.appendChild(td2Text);

                    let td3 = document.createElement("td");
                    let td3Text = document.createTextNode(data[i].description);
                    td3.appendChild(td3Text);

                    let td7 = document.createElement("td");
                    let td7Text = document.createTextNode(data[i].rating);
                    td7.appendChild(td7Text);

                    let td4 = document.createElement("td");
                    let td4Text = document.createTextNode(data[i].price);
                    td4.appendChild(td4Text);

                    let td5 = document.createElement("td");
                    let qtext = document.createElement("input");
                    qtext.setAttribute("type", "number");
                    qtext.setAttribute("id", "quantity" + data[i].id);
                    qtext.setAttribute("size", 1);
                    qtext.setAttribute("step", "1");
                    qtext.setAttribute("value", "1");                  
                    td5.appendChild(qtext);


                    let td6 = document.createElement("td");
                    let addcartButton = document.createElement('button');

                    addcartButton.addEventListener('click', function () {                        
                        let data1 = this.parentElement.parentElement.cells;
                        //console.log(data1);
                        let id1 = data1[0].innerHTML;
                        let quantity = document.getElementById("quantity" + id1).value;

                        // if(!parseInt(quantityvalue)>0){
                        //     alert("Please provide Correct Quantity Value");
                        //     return false;
                        // }

                        let ob1 = {
                            id: data1[0].innerHTML, productName: data1[1].innerHTML,
                            price: data1[4].innerHTML, description: data1[2].innerHTML, rating: data1[3].innerHTML, quantity
                        };
                        //  var existing = sessionStorage.getItem("cartData");
                        //  //JSON.parse(existing);
                        //  existing = existing ? existing.split(',') : [];
                        //  existing =existing.pushArrayItem(ob1);
                   // window.sessionStorage.setItem("cartData", JSON.stringify(ob1));
                    let emailId = sessionStorage.getItem("userId");
                    if(emailId===null){
                        alert("Please Login again");
                        return false;
                    }
                    let cartdata = {
                        "productId": data1[0].innerHTML, "productName": data1[1].innerHTML,"email":emailId,
                        "price": data1[4].innerHTML, "description": data1[2].innerHTML, "rating": data1[3].innerHTML,quantity
                    };
                   const cartUrl= "http://localhost:3000/cartItems";
                    let httpReq;
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
                    let addcartText = document.createTextNode('addcart');
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
                let data = document.createElement("h3");
                let noDataText = document.createTextNode("PRODUCT DETAILS NOT FOUND");
                data.appendChild(noDataText);
                tbody.appendChild(data);
            }
            table.appendChild(tbody);

            let body = document.getElementsByTagName("body")[0];
            body.appendChild(table);

        }
    }
    itemProductsRequest.open("get", url, true);
    itemProductsRequest.send();
}
