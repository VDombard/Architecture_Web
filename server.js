let express = require('express'); // Instanciation des dépendances// Call express
let app = express();// Instanciation du serveur express
let path = require('path');

//Configure bodyparser to handle POST requests
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Déclaration session
let session = require('express-session');

let user = (username='admin', password= '1234');
let users = [];
users.push(user);

//Starting using session
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
    })
);

// injection des routes
let router = require('./routes');
app.use('/', router);

// definition du port de lancement
let port = process.env.PORT || 8080;

// ecoute sur le port
app.listen(port, function() {
    console.log("Server running on port: " + port);
})

//Login ??
const logs = (req, res, next) => {
    console.log(req.sessionID);
    next();
};

//app.use(logs);

// gestion d'une route inconnue
app.use(function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(400).send('Page introuvable !');
})