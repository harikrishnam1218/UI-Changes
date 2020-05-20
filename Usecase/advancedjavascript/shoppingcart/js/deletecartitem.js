
/**
 * The deleteCartItem function is used to delete the cart item based on the id value.
 * 
 */
deleteCartItems = (id) => {
    const emailId = sessionStorage.getItem("userId");
    if (emailId === null) {
        alert("Please Login again !!");
        return false;
    }
    const url = `http://localhost:3000/cartItems/${id}`;
    let httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
        httpReq.onreadystatechange = function () {
         
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(this.response);
                    console.log(`cart Id ${id} has been deleted`);
                } else {
                    reject({ reason: `Failed to execute delete cart item  Api Due to server issue, Status Code ${this.status}` });
                }
            }
        
        }
        httpReq.open("delete", url, true);
        httpReq.send();
    });  
}
/**
 * The deleteCartItemByuser function is used to delete the Cratitem list based on the user login.
 * 
 */
deleteCartItemsByUser = () => {
    const emailId = sessionStorage.getItem("userId");
    if (emailId === null) {
        alert("Please Login again !!");
        return false;
    }
    const url = `http://localhost:3000/cartItems?email=${emailId}`;
    let httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else {
        httpReq = ActiveXObject("Microsoft.XMLHTTP");
    }
    return new Promise(function (resolve, reject) {
        httpReq.onreadystatechange = function () {
            
            if (this.readyState === 4) {
                if (this.status != 200) {
                    reject({ reason: `Failed to execute deleteCartItemsByUser  Api Due to server issue, Status Code ${this.status}` });
                }
                else {
                    let data = JSON.parse(this.response);
                    resolve(data);
                    console.log(data);
                    const len = data.length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            const {id}=data[i];
                            deleteCartItems(`${id}`).then((response) => {
                            }).catch((error) => {
                                console.log(error);
                            });
                        }
                    }
                }
            }
        
        }
        httpReq.open("get", url, true);
        httpReq.send();
    }); 
}