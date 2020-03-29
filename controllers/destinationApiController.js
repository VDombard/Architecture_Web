let Destination = require('../models/destination');
let connection = require('../db');

let destinations = [];

//CRUD - DESTINATION

// Retourne une liste de destinations
exports.getDestination = function(req, res) {
    connection.query("SELECT * FROM users.destination", function (error, resultSQL) {
        if (error) {
            res.status(404).json({'message':error});
        }
        else {
            res.status(200);
            getDestination = resultSQL; //--> Mettre 'destinations' ou 'getdestination'?
            console.log(getDestination);
            res.json({destinations: getDestination});  
        }  
    });  
}

//Nouvelle destination de la liste
exports.newDestination = function(req, res) {
    let agencyname = req.body.agencyname;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;

    let destinations = new Destination(agencyname, country, city, days);
    console.log(destinations);
    connection.query("INSERT INTO users.destination set ?", destinations, function (error, resultSQL) {
        if(error) {
            res.status(404).json({'message': error});
        }
        else {
            res.status(200).json({'message': 'success'});
        }
    });
}

//Modifier une destination de la liste
exports.editDestination = function(req, res) {
    let idDestination = req.params.idDestination;
    let agencyname = req.body.agencyname;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;

    let destinations = new Destination(agencyname, country, city, days);
    console.log(destinations);
    connection.query("UPDATE users.destination SET ? WHERE idDestination = ?", [destinations, idDestination], function (error, resultSQL) {
        if(error) {
            res.status(404).json({'message': error});
        }
        else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            res.status(404).json({'message': "Erreur SQL"});
        }
        else {
            res.status(200).json({'message': 'success'});
        }
    });
}

// Supprimer une destination suivant un id donné
exports.deleteDestination = function(req, res) {
    let sql = "DELETE FROM `destinations` WHERE `idDestination` = ?";
    connection.query(sql, [request.params.idDestination], (error, resultSQL) => {
        if(error) {
            res.status(404).json({'message': error});
        }
        else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            res.status(404).json({'message': "Erreur SQL"});
        }
        else {
            res.json({'message': 'success'});
        }
    });
};
