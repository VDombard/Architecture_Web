let express = require('express'); // Instanciation des dépendances// Call express
let app = express();// Instanciation du serveur express
let bodyParser = require('body-parser');//Configure bodyparser to handle POST requests
let session = require('express-session');//Declaration session

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
    })
);

//Login
//app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//});

// injection des routes
let router = require('./routes');
app.use('/', router); //--> app.use('/api, router);

// definition du port de lancement
let port = process.env.PORT || 8080;

//Setting up the server
app.listen(port, function() {
    console.log("Server running on port: " + port);
});

// gestion d'une route inconnue
app.use(function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(400).send('Page introuvable !');
});

module.exports = app;