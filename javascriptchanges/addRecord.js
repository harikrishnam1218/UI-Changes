
            function createData(){
                var name=document.getElementById("name").value;
                var mobile =document.getElementById("mobileId").value;
                var sapId=document.getElementById("sapId").value;
                var email=document.getElementById("emailId").value;
                var gender=document.getElementById("genderId").value;

                    if(!(gender==="Male"||gender==="Female"||gender==="male"||gender==="female")){
                        alert("Please Enter Valid gender Name ");
                        return;
                    }

                    if(!name.length>0){
                         alert("Please Enter Name");
                         return;
                    }else if(!mobile.length>0){
                          alert("Please Enter Mobile No");    
                          return;       
                     }else if(!sapId.length>0){
                            alert("Please Enter SAPID");   
                            return;        
                     }else if(!email.length>0){
                           alert("Please Enter Email Id"); 
                           return;          
                     }

                var obj={"name":name,"mobile":mobile,"sapId":sapId,"email":email,"gender":gender};
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
                  getData();
                    }
                }
                httpReq.open("post","http://localhost:3000/users",true);
                //httpReq.send(obj);
                httpReq.setRequestHeader("Content-type","application/json");
                httpReq.send(JSON.stringify(obj));
            }
