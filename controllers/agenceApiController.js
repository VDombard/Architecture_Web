let Agency = require('../models/agence');
let connection = require('../db');

let agence = [];

// Retourne une liste de destinations
exports.getAgence = function(req, res) {
    connection.query("SELECT * FROM users.agency", function (error, resultSQL) {
        if (error) {
            res.status(404).json({'message':error});
        }
        else {
            res.status(200);
            agence = resultSQL;
            res.json({agences: agence});  
        }  
    });  
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
            res.status(404).json({'message':error});
        }
        else {
            res.status(200).json({'message':'OK'});
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
            res.status(404).json({'message':error});
        }
        else {
            res.json({'message':'OK'});
        }
    });
}