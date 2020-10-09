const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { endpoint , apikey } = require('./config');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// root route
 app.get("/",function(req,res){
    res.sendFile(__dirname+'/signup.html');
 });

 // post the user data
 app.post("/",function(req,res){
    // console.log("user name  :"+req.body.inputName);
    // console.log("user email :"+req.body.inputEmail);
    // get form data
    const userName = req.body.inputName;
    const userEmail = req.body.inputEmail;

    const api_url = endpoint;
 
  const userData = {
      email_address: userEmail,
      status: "subscribed",
      merge_fields: {
        FNAME: userName
      }
  };
 
  const jsonData = JSON.stringify(userData);
  
  const options = {
    method: "POST",
    auth: "key:"+apikey,
    headers: "content-type: application/json"
  };
 
  const request = https.request(api_url, options, (response) =>{
            if(response.statusCode === 200)
                res.sendFile(__dirname+"/success.html");
            else
                res.sendFile(__dirname+"/failure.html");  
  });
 
  request.write(jsonData);
  request.end();
 
});

// for try-agian route
app.post("/failure",function(req,res){
    res.redirect("/");
});

// set port
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running...");
});
