let Destination = require('../models/destination');
let connection = require('../db');
let destination = [];

//CRUD - DESTINATION

exports.userHome = function (req, res) {
    connection.query("SELECT FK_Destination, FK_Utilisateur, iddestination, country, city, days FROM users.assoc_util_dest ass inner join users.destination dest on ass.FK_Destination = dest.iddestination where  ass.FK_Utilisateur=?", req.session.iduser, (err, resultSQL) => {
        if (error) {
            res.status(400).send(error);
        }
        else {
             res.status(200)
             destination=resultsQL;
            res.render('userHome.ejs', {destinations: destination});
        }
    });
}
// Retourne une liste de destinations
exports.getDestination = function(req, res) {
    connection.query("SELECT * FROM users.destination", function (error, resultSQL) {
        if (error) {
            res.status(404).send(error);
        }
        else {
            res.status(200);
            destination = resultSQL;
            // console.log(getDestination);
            res.render('./destinations.ejs', {destinations: destination});  
        }  
    });  
}
//Ajouter une destination
exports.addDestination = function(req, res) {
    res.render('destinationsAdd.ejs', {iddestination:"", idagency:"", country:"", city:"", days:""});
}

//Nouvelle destination
exports.newDestination = function(req, res) {
    let iddestination = req.body.iddestination;
    let idagency = req.body.idagency;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;

    //let sess = req.session.iduser
    
    let destinationsAdd = new Destination(iddestination, idagency, country, city, days);
    console.log(destinationsAdd);
    connection.query("INSERT INTO users.destination set ?", destinationsAdd, function (error, resultSQL) {
        if(error) {
            res.status(404).send(error);
        }
        else {
            res.status(200).redirect('/destinations');
        }
    })
};

//Modifier une destination de la liste
exports.editDestination = function(req, res) {
    let iddestination = req.body.iddestination;
    let idagency = req.body.idagency;
    let country = req.body.country;
    let city = req.body.city;
    let days = req.body.days;

    let destinationsUpdate = new Destination(iddestination, idagency, country, city, days);
    console.log(destinationsUpdate);
    connection.query("UPDATE users.destination SET ? WHERE iddestination = ?", [destinationsUpdate, iddestination], function (error, resultSQL) {
        if(error) {
            res.status(404).send(error);
        }
        else {
            res.redirect('/destinations');
        }
    });
}

exports.destFormUpdate = function (request, response) {
    let iddestination = request.params.iddestination;
    connection.query("Select * from users.destination WHERE iddestination = ?", iddestination ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            destination = resultSQL;
            response.render('destinationsUpdate.ejs', {iddestination:destination[0].iddestination, idagency:destination[0].idagency, country:destination[0].country, city:destination[0].city, days:destination[0].days});
        }
    });
}

exports.deleteDestination =  function(req,res){
 let deleted =   destination.splice(req.params.iddestination,1)
     connection.query("DELETE  FROM users.assoc_util_dest where FK_Destination=? ",[deleted[0].iddestination], function (error, resultSQL) {
        if (error) {
            res.status(404).send(error);
        }
        else {
            connection.query("DELETE  FROM users.destination where iddestination =? AND idagency",[deleted[0].iddestination, deleted[0].idagency], function (error, resultSQL) {
                if (error) {
                    res.status(404).send(error);
                }
                res.status(200);
            console.log(resultSQL)
            res.redirect('/destinations');  
            });    
        }  
    });
}