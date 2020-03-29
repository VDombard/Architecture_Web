var mysql = require('mysql');

//Connection avec ma BDD
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vickey20',
    database: 'users'
});

connection.connect(function(error) {
    if (error) throw error;            //throw = lancer
});

module.exports = connection;