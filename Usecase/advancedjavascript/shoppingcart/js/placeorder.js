/**
 * the placeorder function is used to check th cart items are available if available then order has been placed.
 *  */
 placeorder=()=> {
    let email = sessionStorage.getItem("userId");
    console.log(email);
    if (email === null) {
        alert("Please Login again");
        return false;
    }

    const url = `http://localhost:3000/cartItems?email=${emailId}`;
    let placeOrderRequest;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        placeOrderRequest = ActiveXObject("");
    }
    placeOrderRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.response);
            console.log(data);
            const len = data.length;
            if (len > 0) {
                let count = 1;
                let flag = false;
                if (typeof data !== "undefined") {
                    for (let i = 0; i < len; i++) {
                        let totalprice = data[i].quantity * data[i].price;
                        let orderDate = dateCreate();
                        let dataobj = { productId: data[i].id, email,totalprice, quantity: data[i].quantity,orderDate }
                        console.log(dataobj);
                        let orderRequest;
                        const orderurl="http://localhost:3000/orders";
                        if (window.XMLHttpRequest) {
                            orderRequest = new XMLHttpRequest();
                        } else {
                            orderRequest = ActiveXObject("");
                        }
                        orderRequest.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 201) {                              
                                count = count + 1;
                                if (len === count) {
                                    alert("Order Placed Successfully !!");
                                    deleteCartItemsByUser();
                                }
                                // sessionStorage.removeItem("cartData");
                            }
                        }
                        orderRequest.open("post", orderurl, true);
                        orderRequest.setRequestHeader("Content-type", "application/json");
                        orderRequest.send(JSON.stringify(dataobj));
                    }
                }
            } else {
                alert("Please add Cart Items");
            }

        }
    }
    placeOrderRequest.open("get", url, true);
    placeOrderRequest.send();

}
/**
 * The dateCreate function is used to return  the date in the format of mm-dd-yyyy
 */
dateCreate=()=> {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + '-' + dd + '-' + yyyy;
    return today;
}
