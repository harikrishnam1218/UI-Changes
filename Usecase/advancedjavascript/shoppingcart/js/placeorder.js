/**
 * the placeorder function is used to check th cart items are available if available then order has been placed.
 *  */
placeOrder = () => {
    const email = sessionStorage.getItem("userId");
    console.log(email);
    if (email === null) {
        alert("Please Login again");
        return false;
    }

    const url = `http://localhost:3000/cartItems?email=${email}`;
    let placeOrderRequest;
    if (window.XMLHttpRequest) {
        placeOrderRequest = new XMLHttpRequest();
    } else {
        placeOrderRequest = ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
        placeOrderRequest.onreadystatechange = function () {
            
            if (this.readyState === 4) {
                if (this.status !== 200) {
                    reject({ reason: `Failed to execute placeorder api Due to server issue, Status Code ${this.status}` });
                } else {
                    let data = JSON.parse(this.response);
                    resolve(data);
                    console.log(data);
                    const len = data.length;
                    if (len > 0) {
                        let count = 1;
                       // let flag = false;
                        if (typeof data !== "undefined") {
                            for (let i = 0; i < len; i++) {
                                const {id,quantity,price,productId}=data[i];
                                let totalPrice = `${quantity}` * `${price}`;
                                const orderDate = dateCreate();
                                let dataobj = { productId, email, totalPrice, quantity, orderDate }
                                console.log(dataobj);
                                let orderRequest;
                                const orderurl = "http://localhost:3000/orders";
                                if (window.XMLHttpRequest) {
                                    orderRequest = new XMLHttpRequest();
                                } else {
                                    orderRequest = ActiveXObject("Microsoft.XMLHTTP");
                                }
                                //  return new Promise(function (resolve, reject) {
                                orderRequest.onreadystatechange = function () {
                                    if (this.readyState === 4) {
                                        if (this.status === 201) {
                                            //resolve(this.response);                             
                                            count = count + 1;
                                            if (len === count) {
                                                alert("Order Placed Successfully !!");
                                                deleteCartItemsByUser().then((response) => {
                                                    console.log(response);
                                                }).catch((error) => {
                                                    console.log(error);
                                                });
                                            }
                                            // sessionStorage.removeItem("cartData");
                                        }
                                        // else{
                                        //     reject({ reason: "Failed to execute fetch order Data Due to server issue, Status Code " + this.status });
                                        // }
                                    }
                                }
                                orderRequest.open("post", orderurl, true);
                                orderRequest.setRequestHeader("Content-type", "application/json");
                                orderRequest.send(JSON.stringify(dataobj));
                                //  });
                            }
                        }

                    } else {
                        alert("Please add Cart Items");
                    }
                }
            }
       
        }
        placeOrderRequest.open("get", url, true);
        placeOrderRequest.send();
    });
}
/**
 * The dateCreate function is used to return  the date in the format of mm-dd-yyyy
 */
dateCreate = () => {
    //return new Promise(function (resolve, reject) {
        let today = new Date();
        let dd = `${today.getDate()}`;
        let mm = `${today.getMonth() + 1}`;
        let yyyy = `${today.getFullYear()}`;
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
     const  today1 = `${mm}` + '-' + `${dd}` + '-' + `${yyyy}`;
    //     if (today != null) {
    //         resolve(today);
    //         return today;
    //     } else {
    //         reject({ reason: "Failed to execute dateCreate and return today date" });
    //     }
      
    // });
    return today1;
}
