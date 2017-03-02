'use strict';
var bodyParser = require("body-parser"); //khai bao thu vien de post request string (tham so)
var Modulehouse = require("../Module/house");
// create application/json parser
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //đang ky form

var _house =  Modulehouse();

module.exports = function (app) {

    app.get("/api/house/all", function (req, res) {
         
        res.json(_house.showHouse(res));
    });

    //search the house by Id
    app.get("/api/house/:Id", urlencodedParser, function (req, res) {
        var data = _house.searchId(req.params.Id);
        if (data == null) {
            res.json({ Success: false, Error: "not found" });
        }
        res.json({ Success: true, data });
    });

    //search the house by user Id
    app.get("/api/house/searchiduser/:IdUser", urlencodedParser, function (req, res) {
        console.log(req.params.IdUser);
        var data = _house.searchUserId(req.params.IdUser);
        if (data == null) {
            res.json({ Success: false, Error: "not found" });
        }
        res.json({ Success: true, data });

    });

    //search the house by  Id house
    app.get("/api/house/searchidhouse/:Id", urlencodedParser, function (req, res) {
        console.log(req.params.Id);
        var data = _house.searchId(req.params.Id);
        if (data == null) {
            res.json({ Success: false, Error: "not found" });
        }
        res.json({ Success: true, data });

    });

    //action delete
    app.get("/api/house/delete/:IdUser", function (req, res) {
        _house.deleteHouse(req.params.IdUser);
        res.json(_house.showHouse(res));
    });
    app.post("/api/house/insert", urlencodedParser, function (req, res) {

        var object = {
            userId: req.body.userId,
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            owner: req.body.owner,
            rooms: req.body.rooms,
            devices: req.body.devices
        }
        //console.log("object:"+ object.devices[1].name);
        if (_house.searchUserId(object.userId) != null) {
            res.send("UserId " + object.userId + " đã được thêm vào");
        }
        else {
            if (_house.searchId(object.id) != null) {
                res.send("UserId " + object.id + " đã được thêm vào");
            }
            else {
                _house.addHouse(object.userId, object.id, object.name, object.description, object.owner, object.rooms, object.devices);
            }
        }
        _house.showHouse(res);
    });

    app.post("/api/house/createRomms", urlencodedParser, function (req, res) {
        var object = {
            "id": req.body.id,
            "name": req.body.name,
        }

        if (_house.searchId(req.body.houseId) != null) {
            _house.createRomms(object, req, res);
            _house.showHouse(res);
        }
        else {
            res.json({ Success: false, Error: req.body.houseId + " not found" });
        }

    });

    app.post("/api/house/statusDevice", urlencodedParser, function (req, res) {
        var object = {
            "houseId": req.body.houseId,
            "deviceId": req.body.deviceId,
            "status": req.body.status
        }
        if (_house.searchId(req.body.houseId) != null) {
            _house.statusDevice(object, req, res);
            res.json({ Success: true });
        }
        else {

            res.json({ Success: false, Error: req.body.houseId + " not found" });
        }
    });

    app.post("/api/house/update", urlencodedParser, function (req, res) {

        var object = {
            userId: req.body.userId,
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            owner: req.body.owner,
            rooms: req.body.rooms,
            devices: req.body.devices
        }
        //console.log(Object);
        if (_house.searchUserId(object.userId) == null) {
            res.send("UserId " + object.userId + " Không có trong bảng House");
        }
        else {
            if (_house.searchId(object.id) == null) {
                res.send("UserId " + object.id + " Không có trong bảng House");
            }
            else {
                _house.updateHouse(object.userId, object.id, object.name, object.description, object.owner, object.rooms, object.devices);
            }
        }
        _house.showHouse(res);
    });


    //// end function
}



