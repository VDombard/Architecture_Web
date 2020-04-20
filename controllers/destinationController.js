let Destination = require('../models/destination');
let connection = require('../db');

let destination = [];

//CRUD - DESTINATION


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
    // deleted = '',
 let deleted =   destination.splice(req.params.iddestination,1)
//   console.log(deleted)
//   console.log(destination[0].idagency)
//   res.render('./destinations.ejs', {destinations: destination});
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
            // console.log(getDestination);
            res.redirect('/destinations');  
            });   
            
        }  
    });


    //  console.log(deleted)
    //  res.render('./destinations.ejs', {destinations: getDestination});  
}

// Supprimer une destination suivant un id donné
// exports.deleteDestination = function(req, res) {
//     console.log("je suis la")
//     res.redirect('/destinations');
//     // console.log(req.params.iddestination)
//     // console.log(getDestination)
//     // let sql = "DELETE FROM users.destination WHERE iddestination = ?"
//     // connection.query(sql, [req.params.iddestination], (error, resultSQL) => {
//     //     if(error) {
//     //         res.status(404).send(error); 
//     //     }
//     //     else {
//     //         res.redirect('/destinations');
//     //     }
//     // });
// };
