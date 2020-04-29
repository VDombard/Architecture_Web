let express = require('express'); // Instanciation des dépendances// Call express
let app = express();// Instanciation du serveur express
let bodyParser = require('body-parser');//Configure bodyparser to handle POST requests
let session = require('express-session');//Declaration session

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
    })
);

//Route home page
app.get('/', (req, res) => {
    res.render('login.ejs');
});


// gestion d'une route inconnue
app.use(function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(400).send('Page introuvable !');
});
// injection des routes
let router = require('./routes');
app.use('/', router);

// definition du port de lancement
let port = process.env.PORT || 8080;

//Setting up the server
app.listen(port, function() {
    console.log("Server running on port: " + port);
});


module.exports = app;