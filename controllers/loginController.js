let express = require('express'); // Instanciation des dépendances// Call express
let app = express();// Instanciation du serveur express

const users = [
    {username:"Ahmed", password:"100moitérien"},
    {username:"Vicky", password:"toto"},
    {username:"Charles", password:"tata"},
    {username:"Yves", password:"tutu"},
    {username:"Hassan", password:"popo"},
    {username:"Abdel", password:"pipi"},
];

exports.renderLoginPage = function(req, res) {
    console.log('render() login page')
    res.render('./login.ejs', {});          
}

exports.authentificationAPI = function(req, res) {
    console.log('authorization')
    // Login and check user account, set session iduser
        i = 0;
        users.forEach(user => {
                if(req.query.username === user.username && req.query.password === user.password ) {
                    req.session.iduser = i;
                    res.send("login success! <a href='/destinations'>Go to content</a>");
            }
            i++;
        });
        if ( !(req.session.iduser >= 0)) {
            res.send("Login failed ! <a href='/login'>Try again</a> ");
        };
}


//Check if authorized
const check = (req, res, next) => {
    if(req.session && req.session.iduser >= 0 ) {
        next();
    }
    else {
        res.send('Access denied');
    }
};


//Login and check user account, set session iduser --> Traiter le login

//app.get('/login', logs, (req, res, next) => {
//    i = 0;
//    users.forEach(user => {
//        if (req.query.username == user.username && 
//            req.query.password == user.password) {
//            req.session.iduser = i;
//            }
//       i++;
//        });
//    if ( ! (req.session.iduser >= 0) ) {
//        res.send('not authorized');
//});


//Logout and destroy session

//app.get('/logout', function (req, res) {
//    req.session.destroy();
//    res.send("Logout successful !");
//});

//Send register form

//app.get('/register_form', (req, res) => {
//  res.render('register.ejs');
//});


//Save new account

//app.post('/register_save', (req, res) => {
//    console.log(req.body);
//    let user = { username: req.body.username, password: req.body.password};
//    users.push(user);
//    console.log(users);
//    res.send('user created !');
//});


//Update user

//app.put('/user/:iduser', (req, res) => {
//    let user = { username: req.body.username, password: req.body.password};
//    users[req.params.iduser] = user;
//    res.send('user updated');
//});


//Delete user

//app.delete('/user/:iduser', (req, res) => {
//    users.splice(rrq.params.iduser, 1);
//    console.log(users);
//    res.send('user deleted !');
//});


//Send login form

//app.get('/login', (req, res) => {
//    let username = "";
//    if (req.cookies && req.cookies.username)
//        username = req.cookies.username
//        res.render('login.ejs', { 'username' : username});
//});