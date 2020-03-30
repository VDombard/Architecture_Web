let Destination = require('../models/destination');
let connection = require('../db');

let getDestination = [];

//CRUD - DESTINATION

// Retourne une liste de destinations
exports.getDestination = function(req, res) {
    connection.query("SELECT * FROM users.destination", function (error, resultSQL) {
        if (error) {
            res.status(404).json({'message':error});
        }
        else {
            res.status(200);
            getDestination = resultSQL;
            console.log(getDestination);
            res.json({destinations: getDestination});  
        }  
    });  
}

//Nouvelle destination //Pas besoin ID_Destination dans la liste car auto-incrément
exports.newDestination = function(req, res) {
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;
    
    let destinations = new Destination(country, city, days);
    console.log(destinations);
    connection.query("INSERT INTO users.destination SET ?", destinations, function (error, resultSQL) {
        if(error) {
            res.status(404).json({'message':error});
        }
        else {
            res.status(200).json({'message':'OK'});
        }
    });
}

//Modifier une destination de la liste
exports.editDestination = function(req, res) {
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;

    let destinations = new Destination(country, city, days);

    console.log(destinations);
    connection.query("UPDATE users.destination SET ? WHERE ID_Destination = ?", [destinations, req.params.ID_Destination], function (error, resultSQL) {
        if(error) {
            res.status(404).json({'message':error});
        }
        else {
            res.json({'message':'OK'});
        }
    });
}

// Supprimer une destination suivant un id donné
exports.deleteDestination = function(req, res) {
    let sql = "DELETE FROM users.destination WHERE destination.ID_Destination = ?";
    connection.query(sql, [req.params.ID_Destination], (error, resultSQL) => {
        if(error) {
            res.status(404).json({'message':error});
        }
        else {
            res.json({'message':'OK'});
        }
    });
};
