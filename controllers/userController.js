let User = require('../models/user');
let connection = require('../db');


exports.login = function (req, res) {
    res.render('login.ejs');
};

exports.authLogin = function (req, res) {
    let email = req.body.email,
    password = req.body.password;

if (email && password) {
    connection.query('SELECT * FROM users.user WHERE email =? AND password =?',
    [email, password],
    (err, results) => {
        if (err) throw err;
        if (results.lenght > 0) {
            console.log(results)
            req.session.iduser = results[0].iduser;
            req.session.email = email;
            res.redirect('/userHome');
        } else {
            res.json({code:400, err: 'Incorrect credentials'});
        }
        res.end();
    }
    );
    }
};



exports.register = function (req, res) {
    res.render('register.ejs')
}

exports.authRegister = function (req, res) {
    let register_data = {
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    };
    connection.query('INSERT INTO users.user SET ?', register_data, (err, results) => {
        if (err) throw err;
        else {
            console.log('New user added !', results);
            res.redirect('/userHome');
        }
    });
};

//Delete
exports.confirm = function (req, res) {
    res.render('userDelete.ejs');
};

exports.userRemove = function (req, res) {
    let sql = "DELETE FROM `users`.`user` WHERE iduser = ?";
    connection.query( sql , [req.session.iduser], (error, resultSQL) => {
        if(error) {
            res.status(400).send(error);
        }
        else {
            res.redirect('/userHome');
        }
    });
};