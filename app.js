const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static((__dirname,'pablic')));


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    
    
    const query = req.body.CityName;
    const apikey = "e57b54e1ea9593bbad6ebdbe29128af2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    
    https.get(url, function (response) {
        console.log(response.statusCode);
    
    
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
    
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The wether is currently " + weatherDescription + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
    
            res.write("<img src=" + imageURL + ">");
            res.send()
        })
    });

    // console.log("Post request recived");
})    








app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})