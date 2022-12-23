const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

 const app = express();
//Get input Data
 app.use(bodyParser.urlencoded({extende: true}));

//Route
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

//Catch Post Request from Route "/"
app.post("/",function(req,res){
//Fetch Data from api key
const query =req.body.cityName;
const apiKey = "Api Key from Open Weather";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=metrics";
//Fetch data from external Server
https.get(url,function(response){
  console.log(response.statusCode);

  response.on("data", function(data){
    //Convert to json format
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp;
    console.log(temp);
    
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

    //sending back to ui
    res.write("<h1>The weather is currenty "+ weatherDescription+"</h1>")
    res.write("<h1>The Teamperature in "+ query +" is " + temp+" degrees Celcius.</h1>");
    res.write("<img src='"+ imageURL +"'>");
    res.send();
  })
});
})

 app.listen(3000, function(){
   console.log("Server is running on port 3000");
 })
