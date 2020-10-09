const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

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

    const url = "https://us2.api.mailchimp.com/3.0/lists/30efe5832e/members"
 
  const data = {
      email_address: userEmail,
      status: "subscribed",
      merge_fields: {
        FNAME: userName
      }
  };
 
  const jsonData = JSON.stringify(data);
  
  const options = {
    method: "POST",
    auth: "key:66c39971af0f5879b5bc7fd0aad51b1a-us2",
    headers: "content-type: application/json"
  };
 
  const request = https.request(url, options, (response) =>{
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
