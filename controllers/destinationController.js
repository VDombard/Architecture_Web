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
    res.render('destinationsAdd.ejs', {ID_Destination:'-1', ID_Agency:"", country:"", city:"", days:""});
}

//Nouvelle destination
exports.newDestination = function(req, res) {
    let ID_Destination = req.body.ID_Destination;
    let ID_Agency = req.body.ID_Agency;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;
    
    let destinations = new Destination(ID_Destination, ID_Agency, country, city, days);
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
    let ID_Destination = req.params.ID_Destination
    let ID_Agency = req.body.ID_Agency;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;

    let destinations = new Destination(ID_Agency, country, city, days);
    console.log(destinations);
    connection.query("UPDATE users.destination SET ? WHERE ID_Destination = ?", [destinations, ID_Destination], function (error, resultSQL) {
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
    let sql = "DELETE FROM users.destination WHERE destination.ID_Destination = ?"
    connection.query(sql, [req.params.ID_Destination], (error, resultSQL) => {
        if(error) {
            res.status(404).send(error); 
        }
        else {
            res.redirect('/destinations');
        }
    });
};
