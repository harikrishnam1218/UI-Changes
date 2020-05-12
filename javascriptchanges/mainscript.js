createform();
            
function createform(){
                var linebreak = document.createElement("br");
                var div=  document.createElement("div");
                div.setAttribute("class","elementcontainer");
                                
                var namedesc = document.createElement('span');                
                var mobiledesc = document.createElement('span');
                var sapIdDesc=  document.createElement('span');
                var emailDesc=  document.createElement('span');
                var genderDesc=  document.createElement('span');

                var name=document.createElement("input");
                var mobile=document.createElement("input");
                var sapId=document.createElement("input");
                var email = document.createElement("input");
                var gender = document.createElement("input");
                
                 
                 name.setAttribute('type', 'text');
                 name.setAttribute('id','name');
                 name.setAttribute('placeholder','Enter Name');
                 name.setAttribute('pattern','[A-Za-z0-9]{5,15}');
                 name.setAttribute('autocomplete',true);
                 name.setAttribute('required',true);

                 mobile.setAttribute("type","number");
                 mobile.setAttribute("placeholder","Enter Mobile Nmber");
                 mobile.setAttribute("id","mobileId");
                 mobile.setAttribute("autocomplete",true);
                 mobile.setAttribute("pattern","[0-9]+");
                 mobile.setAttribute("required",true);

                 sapId.setAttribute("type","number");
                 sapId.setAttribute("placeholder","Enter sapId");
                 sapId.setAttribute("autocomplete",true);
                 sapId.setAttribute("id","sapId");
                 sapId.setAttribute("required",true);
                
                email.setAttribute("type","email");
                email.id="emailId";
                email.placeholder="Enter Email Id";
                email.autocomplete=true;
                email.required=true;
                email.pattern="[A-Za-z0-9]+.[gmail|dbs.com]"

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
                var bText = document.createTextNode('LoadData');   
                button2.appendChild(bText);  
                button2.setAttribute('onclick', 'getData()');
                buttondiv.appendChild(button1);
                buttondiv.appendChild(button2);

                document.body.appendChild(div);
                document.body.appendChild(buttondiv);
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
