// Weather API project - render the weather of a city the user enter.
// APIs (Application Programming Interfaces) are interfaces that allow us to access data from another application without needing to know how the other application's code works.

const express = require("express");
const https = require ("https");
const bodyParser = require ("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req,res){
  const query = req.body.cityName;
  const apiKey = "bc8fcba16f783c2edfcefd88648c5c0a";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon= weatherData.weather[0].icon;
      const imgageURL= "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "<p>");
      res.write("<h1>The temp in " + query + " is " + temp + " degrees. </h1>");
      res.write("<img src=" + imgageURL + ">");
      res.send();
    });
  });
});




app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});