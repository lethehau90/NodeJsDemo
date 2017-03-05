
'use strict';
var persistHouse = require("node-persist");
//ham khoi tao
//load du lieu luu tren o dia
persistHouse.initSync({
    dir: "Data" //cau hinh noi luu tru
});

function getAll() {
    var houseData = persistHouse.getItemSync("houseData");
    //neu ko co user nao
    if (typeof houseData == "undefined") {
        return [];
    }
    else
        return houseData;
}
function searchId_userId(Id, userId) {

    var houseData = getAll();

    var search = null;
    for (var i = 0; i < houseData.length; i++) {

        if (houseData[i].id == Id && houseData[i].userId == userId) {

            search = houseData[i];
            break;
        }
    }
    //console.log(search);
    return search;
}

//search house for Id
function searchId(Id) {

    var houseData = getAll();

    var search = null;
    for (var i = 0; i < houseData.length; i++) {

        if (houseData[i].id == Id) {

            search = houseData[i];
            break;
        }
    }
    //console.log(search);
    return search;
}

function showError(res) {
    res.json({ Success: false, Error: "not found" });
}


module.exports = function () {
    return {

        //get all danh sach
        showHouse: function (res) {
            var houseData = getAll();
            res.json(houseData);
        },

        showListHouse: function (res) {
            var data = getAll();
            res.json({ Success: true, data });
        },

        showError: function (res) {
            res.json({ Success: false, Error: "not found" });
        },

        //action Insert Data
        addHouse: function (userId, id, name, description, owner, rooms, devices) {
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
        },

        //action Update Data
        updateHouse: function (userId, id, name, description) {
            //var houseData = getAll();
            var houseData = searchId_userId(id, userId);
            if (houseData != null) {
                houseData.description = description;
                houseData.name = name;
            }
            //persistHouse.setItemSync("houseData", houseData);
        },

        //action delete Data
        deleteHouse: function (userId) {

            var houseData = getAll();
            for (var i = 0; i < houseData.length; i++) {
                //console.log(usersdata[i].userId  = userId);
                if (houseData[i].userId == userId) {
                    houseData.splice(i, 1);
                }
            }
            persistHouse.setItemSync("houseData", houseData);
        },

        //action create rooms in house (Server: Add Room API)
        createRomms: function (rooms, req, res) {
            var houseData = searchId(req.body.houseId);
            if (houseData == null) {
                res.json({ Success: false, Error: req.body.houseId + " not found" });
            }
            else
                houseData['rooms'].push(rooms);
        },

        statusDevice: function (device, req, res) {
            var houseData = searchId(req.body.houseId);
            for (var i = 0; i < houseData.devices.length; i++) {
                if (houseData.devices[i].id == device.deviceId) {

                    houseData.devices[i].status = device.status;
                    break;
                }
                else {
                    res.json({ Success: false, Error: req.body.deviceId + " not found" });
                }
            }
        },

        //search house for Id
        searchId: function (Id) {
            var houseData = getAll();
            var search = null;
            for (var i = 0; i < houseData.length; i++) {

                if (houseData[i].id == Id) {

                    search = houseData[i];
                    break;
                }
            }
            //console.log(search);
            return search;
        },

        //search house for UserId
        searchUserId: function (Id) {
            var houseData = getAll();
            var search = null;
            for (var i = 0; i < houseData.length; i++) {
                if (houseData[i].userId == Id) {
                    search = houseData[i];
                    break;
                }
            }
            return search;
        }




    };

}









