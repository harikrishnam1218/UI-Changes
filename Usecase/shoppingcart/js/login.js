function loginData(){
    var emailId=document.getElementById("emailId").value;
    var password=document.getElementById("pwd").value;
    console.log("Email Id  "+emailId+"\n Password "+password);
    var url="http://localhost:3000/users?email="+emailId+"&password="+password;
    var httpReq;
        if(window.XMLHttpRequest){
            httpReq=new XMLHttpRequest();
        }else{
            httpReq=ActiveXObject("");
        }
        httpReq.onreadystatechange=function(){
            if(this.readyState===4 && this.status===200){
                //console.log()
                var data=JSON.parse(this.response);
                console.log(data);
                var len=data.length;
                if(len>0){
                    window.sessionStorage.setItem("userId",emailId);
                alert("Login Successful !!");
                // window.location.assign("productlist.html");
                     window.location.assign("product1.html");
                }else{
                    alert("login Failed");
                }
            }
        }
        httpReq.open("get",url,true);
        httpReq.send();
}
