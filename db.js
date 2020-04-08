var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vickey20',
    database: 'users'
});

connection.connect((err) => {
    if(!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error :' + JSON.stringify(err, undefined, 2));
});

module.exports = connection;