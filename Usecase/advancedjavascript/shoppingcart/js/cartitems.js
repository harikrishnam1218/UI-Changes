/**
 * The fetchCartData function  is used tofetch the cart data dynamically
 *  */
fetchCartData = () => {

    const emailId = sessionStorage.getItem("userId");
    if (emailId === null) {
        alert("Please Login again !!");
        return false;
    }

    let httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
    
        httpReq.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) {
                    reject({ reason: `Failed to execute fetchCartData  Api Due to server issue, Status Code ${this.status}` });
                } else {

                    document.getElementById("headerProductId").innerHTML = "CART ITEM LIST";
                    const btable = document.getElementsByTagName("table").length;
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
                    const headTd1Text = document.createTextNode("id")
                    headTd1.appendChild(headTd1Text);

                    let headTd2 = document.createElement("td");
                    const headTd2Text = document.createTextNode("productId");
                    headTd2.appendChild(headTd2Text);

                    let headTd3 = document.createElement("td");
                    const headTd3Text = document.createTextNode("productName");
                    headTd3.appendChild(headTd3Text);

                    let headTd4 = document.createElement("td");
                    const headTd4Text = document.createTextNode("description");
                    headTd4.appendChild(headTd4Text);


                    let headTd5 = document.createElement("td");
                    const headTd5Text = document.createTextNode("price");
                    headTd5.appendChild(headTd5Text);


                    let headTd6 = document.createElement("td");
                    const headTd6Text = document.createTextNode("rating");
                    headTd6.appendChild(headTd6Text);


                    let headTd7 = document.createElement("td");
                    const headTd7Text = document.createTextNode("quantity");
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
                    let data = JSON.parse(this.response);
                    console.log(data);
                    const len = data.length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            const {id,productId,productName,description,price,rating,quantity}=data[i];
                            let tbodyTr = document.createElement("tr");

                            let td1 = document.createElement("td");
                            let td1Text = document.createTextNode(`${id}`);
                            td1.appendChild(td1Text);

                            let td2 = document.createElement("td");
                            let td2Text = document.createTextNode(`${productId}`);
                            td2.appendChild(td2Text);

                            let td3 = document.createElement("td");
                            let td3Text = document.createTextNode(`${productName}`);
                            td3.appendChild(td3Text);

                            let td4 = document.createElement("td");
                            let td4Text = document.createTextNode(`${description}`);
                            td4.appendChild(td4Text);

                            let td5 = document.createElement("td");
                            let td5Text = document.createTextNode(`${price}`);
                            td5.appendChild(td5Text);

                            let td6 = document.createElement("td");
                            let td6Text = document.createTextNode(`${rating}`);
                            td6.appendChild(td6Text);

                            let td7 = document.createElement("td");
                            let td7Text = document.createTextNode(`${quantity}`);
                            td7.appendChild(td7Text);

                            let deleteButton = document.createElement('button');
                            let deleteText = document.createTextNode('DELETE');
                            deleteButton.appendChild(deleteText);
                            deleteButton.setAttribute('onclick', 'deleteData(' + `${id}` + ')');

                            let td8 = document.createElement("td");
                            td8.appendChild(deleteButton);

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
                        alert("Please add items to cart");
                        let data = document.createElement("h3");
                        const noDataText = document.createTextNode("CART ITEMS NOT FOUND");
                        data.appendChild(noDataText);
                        tbody.appendChild(data);
                    }
                    table.appendChild(tbody);

                    let body = document.getElementsByTagName("body")[0];
                    body.appendChild(table);

                }

            }
            // var url="http://localhost:3000/cartItems?email="+emailId;
       
        }
        httpReq.open("get", `http://localhost:3000/cartItems?email=${emailId}`, true);
        httpReq.send();
    });
}

/**
 * The  deleteData function is used to perform Delete the cart item by Id 
 * @param { id }  
 */

deleteData = (id) => {
    const url = `http://localhost:3000/cartItems/${id}`;
    let deleteRequest;
    if (window.XMLHttpRequest) {
        deleteRequest = new XMLHttpRequest();
    } else {
        deleteRequest = ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
    deleteRequest.onreadystatechange = function () {
        
        if (this.readyState === 4) {
            if(this.status !== 200){
                reject({ reason: `Failed to execute deleteData  Api Due to server issue, Status Code ${this.status}` });
            }else{
                resolve(this.response)
            alert("Carted Item Deleted!!");
            fetchCartData().then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    }
    deleteRequest.open("delete", url, true);
    deleteRequest.send();
});
}

/**
 * The cartItemsData function is used to fetch the cart items based on the User Id .
 * 
 */

cartItemsData = () => {
    const emailId = sessionStorage.getItem("userId");
    if (emailId === null) {
        alert("Please Login again !!");
        return false;
    }
    const url = `http://localhost:3000/cartItems?email=${emailId}`;
    let cartItemRequest;
    if (window.XMLHttpRequest) {
        cartItemRequest = new XMLHttpRequest();
    } else {
        cartItemRequest = ActiveXObject("Microsoft.XMLHTTP");
    }
    
        cartItemRequest.onreadystatechange = function () {
            return new Promise(function (resolve, reject) {
            if (this.readyState === 4) {
                if (this.status !== 200) {
                    reject({ reason: `Failed to execute cartItemsData  Api Due to server issue, Status Code ${this.status}` });
                } else {
                    let data = JSON.parse(this.response);
                    resolve(data);
                    console.log(data);
                    const len = data.length;
                    if (len > 0) {
                        return data;
                    } else {
                        alert("Please add Cart Items");
                    }
                }
            }
        });
        }
        cartItemRequest.open("get", url, true);
        cartItemRequest.send();
    
}
