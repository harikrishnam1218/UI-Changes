function signup(){
    var name=  document.getElementById("name").value;
    var email=  document.getElementById("emailId").value;
    var password=  document.getElementById("pwd").value;
    var mobile=  document.getElementById("mobile").value;
    var address=  document.getElementById("textarea").value;
    var emailPattern="[A-Za-z0-9._%+-]*(@dbs.com|@hcl.com)";
    if(name===null||!name.length>0){
        alert("Please Enter name");
        return false;
    }
    if(!email.length>0){
        alert("Please Enter Mail Id");
        return false;
    }else if(!email.match(emailPattern)){
        alert("Please Enter valid Email");
        return false;       
        }
        if(mobile=="" || mobile==null){
            alert("Please Enter Mobile");
            return false;       
         } else if(mobile.length!=10){
            alert("Please Enter 10 digit Mobile Number");
            return false;       
         }
    var obj1={"name":name,"mobile":mobile,"email":email,"password":password,"address":address};
    console.log(obj1);
    var httpReq;
            if(window.XMLHttpRequest){
                httpReq=new XMLHttpRequest();
            }else{
                httpReq=ActiveXObject("");
            }
            httpReq.onreadystatechange=function(){
                if(this.readyState===4 && this.status===201){
                    alert("Record Inserted !!");
                    console.log(this.response);
                    window.location.assign("loginpage.html");
                
                }
            }
            httpReq.open("post","http://localhost:3000/users",true);
            httpReq.setRequestHeader("Content-type","application/json");
            httpReq.send(JSON.stringify(obj1));
    }