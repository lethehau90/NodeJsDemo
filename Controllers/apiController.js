

var bodyParser = require("body-parser"); //khai bao thu vien de post request string (tham so)
// create application/json parser
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var _ = require("lodash");
module.exports = function(app) {

    app.post("/api/login", jsonParser, function(req, res){
        //res.send("wellcom, " + rep.body.Username );
        // console.log(rep.body.Username);
        // console.log(rep.body.Password);

        var post = req.body;
        var username = post.Username;
        var password = post.Password;

        var resurt = [
            {
                deviceId: 123123123,
                username: "admin",
                password: "123",
                status: "ok",
                firstname: "hau",
                lastname: "le"
            },
            {
                deviceId: 123123124,
                username: "guest",
                password: "123456",
                status: "ok",
                firstname: "hoa",
                lastname: "mai"
            }
        ];

        var  user = _.find(resurt, function(user) {
            return user.username === username && user.password === password ;
        });
        res.json(user);
    });


    //load get authenticate
    app.get("/api/authenticate/:username/:password", function(req, res) {
        var resurt = [
            {
                deviceId: 123123123,
                username: "admin",
                password: "123",
                status: "ok",
                firstname: "hau",
                lastname: "le"
            },
            {
                deviceId: 123123124,
                username: "guest",
                password: "123456",
                status: "ok",
                firstname: "hoa",
                lastname: "mai"
            }
        ];
        var findusername = req.params.username;
        var findpassword = req.params.password;

        var  user = _.find(resurt, function(user) {
            return user.username === findusername && user.password === findpassword ;
        });
        res.json(user);
    });

    //load get user all
    app.get("/api/getuser", function(req, res) {
        var resurt = {
            Id: 1234,
            Firtsname: "Le",
            Lastname: "Hau"
        };
        res.json(resurt);
    });
    //load get user Id
    app.get("/api/getuserid/:id", function(req, res) {
        var resurt = {
            Id: 1234,
            Firtsname: "Le",
            Lastname: "Hau"
        }
        res.json(resurt);
        //res.send("<h1>User: "+req.params.id+"</h1>"); //rep.params.id 
    });
    //create post api
    app.post("/api/user", jsonParser, function(req, res) {
        // receive params from client firstname
        res.send("Response:" +  req.body.Username + "")
    });

    //update api is a put
    app.put("/api/user", jsonParser, function(req, res) {
        //update user save api to the database
    });

    //delete api is delete
    app.delete("/api/use/:id", jsonParser, function(rep, res) {
        //delete api to the database
    });
}
