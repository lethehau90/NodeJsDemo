var bodyParser = require("body-parser"); //khai bao thu vien de post request string (tham so)

var persistHouse = require("node-persist");
//ham khoi tao
//load du lieu luu tren o dia
persistHouse.initSync({
    dir: "Data" //cau hinh noi luu tru
});

// create application/json parser
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //đang ky form
module.exports = function (app) {
    app.get("/api/house/all", function (req, res) {
        res.json(getAll());
    });
    //search the house by Id
    app.get("/api/house/:Id", urlencodedParser, function (req, res) {
        console.log(req.params.Id);
        var data = searchId(req.params.Id);
        if (data == null) {
            res.json({ Success: false, Error: "not found" });
        }
        res.json({ Success: true, data });
    });

    //search the house by user Id
    app.get("/api/house/searchiduser/:IdUser", urlencodedParser, function (req, res) {
        console.log(req.params.IdUser);
        var data = searchUserId(req.params.IdUser);
        if (data == null) {
            res.json({ Success: false, Error: "not found" });
        }
        res.json({ Success: true, data });

    });

    app.post("/api/house/insert", urlencodedParser, function (req, res) {

        var object = {
            userId: req.body.userId,
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            owner: {
                name: req.body.owner.name,
                phone: req.body.owner.phone

            },
            rooms: {
                id: req.body.rooms.id,
                name: req.body.rooms.name
            },
            devices:
            {
                id: req.body.devices.id,
                name: req.body.devices.name,
                connection_code: req.body.devices.connection_code,
                status: req.body.devices.status,
                roomId: req.body.devices.roomId
            }
        }

        if (searchUserId(object.userId) != null) {
            res.send("UserId " + object.userId + " đã được thêm vào");
        }
        else {
            if (searchId(object.id) != null) {
                res.send("UserId " + object.id + " đã được thêm vào");
            }
            else
                addHouse(object.userId, object.id, object.name, object.description, object.owner, object.rooms, object.devices);
        }
        showHouse(res);
    });

    app.post("/api/house/update", urlencodedParser, function (req, res) {
        var object = {
            "userId": req.body.userId,
            "id": req.body.id,
            "name": req.body.name,
            "description": req.body.description,
            "owner": {
                "name": req.body.owner.name,
                "phone": req.body.owner.phone
            },
            "rooms": {
                "id": req.body.rooms.id,
                "name": req.body.rooms.name
            },
            "devices":
            {
                "id": req.body.devices.id,
                "name": req.body.devices.name,
                "connection_code": req.body.devices.connection_code,
                "status": req.body.devices.status,
                "roomId": req.body.devices.roomId
            }
        }
        if (searchUserId(object.userId) == null) {
            res.send("UserId " + object.userId + " Không có trong bảng House");
        }
        else {
            if (searchId(object.id) == null) {
                res.send("UserId " + object.id + " Không có trong bảng House");
            }
            else
                updateHouse(object.userId, object.id, object.name, object.description, object.owner, object.rooms, object.devices);
        }
        showHouse(res);
    });

    ///function init get all danh sach
    function getAll() {
        var houseData = persistHouse.getItemSync("houseData");
        //neu ko co user nao
        if (typeof houseData === "undefined") {
            return [];
        }
        else
            return houseData;
    }

    //get all danh sach
    function showHouse(res) {
        var houseData = getAll();
        res.json(houseData);
    }

    //action Insert Data
    function addHouse(userId, id, name, description, owner, rooms, devices) {
        var houseData = getAll();

        houseData.push(
            {
                "userId": userId,
                "id": id,
                "name": name,
                "description": description,
                "owner": owner,
                "rooms": rooms,
                "devices": devices
            }
        );
        persistHouse.setItemSync("houseData", houseData);
    }

    //action Update Data
    function updateHouse(userId, id, name, description, owner, rooms, devices) {
        var houseData = getAll();

        for (var i = 0; i < houseData.length; i++) {
            if (houseData[i].userId == userId) {
                houseData[i].id = id;
                houseData[i].description = description;
                houseData[i].owner = owner;
                houseData[i].rooms = rooms;
                houseData[i].devices = devices;
            }
        }

        persistHouse.setItemSync("houseData", houseData);
    }



    //search house for Id
    function searchId(Id) {
        var houseData = getAll();

        var search = null;
        for (var i = 0; i < houseData.length; i++) {
            if (houseData[i].id === Id) {
                search = houseData[i];
                break;
            }
        }
        return search;
    }

    //search house for UserId
    function searchUserId(Id) {
        var houseData = getAll();

        var search = null;
        for (var i = 0; i < houseData.length; i++) {
            if (houseData[i].userId === Id) {
                search = houseData[i];
                break;
            }
        }

        return search;


    }


    //take list Id user in table User
    function getAllUser() {
        var usersdata = persist.getItemSync("usersdata");
        // console.log(usersdata);
        //neu ko co user nao
        if (typeof usersdata === "undefined") {
            return [];
        }
        else
            return usersdata;
    }

    function getUser(userId) {
        var usersdata = getAllUser();
        //dat bien luu tru tim kiem
        var searchuser = null;
        for (var i = 0; i < usersdata.length; i++) {
            if (usersdata[i].userId === userId) {
                searchuser = usersdata[i];
                break;
            }
        }
        return searchuser;
    }




    //// end function
}



