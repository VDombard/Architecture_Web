let Destination = require('../models/destination');
let connection = require('../db');

let getDestination = []; //--> 'getDestinations' ou 'destinations' 

//CRUD - DESTINATION

// Retourne une liste de destinations
exports.getDestination = function(req, res) {
    connection.query("SELECT * FROM users.destination", function (error, resultSQL) {
        if (error) {
            res.status(404).send(error);//--> 400 ou 404 ??
        }
        else {
            res.status(200);
            getDestination = resultSQL; //--> Mettre 'destinations' ou 'getdestination'?
            console.log(getDestination);
            res.render('./destinations.ejs', {destinations: getDestination});  
        }  
    });  
}

//Ajouter une destination
exports.addDestination = function(req, res) {
    res.render('destinationsAdd.ejs', {idDestination:'-1', agencyname:"", country:"", city:"", days:""});
}

//Nouvelle destination
exports.newDestination = function(req, res) {
    let agencyname = req.body.agencyname;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;
    
    let destinations = new Destination(agencyname, country, city, days);
    console.log(destinations);
    connection.query("INSERT INTO user set ?", user, function (error, resultSQL) {
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
    let idDestination = req.params.idDestination
    let agencyname = req.body.agencyname;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;

    let destinations = new Destination(agencyname, country, city, days);
    console.log(destinations);
    connection.query("UPDATE users.destination SET ? WHERE idDestination = ?", [destinations, idDestination], function (error, resultSQL) {
        if(error) {
            res.status(404).send(error);
        }
        else {
            res.redirect('/destinations');
        }
    });
}

// Supprime une destination suivant un id donné
exports.deleteDestination = function(req, res) {
    let sql = "DELETE FROM `destinations` WHERE `destination`.`idDestination` = ?";
    connection.query(sql, [req.params.idDestination], (error, resultSQL) => {
        if(error) {
            res.status(404).send(error); 
        }
        else {
            res.redirect('/destinations');
        }
    });
};
