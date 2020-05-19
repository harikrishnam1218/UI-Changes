
deleteCartItems=(id)=>{
    var emailId = sessionStorage.getItem("userId");
    if(emailId===null){
        alert("Please Login again !!");
        return false;
    }
    var url=`http://localhost:3000/cartItems/${id}`;
    var httpReq;
                if(window.XMLHttpRequest){
                    httpReq=new XMLHttpRequest();
                }else{
                    httpReq=ActiveXObject("");
                }
                httpReq.onreadystatechange=function(){
                    if(this.readyState===4 && this.status===200){
                        console.log("cart Id "+id+" has been deleted");                  
                    }
                }
                httpReq.open("delete",url,true);
                httpReq.send();

}

deleteCartItemsByUser=()=>{
    var emailId = sessionStorage.getItem("userId");
    if(emailId===null){
        alert("Please Login again !!");
        return false;
    }
    var url=`http://localhost:3000/cartItems?email=${emailId}`;
    var httpReq;
                if(window.XMLHttpRequest){
                    httpReq=new XMLHttpRequest();
                }else{
                    httpReq=ActiveXObject("");
                }
                httpReq.onreadystatechange=function(){
                    if(this.readyState===4 && this.status===200){
                        var data=JSON.parse(this.response);
                    console.log(data);
                    var len=data.length;
                    if(len>0){
                        for (var i = 0; i < len; i++) {
                           
                           deleteCartItems(data[i].id)
                        }
                    }
                    }
                }
                httpReq.open("get",url,true);
                httpReq.send();

}