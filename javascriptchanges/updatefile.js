
        
    createform();

    var data=JSON.parse(localStorage.getItem('user'));        
   document.getElementById("name").value=data.name;
   document.getElementById("mobile").value=data.mobile;
   document.getElementById("sapId").value=data.sapId;
   document.getElementById("email").value=data.email;
   document.getElementById("gender").value=data.gender;
  
function createform(){
var linebreak = document.createElement("br");
var div=  document.createElement("div");

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
name.id='name';
name.placeholder="Enter Name";
name.autocomplete=true;

mobile.setAttribute("type","text");
mobile.placeholder="Enter Mobile Number";
mobile.id="mobile";
mobile.autocomplete=true;

sapId.setAttribute("type","number");
sapId.placeholder="Enter sapId";
sapId.autocomplete=true;
sapId.id="sapId";

email.setAttribute("type","email");
email.id="email";
email.placeholder="Enter Email Id";
email.autocomplete=true;

gender.setAttribute("type","text");
gender.placeholder="Enter Gender";
gender.id="gender";

namedesc.textContent = "Name : ";                
mobiledesc.textContent="Mobile No :";
sapIdDesc.textContent="SAP ID :";
emailDesc.textContent="Email Id :";
genderDesc.textContent="Gender :";

div.appendChild(namedesc);
div.appendChild(name);

div.appendChild(mobiledesc);
div.appendChild(mobile);


div.appendChild(sapIdDesc);
div.appendChild(sapId);


div.appendChild(emailDesc);
div.appendChild(email);

div.appendChild(genderDesc);
div.appendChild(gender);

var buttondiv=  document.createElement("div");
buttondiv.setAttribute("class","buttonscontainer");

var button1 = document.createElement('button');     
var bText = document.createTextNode('Update');        
button1.appendChild(bText);  
button1.setAttribute('onclick', 'updateData()');
buttondiv.appendChild(button1);

document.body.appendChild(div);
document.body.appendChild(buttondiv);

}


function updateData(){
  //var id= data.id;
   var url="http://localhost:3000/users/"+data.id;
  var name1= document.getElementById("name").value;
   var mobile1=document.getElementById("mobile").value;
  var sapId1= document.getElementById("sapId").value;
   var email1=document.getElementById("email").value;
   var gender1=document.getElementById("gender").value;
   var data1={"name":name1, "mobile":mobile1,"sapId":sapId1,"email":email1,"gender":gender1};
   console.log(data1);
   var httpReq;
           if(window.XMLHttpRequest){
               httpReq=new XMLHttpRequest();
           }else{
               httpReq=ActiveXObject("");
           }
           httpReq.onreadystatechange=function(){
               if(this.readyState===4 && this.status===200){
               alert("Record Updated Successfully!!");
             console.log(this.response);                
               }
           }
           httpReq.open("put",url,true);
           httpReq.setRequestHeader("Content-type","application/json");
           httpReq.send(JSON.stringify(data1));
          

}
