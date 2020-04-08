let User = require('../models/user');
let connection = require('../db');

//let User = [];

exports.register = function(req, res) {
    console.log("req", req.body);
    var today = new User();
    var users = {
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
        "username":req.body.username,
        "password":req.body.password,
            "created":today,
            "modified":today
    }
    connection.query('INSERT INTO users.user SET ?', users, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({"code":404, "failed":"error ocurred"})
        } else {
            console.log('The solution is: ', results);
            res.send({"code":200, "success":"user registered successfully"}).redirect('/login.ejs');
        }
    });
}

exports.getsignup = function(req, res) {
    connection.query("SELECT * FROM users.user", function (error, resultSQL) {
        if (error) {
            res.status(404).send(error);
        }
        else {
            res.status(200);
            getsignup = resultSQL;
            console.log(getsignup);
            res.render('./signup.ejs', {signup: getsignup});  
        }  
    });  
}

exports.signup = function(req, res) {
    var username = req.body.username;
    var password = req.body.passport;
    connection.query('SELECT * FROM users.user WHERE username = ?', [username], function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({"code":404, "failed":"error ocurred"})
        } else {
            console.log('The solution is: ', results);
            if (results.length >0) {
                if(results[0].password == password) {
                    res.send({"code":200, "success":"login successfull"});
                } else {
                    res.send({"code":204, "success":"Username and password does not match"});
                }
            } else {
                res.send({"code":204, "success": "Username does not exist"});
            }
        }
    });
}