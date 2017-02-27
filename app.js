var express = require("express");
var cookieparser = require("cookie-parser"); //khai báo thư viện cookie

var bodyparser = require("body-parser"); //read info use send
var morgan = require("morgan");

var mongoose = require('mongoose');

var app = express();
var apiController = require("./Controllers/apiController");
var homeController = require("./Controllers/homeController");

var apiuser = require("./Controllers/apiuserController");
var apihouse = require("./Controllers/apiHouseController");

var port = process.env.PORT || 3000;

app.use("/assets",express.static(__dirname+"/public")); //file tinh css, js
app.use(cookieparser());
app.set("view engine","ejs"); //su dung template ejs

// //custom middleware
// app.use("/", function(req, res, next){
//     console.log("request url: ", req.url); //in ra url
//     req.requestTime = new Date();
//     next();
// });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(morgan("dev"));


apiController(app);
homeController(app);
apihouse(app);
apiuser(app);

app.listen(port, function(){
    console.log("start conncecting webserver port: "+port);
})
