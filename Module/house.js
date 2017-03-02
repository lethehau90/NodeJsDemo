
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


module.exports = function () {
    return {

        //get all danh sach
        showHouse: function (res) {
            var houseData = getAll();
            res.json(houseData);
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









