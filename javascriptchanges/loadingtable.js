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