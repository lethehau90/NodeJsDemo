
var bodyParser = require("body-parser"); //khai bao thu vien de post request string (tham so)
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //đang ky form
// create application/json parser
var jsonParser = bodyParser.json(); //đăng ký json

module.exports= function (app) {
    app.get("/api/hello", function(rep,res){
    res.send("<h1>Hello !! program webservice smartphone</h1>");
});

//other
app.get("/user/:id",function(rep, res){
    //req.query.qstr
    res.render("user", {ID: rep.params.id, queryString: rep.query.qstr});
});

app.post("/login", urlencodedParser, function(rep, res){
    //res.send("wellcom, " + rep.body.Username );
     res.render("login", {RESURT: rep.body.Username +"+"+rep.body.Password});
    console.log(rep.body.Username);
    console.log(rep.body.Password);
});


//xay dung nhan du lieu tu json
app.post("/loginjson", jsonParser, function(req,res){
    res.send("Ok");
    console.log(req.body.Username);
    console.log(req.body.Password);
})

}