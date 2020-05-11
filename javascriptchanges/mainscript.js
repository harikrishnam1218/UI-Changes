createform();
            function createform(){
                var linebreak = document.createElement("br");
                var div=  document.createElement("div");
                div.setAttribute("class","elementcontainer");
                
                //var idDesc = document.createElement('span');                 
                var namedesc = document.createElement('span');                
                var mobiledesc = document.createElement('span');
                var sapIdDesc=  document.createElement('span');
                var emailDesc=  document.createElement('span');
                var genderDesc=  document.createElement('span');

                //var id=document.createElement("input");
                var name=document.createElement("input");
                var mobile=document.createElement("input");
                var sapId=document.createElement("input");
                var email = document.createElement("input");
                var gender = document.createElement("input");
                
                 
                 name.setAttribute('type', 'text');
                 name.id='name';
                 name.placeholder="Enter Name";
                 name.pattern="[A-Za-z0-9]{5,15}"
                 name.autocomplete=true;
                 name.required=true;


                 mobile.setAttribute("type","text");
                 /*mobile.setAttribute("type","number");*/
                 mobile.placeholder="Enter Mobile Number";
                 mobile.id="mobileId";
                 mobile.autocomplete=true;
                 mobile.pattern="[0-9]+";
                 mobile.required=true;

                sapId.setAttribute("type","number");
                sapId.placeholder="Enter sapId";
                sapId.autocomplete=true;
                sapId.id="sapId";
                sapId.required=true;

                email.setAttribute("type","email");
                email.id="emailId";
                email.placeholder="Enter Email Id";
                email.autocomplete=true;
                email.required=true;

                gender.setAttribute("type","text");
                gender.placeholder="Enter Gender";
                gender.id="genderId";
            
                 namedesc.textContent = "Name : ";                
                 mobiledesc.textContent="Mobile No :";
                 sapIdDesc.textContent="SAP ID :";
                 emailDesc.textContent="Email Id :";
                 genderDesc.textContent="Gender :";

                 div.appendChild(namedesc);
                 div.appendChild(name);

                 div.appendChild(linebreak);

                 div.appendChild(mobiledesc);
                 div.appendChild(mobile);

                 div.appendChild(linebreak);

                 div.appendChild(sapIdDesc);
                 div.appendChild(sapId);

                 div.appendChild(linebreak);

                 div.appendChild(emailDesc);
                 div.appendChild(email);

                 div.appendChild(linebreak);

                 div.appendChild(genderDesc);
                 div.appendChild(gender);

                 var buttondiv=  document.createElement("div");
                 buttondiv.setAttribute("class","buttonscontainer");

                var button1 = document.createElement('button');     
                var bText = document.createTextNode('ADD');        
                button1.appendChild(bText);  
                button1.setAttribute('onclick', 'createData()');

                
                var button2 = document.createElement('button');      
              // var button2= document.createElement("input");
                var bText = document.createTextNode('LoadData');   
                button2.appendChild(bText);  
                button2.setAttribute('onclick', 'getData()');
                buttondiv.appendChild(button1);
                buttondiv.appendChild(button2);

                document.body.appendChild(div);
                document.body.appendChild(buttondiv);
            }

            function createData(){
                //var id= document.getElementById("id").value;
                var name=document.getElementById("name").value;
                var mobile =document.getElementById("mobileId").value;
                var sapId=document.getElementById("sapId").value;
                var email=document.getElementById("emailId").value;
                var gender=document.getElementById("genderId").value;

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

            function getData(){
                var btable=document.getElementsByTagName("table").length;
                 if(btable>0){
                    var removeTab = document.getElementById('table');
                    var parentEl = removeTab.parentElement;
                        parentEl.removeChild(removeTab);
                }
               
                var httpReq;
                if(window.XMLHttpRequest){
                    httpReq=new XMLHttpRequest();
                }else{
                    httpReq=ActiveXObject("");
                }
                httpReq.onreadystatechange=function(){
                    if(this.readyState===4 && this.status===200){

                        var table=  document.createElement("table");
                        table.id="table";
                        var tbody=  document.createElement("tbody");
                        var thead=  document.createElement("thead");

                        var headTr=  document.createElement("tr");

                        var headTd1=  document.createElement("td");
                          var headTd1Text=   document.createTextNode("Name")
                            headTd1.appendChild(headTd1Text);

                          var headTd2=  document.createElement("td");
                        var headTd2Text=  document.createTextNode("Mobile No");
                        headTd2.appendChild(headTd2Text);

                        var headTd3=  document.createElement("td");
                        var headTd3Text=  document.createTextNode("Sap ID");
                        headTd3.appendChild(headTd3Text);

                        var headTd4=  document.createElement("td");
                        var headTd4Text=  document.createTextNode("Email ID");
                        headTd4.appendChild(headTd4Text);


                        var headTd5=  document.createElement("td");
                        var headTd5Text=  document.createTextNode("Gender");
                        headTd5.appendChild(headTd5Text);

                        
                        var headTd6=  document.createElement("td");
                        var headTd6Text=  document.createTextNode("ID");
                        headTd6.appendChild(headTd6Text);
                        
                        var headTd7=  document.createElement("td");
                        var headTd7Text=  document.createTextNode("Action");
                        headTd7.appendChild(headTd7Text);


                        headTr.appendChild(headTd6);
                        headTr.appendChild(headTd1);
                        headTr.appendChild(headTd2);
                        headTr.appendChild(headTd3);
                        headTr.appendChild(headTd4);
                        headTr.appendChild(headTd5);
                        headTr.appendChild(headTd7);

                        thead.appendChild(headTr);
                        var data=JSON.parse(this.response);
                        console.log(data);
                        var len=data.length;
                        if(len>0){
                        for(var i=0;i<len;i++){
                             var tbodyTr=  document.createElement("tr");

                             var td1=  document.createElement("td");
                            var td1Text=  document.createTextNode(data[i].id);
                            td1.appendChild(td1Text);

                             var td2=  document.createElement("td");
                            var td2Text=  document.createTextNode(data[i].name);
                            td2.appendChild(td2Text);

                             var td3=  document.createElement("td");
                             var td3Text=  document.createTextNode(data[i].mobile);
                            td3.appendChild(td3Text);

                             var td4=  document.createElement("td");
                             var td4Text=  document.createTextNode(data[i].sapId);
                            td4.appendChild(td4Text);

                             var td5=  document.createElement("td");
                             var td5Text=  document.createTextNode(data[i].email);
                            td5.appendChild(td5Text);

                             var td6=  document.createElement("td");
                             var td6Text=  document.createTextNode(data[i].gender);
                            td6.appendChild(td6Text);


                            var deleteButton = document.createElement('button');     
                            var deleteText = document.createTextNode('DELETE');        
                            deleteButton.appendChild(deleteText);  
                            deleteButton.setAttribute('onclick', 'deleteData('+data[i].id+')');

                            var updateButton = document.createElement('button');    
                            updateButton.addEventListener('click',function(){
                                var data1=this.parentElement.parentElement.cells;
                               // console.log(data1[0].innerHTML)
                                var ob1={"id":data1[0].innerHTML,"name":data1[1].innerHTML,
                                "mobile":data1[2].innerHTML,"sapId":data1[3].innerHTML,"email":data1[4].innerHTML,
                                "gender":data1[5].innerHTML};
                                localStorage.setItem("user",JSON.stringify(ob1));
                                window.location.assign("updatepage.html");
                            });
                            var updateeText = document.createTextNode('UPDATE');        
                            updateButton.appendChild(updateeText);  
                           
                            var td7=  document.createElement("td");
                            
                            td7.appendChild(deleteButton);

                           var td8=  document.createElement("td");
                           td8.appendChild(updateButton);

                             tbodyTr.appendChild(td1);
                             tbodyTr.appendChild(td2); 
                             tbodyTr.appendChild(td3);
                             tbodyTr.appendChild(td4);
                             tbodyTr.appendChild(td5);
                             tbodyTr.appendChild(td6);
                             tbodyTr.appendChild(td7);
                             tbodyTr.appendChild(td8);

                             tbody.appendChild(tbodyTr);                         
                        }
                        table.appendChild(thead);
                        }else{
                            var data=document.createElement("h3");
                            var noDataText=document.createTextNode("DATA NOT FOUND");
                            data.appendChild(noDataText);
                            tbody.appendChild(data);
                        }
                        table.appendChild(tbody);

                        var body =document.getElementsByTagName("body")[0];
                        body.appendChild(table);


                    }
                }
                httpReq.open("get","http://localhost:3000/users",true);
                httpReq.send();
            }
        
function deleteData(id){
    var url="http://localhost:3000/users/"+id;
    var httpReq;
                if(window.XMLHttpRequest){
                    httpReq=new XMLHttpRequest();
                }else{
                    httpReq=ActiveXObject("");
                }
                httpReq.onreadystatechange=function(){
                    if(this.readyState===4 && this.status===200){
                        alert("Record Deleted!!");
                        getData();
                    }
                }
                httpReq.open("delete",url,true);
                httpReq.send();
}