
            fetchproducts();
            function fetchproducts(){
            var url="http://localhost:3000/products";
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
                var products=  document.createElement("div");
                products.setAttribute("class","product-list");
                products.setAttribute("id","products");
                var len=data.length;
                if(len>0){
                    for(var i=0;i<len;i++){
                        var productName=data[i].productname;
                        var productId=data[i].id;
                        var price=data[i].price;
                        var description=data[i].description
                        var rating=data[i].rating;
                 var product=  document.createElement("div");
                 product.setAttribute("class","product-item");

                 var descDiv=  document.createElement("div");
                 descDiv.setAttribute("class","description");

                 var nameSpan=  document.createElement("span");
                 nameSpan.textContent=productName;
                 
                 var descSpan=  document.createElement("span");
                 descSpan.textContent=description;

                 
                 var ratingSpan=  document.createElement("span");
                 ratingSpan.textContent="Rating :"+rating;

                 descDiv.appendChild(nameSpan);
                 descDiv.appendChild(descSpan);
                 descDiv.appendChild(ratingSpan);

                 
                 var quantityDiv=  document.createElement("div");
                 quantityDiv.setAttribute("class","quantity");

                 var qtext=  document.createElement("input");
                 qtext.setAttribute("type","number");
                 qtext.setAttribute("id","quantity");
                 qtext.setAttribute("size",1);
                 qtext.setAttribute("step","1");

                 quantityDiv.appendChild(qtext);
                
                 var priceDiv=  document.createElement("div");
                 priceDiv.setAttribute("class","total-price");

                 var priceSpan=  document.createElement("span");
                 priceSpan.textContent=price;
                 priceDiv.appendChild(priceSpan);
            
                 var addcartDiv=  document.createElement("div");
                 addcartDiv.setAttribute("class","btn-addcart");
                 
                 var addcartButton = document.createElement('button');    
                 //addcartButton.disabled=true;
                 addcartButton.addEventListener('click',function(){
                     console.log(this);
                        //    var productName=data[i].productname;
                        //     var productId=data[i].id;
                        //     var price=data[i].price;
                        //     var description=data[i].description
                        //     var rating=data[i].rating;
                             var quantity=document.getElementById("quantity").value;
                             var ob1={"id":productId,"productName":productName,
                                "price":price,"description":description,"rating":rating,"quantity":quantity};
                             window.sessionStorage.setItem("cartData"+productId,JSON.stringify(ob1));
                               // window.location.assign("updatepage.html");
                            });
                            var addcartText = document.createTextNode('addcart');        
                            addcartButton.appendChild(addcartText);  
                        // var quantity=document.getElementById("quantity").value;
                        // if(quantity>0){
                        //     addcartButton.disabled=true;
                        // }

                        addcartDiv.appendChild(addcartButton);

                 product.appendChild(descDiv);
                 product.appendChild(quantityDiv);
                 product.appendChild(priceDiv);
                 product.appendChild(addcartDiv)

                 products.appendChild(product);

                 var body =document.getElementsByTagName("body")[0];
                        body.appendChild(products);
                }

            }
        }
    }
        httpReq.open("get",url,true);
        httpReq.send();

            }