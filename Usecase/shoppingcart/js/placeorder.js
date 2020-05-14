function placeorder() {
    var email = sessionStorage.getItem("userId");
    console.log(email);
    if (email === null) {
        alert("Please Login again");
        return false;
    }

    var emailId = sessionStorage.getItem("userId");
    if (emailId === null) {
        alert("Please Login again !!");
        return false;
    }
    var url = "http://localhost:3000/cartItems?email=" + emailId;
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
            var len = data.length;
            if (len > 0) {
                var count = 1;
                var flag = false;
                if (typeof data !== "undefined") {
                    for (var i = 0; i < len; i++) {
                        var totalprice = data[i].quantity * data[i].price;
                        var orderDate = dateCreate();
                        var dataobj = { "productId": data[i].id, "email": email, "totalPrice": totalprice, "quantity": data[i].quantity, "orderDate": orderDate }
                        console.log(dataobj);
                        var httpReq;
                        if (window.XMLHttpRequest) {
                            httpReq = new XMLHttpRequest();
                        } else {
                            httpReq = ActiveXObject("");
                        }
                        httpReq.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 201) {                              
                                count = count + 1;
                                if (len === count) {
                                    alert("Order Placed Successfully !!");
                                    deleteCartItemsByUser();
                                }
                                // sessionStorage.removeItem("cartData");
                            }
                        }
                        httpReq.open("post", "http://localhost:3000/orders", true);
                        httpReq.setRequestHeader("Content-type", "application/json");
                        httpReq.send(JSON.stringify(dataobj));
                    }
                }







            } else {
                alert("Please add Cart Items");
            }

        }
    }
    httpReq.open("get", url, true);
    httpReq.send();




}

function dateCreate() {
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
