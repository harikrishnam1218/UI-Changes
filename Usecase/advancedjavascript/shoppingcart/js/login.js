/**
 * The loginData function will check the Authentication .if it success return to Product List
 */
 loginData=()=>{
    const emailId=document.getElementById("emailId").value;
    const password=document.getElementById("pwd").value;
    const url=`http://localhost:3000/users?email=${emailId}&password=${password}`;
    let loginReq;
        if(window.XMLHttpRequest){
            loginReq=new XMLHttpRequest();
        }else{
            loginReq=ActiveXObject("Microsoft.XMLHTTP");
        }
        return new Promise(function (resolve, reject) {
        loginReq.onreadystatechange=function(){
            if(this.readyState===4){
                if( this.status===200){
                let data=JSON.parse(this.response);
                resolve(data);
                console.log(data);
                const len=data.length;
                if(len>0){                   
                    window.sessionStorage.setItem("userId",emailId);
                alert("Login Successful !!");
                     window.location.assign("product1.html");
                }else{
                    
                    alert("login Failed");
                }
            }else{
                reject({reason:"Failed the Api to execute Due to server issue"});
            }
        }
        }
        
        loginReq.open("get",url,true);
        loginReq.send();
    });
}
 
