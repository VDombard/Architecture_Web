let Agency = require('../models/agence');
let connection = require('../db');

let agence = [];

// Retourne une liste de destinations
exports.getAgence = function(req, res) {
    connection.query("SELECT * FROM users.agency", function (error, resultSQL) {
        if (error) {
            res.status(404).send(error);
        }
        else {
            res.status(200);
            agence = resultSQL;
            res.render('agences.ejs', {agences: agence});  
        }  
    });  
}
//Ajouter une destination
exports.addAgence = function(req, res) {
    res.render('agencesAdd.ejs', {idagency:"", agencyName:""});
}

//Nouvelle destination
exports.newAgence = function(req, res) {
    let idagency = req.body.idagency;
    let agencyName = req.body.agencyName;
    //let sess = req.session.iduser
    
    let agencesAdd = new Agency(idagency, agencyName);
    console.log(agencesAdd);
    connection.query("INSERT INTO users.agency set ?", agencesAdd, function (error, resultSQL) {
        if(error) {
            res.status(404).send(error);
        }
        else {
            res.status(200).redirect('/agences');
        }
    })
};

//Modifier une destination de la liste
exports.editAgence = function(req, res) {
    let idagency = req.body.idagency;
    let agencyName = req.body.agencyName;

    let agencesUpdate = new Agency(idagency, agencyName);
    console.log(agencesUpdate);
    connection.query("UPDATE users.agency SET ? WHERE idagency = ?", [agencesUpdate, idagency], function (error, resultSQL) {
        if(error) {
            res.status(404).send(error);
        }
        else {
            res.redirect('/agences');
        }
    });
}

exports.agenceFormUpdate = function (request, response) {
    let idagency = request.params.idagency;
    connection.query("Select * from users.agency WHERE idagency = ?", idagency ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            agence = resultSQL;
            response.render('agencesUpdate.ejs', {idagency:agence[0].idagency, agencyName:agence[0].agencyName});
        }
    });
}

//Supprimer une agence
exports.deleteAgence =  function(req,res){
 let deleted =  agence.splice(req.params.idagency,1)
     connection.query("DELETE  FROM users.agency where idagency=? ",[deleted[0].idagency], function (error, resultSQL) {
        if (error) {
            res.status(404).send(error);
        }
        else {
            res.status(200);
            agence = resultSQL;
            res.render('./agences.ejs', {agences: agence});  
        }  
    });  
}