let Destination = require('../models/destination');
let connection = require('../db');

let getDestination = [];

//CRUD - DESTINATION

// Retourne une liste de destinations
exports.getDestination = function(req, res) {
    connection.query("SELECT * FROM users.destination", function (error, resultSQL) {
        if (error) {
            res.status(404).send(error);
        }
        else {
            res.status(200);
            getDestination = resultSQL;
            console.log(getDestination);
            res.render('./destinations.ejs', {destinations: getDestination});  
        }  
    });  
}

//Ajouter une destination
exports.addDestination = function(req, res) {
    res.render('./destinationsAdd.ejs', {iddestination:'-1', idagency:'-1', country:"", city:"", days:""});
}

//Nouvelle destination
exports.newDestination = function(req, res) {
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;
    
    let destinations = new Destination(country, city, days);
    console.log(destinations);
    connection.query("INSERT INTO users.destination set ?", destinations, function (error, resultSQL) {
        if(error) {
            res.status(404).send(error);
        }
        else {
            res.status(200).redirect('/destinations');
        }
    });
}

//Modifier une destination de la liste
exports.editDestination = function(req, res) {
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;

    let destinationsUpdate = new Destination(country, city, days);
    console.log(destinationsUpdate);
    connection.query("UPDATE users.destination SET ? WHERE iddestination = ?", [destinationsUpdate, req.params.iddestination], function (error, resultSQL) {
        if(error) {
            res.status(404).send(error);
        }
        else {
            res.redirect('/destinations');
        }
    });
}

// Supprimer une destination suivant un id donné
exports.deleteDestination = function(req, res) {
    let sql = "DELETE FROM users.destination WHERE iddestination = ?"
    connection.query(sql, [req.params.iddestination], (error, resultSQL) => {
        if(error) {
            res.status(404).send(error); 
        }
        else {
            res.redirect('/destinations');
        }
    });
};
