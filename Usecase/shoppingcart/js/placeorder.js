function placeorder() {
    var cartdata = window.sessionStorage.getItem("cartData");
    var email = sessionStorage.getItem("userId");
    if(cartdata===null){
        alert("Please add items to cart");
        return false;
    }

    if(email===null){
        alert("Please Login again");
        return false;
    }
    var data = JSON.parse(cartdata);
    console.log(email);
    var totalprice = data.quantity * data.price;
    var orderDate=dateCreate();
    var dataobj = { "productId": data.id, "email": email, "totalPrice": totalprice, "quantity": data.quantity, "orderDate": orderDate }
    console.log(dataobj);
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("");
    }
    httpReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            alert("Order Placed Successfully !!");
            sessionStorage.removeItem("cartData");
        }
    }
    httpReq.open("post", "http://localhost:3000/orders", true);
    httpReq.setRequestHeader("Content-type", "application/json");
    httpReq.send(JSON.stringify(dataobj));
}

function dateCreate(){
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