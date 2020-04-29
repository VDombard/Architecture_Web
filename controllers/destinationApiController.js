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

//Nouvelle destination //Pas besoin iddestination dans la liste car auto-incrément
exports.newDestination = function(req, res) {
    let iddestination = req.body.iddestination;
    let idagency = req.body.idagency;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;
    
    let destinationsAdd = new Destination(iddestination, idagency, country, city, days);
    console.log(destinationsAdd);
    connection.query("INSERT INTO users.destination SET ?", destinationsAdd, function (error, resultSQL) {
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
    let iddestination = req.body.iddestination;
    let idagency = req.body.idagency;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;

    let destinationsUpdate = new Destination(iddestination, idagency, country, city, days);

    console.log(destinationsUpdate);
    connection.query("UPDATE users.destination SET ? WHERE iddestination = ?", [destinationsUpdate, req.params.iddestination], function (error, resultSQL) {
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
    let sql = "DELETE FROM users.destination WHERE destination.iddestination = ?";
    connection.query(sql, [req.params.iddestination], (error, resultSQL) => {
        if(error) {
            res.status(404).json({'message':error});
        }
        else {
            res.json({'message':'OK'});
        }
    });
};
