var bodyParser = require("body-parser"); //khai bao thu vien de post request string (tham so)

var persist = require("node-persist");
//ham khoi tao
//load du lieu luu tren o dia
persist.initSync({
    dir: "Data" //cau hinh noi luu tru
});

// create application/json parser
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //đang ky form
module.exports = function(app){
    //thuc hiem load het danh sach
    app.get("/api/user/all", function(req, res){
        res.json(getAllUsertest());  
    });

    //thuc hien xoa 
     app.get("/api/user/delete/:IdUser", function(req, res){
         DeleteUsertest(req.params.IdUser);
         res.json(getAllUsertest()); 
    });

    //ham dang nhap
    app.post("/api/user/login", function(req, res){
        var object ={
            username: req.body.username,
            password:req.body.password
        }
        if(LoginUser(object.username,object.password) != null)
        {
            console.log("ok");
            //res.send("1");
            //return 1;
            var a= LoginUser(object.username,object.password);
             res.json({Success : true, data : a});
        }
        else
        {
            //console.log("not ok");
            res.send({Success: false,Error: "not found"});
        }
            
    });
    //thuc hien tim kiem
    app.get("/api/user/search/:IdUser",urlencodedParser,function(req,res){
        //res.send("tim kiem: "+ req.params.userId);
        //var aa= getUsertest(req.params.IdUser);
        res.json(getUsertest(req.params.IdUser));
    });

    //ResetPassword
    app.post("/api/user/ResetPassword",function(req,res){
        var object ={
            username: req.body.username,
            old_password:req.body.old_password,
            new_password:req.body.new_password
        }
        if(LoginUser(object.username,object.old_password) != null)
        {
            if(object.old_password != null ||  object.new_password != null){
            ResetPassword(object.username,object.old_password, object.new_password);  
            var data= LoginUser(object.username,object.new_password);
            res.json({Success : true, data});
            }
            else
            {
                res.send({Success: false,Error: "not found"});
            }
        }
        else
        {
            res.send({Success: false,Error: "not found"});
        }
        
   
    });

    //action create
    app.post("/api/user/create",urlencodedParser,function( req, res){
        var object ={
            userId: req.body.userId,
            username: req.body.username,
            password:req.body.password,
            //address:req.body.address,
            address: {
                street: req.body.address.street,
                name: req.body.address.name,
                phone: req.body.address.phone
            },
            email:req.body.email
        }
            
        // var doituong = {
        //     tennguoidung : req.body.username,
        //     diachi : req.body.address,
        //     thudientu: req.body.email
        // }       
        // themnguoidung(req.body.username, req.body.address, req.body.email);

        if(getUsertest(object.userId) != null )
        {
            res.send("Id "+object.userId+" đã được thêm vào");
        }
        else{
            AddUsertest(object.userId,object.username, object.password, object.address, object.email); 
        }
        Showusertest(res);

    });



    //cập nhật
    app.post("/api/user/update", urlencodedParser , function(req,res){
        var object ={
            userId: req.body.userId,
            username: req.body.username,
            password:req.body.password,
            //address:req.body.address,
            address: {
                street: req.body.address.street,
                phone: req.body.address.phone
            },
            email:req.body.email
        }
        if(getUsertest(object.userId) == null )
        {
            res.send("Id "+object.userId+" Không có trong danh sách");
        }
        else
        {
            UpateUsertest(object.userId,object.username, object.password, object.address, object.email);
        }
         Showusertest(res);

    });
    
    //xu lu du lieu
    //get tat ca
    function getAllUsertest()
    {
        var usersdata = persist.getItemSync("usersdata");
       // console.log(usersdata);
        //neu ko co user nao
        if(typeof usersdata === "undefined" )
        {
            return [];
        }
        else
            return usersdata;
    }

    //take list Id user
    function getUsertest(userId){
        var usersdata = getAllUsertest();
        //dat bien luu tru tim kiem
        var searchuser = null;
        for ( var i = 0 ; i < usersdata.length; i++)
        {
            if(usersdata[i].userId === userId )
            {
                searchuser = usersdata[i];
                break;
            }
        }
        return searchuser;
    }

    function  LoginUser(username,password)
    {
        var usersdata = getAllUsertest();
        //dat bien luu tru tim kiem
        var searchuser = null;
        for ( var i = 0 ; i < usersdata.length; i++)
        {
            if(usersdata[i].username == username && usersdata[i].password == password )
            {
                searchuser = usersdata[i];
                break;
            }
        }
        return searchuser;
    }

    function AddUsertest(userId,username,password,address,email)
    {
        var usersdata = getAllUsertest();
       
        usersdata.push({
                userId: userId,
                username: username,
                password:password,
                address:address,
                email:email
            });
            persist.setItemSync("usersdata",usersdata);
    }

    function themnguoidung(username,address,email)
    {
        var usersdata = getAllUsertest();
       
        usersdata.push({           
                tennguoidung: username,
                diachi:address,
                thudientu:email
            });
            persist.setItemSync("usersdata",usersdata);
    }

    function UpateUsertest(userId,username,password,address,email)
    {
        var usersdata = getAllUsertest();
        for( var i = 0; i < usersdata.length; i++ )
        {
            if(usersdata[i].userId == userId)
            {
                usersdata[i].username = username;
                usersdata[i].password = password;
                usersdata[i].address = address;
                usersdata[i].email = email;
            }
        }
        persist.setItemSync("usersdata",usersdata);
    }

    function DeleteUsertest(userId)
    {
        var usersdata = getAllUsertest();
       
        for(var i = 0 ; i < usersdata.length; i++)
        { 
            //console.log(usersdata[i].userId  = userId);
            if(usersdata[i].userId == userId)
            {
                usersdata.splice(i, 1);
                
            }
        }
        persist.setItemSync("usersdata",usersdata);
    }
    function Showusertest(res)
    {
        var usersdata = getAllUsertest();
         res.json(usersdata);
    }

    

    function ResetPassword(username, old_password, new_password)
    {
        var usersdata = getAllUsertest();
       
        for(var i = 0 ; i < usersdata.length; i++)
        { 
            //console.log(usersdata[i].userId  = userId);
            if(usersdata[i].username == username && usersdata[i].password == old_password)
            {
                usersdata[i].password = new_password;   
                console.log("ok");
            }
        }
        persist.setItemSync("usersdata",usersdata);
    }
}

