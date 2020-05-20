//fetchproducts();
/**
 * The fetchproducts will get the lasi of products available
 * 
 */
 fetchproducts=()=> {

    const url = "http://localhost:3000/products";
    let itemProductsRequest;
    if (window.XMLHttpRequest) {
        itemProductsRequest = new XMLHttpRequest();
    } else {
        itemProductsRequest = ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
        itemProductsRequest.onreadystatechange = function () {

            if (this.readyState === 4) {
                if (this.status === 200) {
                    document.getElementById("headerProductId").innerHTML = "PRODUCTS LIST";

                    let btable = document.getElementsByTagName("table").length;
                    if (btable > 0) {
                        let removeTab = document.getElementById('table');
                        let parentEl = removeTab.parentElement;
                        parentEl.removeChild(removeTab);
                    }

                    let data = JSON.parse(this.response);
                    console.log(data);
                    resolve(data);
                    let table = document.createElement("table");
                    table.id = "table";
                    let tbody = document.createElement("tbody");
                    let thead = document.createElement("thead");
                    let headTr = document.createElement("tr");
                    let headTd1 = document.createElement("td");
                    const headTd1Text = document.createTextNode("Product Name")
                    headTd1.appendChild(headTd1Text);

                    let headTd2 = document.createElement("td");
                    const headTd2Text = document.createTextNode("Description");
                    headTd2.appendChild(headTd2Text);

                    let headTd3 = document.createElement("td");
                    const headTd3Text = document.createTextNode("Price");
                    headTd3.appendChild(headTd3Text);

                    let headTd4 = document.createElement("td");
                    const headTd4Text = document.createTextNode("Quantity");
                    headTd4.appendChild(headTd4Text);


                    let headTd5 = document.createElement("td");
                    const headTd5Text = document.createTextNode("Action");
                    headTd5.appendChild(headTd5Text);


                    let headTd6 = document.createElement("td");
                    const headTd6Text = document.createTextNode("Id");
                    headTd6.appendChild(headTd6Text);

                    let headTd7 = document.createElement("td");
                    const headTd7Text = document.createTextNode("Rating");
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
                            const { id, productName, description, rating, price } = data[i];
                            let tbodyTr = document.createElement("tr");

                            let td1 = document.createElement("td");
                            let td1Text = document.createTextNode(`${id}`);
                            td1.appendChild(td1Text);

                            let td2 = document.createElement("td");
                            let td2Text = document.createTextNode(`${productName}`);
                            td2.appendChild(td2Text);

                            let td3 = document.createElement("td");
                            let td3Text = document.createTextNode(`${description}`);
                            td3.appendChild(td3Text);

                            let td7 = document.createElement("td");
                            let td7Text = document.createTextNode(`${rating}`);
                            td7.appendChild(td7Text);

                            let td4 = document.createElement("td");
                            let td4Text = document.createTextNode(`${price}`);
                            td4.appendChild(td4Text);

                            let td5 = document.createElement("td");
                            let qtext = document.createElement("input");
                            qtext.setAttribute("type", "number");
                            qtext.setAttribute("id", "quantity" + `${id}`);
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
                                const quantity = document.getElementById("quantity" + `${id1}`).value;

                                // if(!parseInt(quantityvalue)>0){
                                //     alert("Please provide Correct Quantity Value");
                                //     return false;
                                // }
                                const id = data1[0].innerHTML;
                                const productName = data1[1].innerHTML;
                                const description = data1[2].innerHTML;
                                const rating = data1[3].innerHTML;
                                const price = data1[4].innerHTML;

                                let ob1 = {
                                    id, productName, price, description, rating, quantity
                                };
                                //  var existing = sessionStorage.getItem("cartData");
                                //  //JSON.parse(existing);
                                //  existing = existing ? existing.split(',') : [];
                                //  existing =existing.pushArrayItem(ob1);
                                // window.sessionStorage.setItem("cartData", JSON.stringify(ob1));
                                const email = sessionStorage.getItem("userId");
                                if (email === null) {
                                    alert("Please Login again");
                                    return false;
                                }
                                let cartdata = {
                                    productId: id, productName, email, price, description, rating, quantity
                                };
                                const cartUrl = "http://localhost:3000/cartItems";
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
                                                //alert("added to cart Successfully!!");
                                                resolve(this.response);
                                                console.log(this.response);
                                            } else {
                                                reject({ reason: `Failed to execute list of cart items  Api Due to server issue, Status Code ${this.status}` });
                                            }
                                        }

                                    }
                                    httpReq.open("post", cartUrl, true);
                                    httpReq.setRequestHeader("Content-type", "application/json");
                                    httpReq.send(JSON.stringify(cartdata));
                                });
                            });
                            const addcartText = document.createTextNode('addcart');
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
                        const noDataText = document.createTextNode("PRODUCT DETAILS NOT FOUND");
                        data.appendChild(noDataText);
                        tbody.appendChild(data);
                    }
                    table.appendChild(tbody);

                    let body = document.getElementsByTagName("body")[0];
                    body.appendChild(table);
                } else {
                    reject({ reason: `Failed to execute fetchproducts  Api Due to server issue, Status Code  ${this.status}` });
                }
            }

        }
        itemProductsRequest.open("get", url, true);
        itemProductsRequest.send();
    });
}
