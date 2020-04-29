let express = require('express');
let router = express.Router();

//import attribut controller
var userController = require('./controllers/userController');
var destinationController = require('./controllers/destinationController');
var destinationApiController = require('./controllers/destinationApiCOntroller');
var agenceController = require('./controllers/agenceController');
var agenceApiController = require('./controllers/agenceApiController');


//Route test
router.get('/api', function(req, res) {
    res.json({ 'message': 'Welcome'});
});
const check = (req, res, next) => {
    if(req.session && req.session.userid >= 0){
        next();
    }
    else{
        res.send('Acces denied');
    }
};

//Route <Login>
router.get('/userHome',check, destinationController.userHome);
router.get('/register', userController.register);
router.post('/authRegister', userController.authRegister);
router.get('/login', userController.login);
router.post('/authLogin', userController.authLogin);
router.get('/confirm', userController.confirm);
router.post('/userRemove', userController.userRemove);


//Routes <Destination>
router.get('/destinations', destinationController.getDestination);
router.get('/adddestination', destinationController.addDestination);
router.post('/newdestination', destinationController.newDestination);
router.get('/destinations/:iddestination', destinationController.destFormUpdate);
router.post('/updatedest', destinationController.editDestination)
router.get('/destinations/delete/:iddestination', destinationController.deleteDestination);

//Routes <API Destination>
router.get('/api/destination', destinationApiController.getDestination);
router.post('/api/destination', destinationApiController.newDestination);
router.put('/api/destination/:iddestination', destinationApiController.editDestination);
router.delete('/api/destination/:iddestination', destinationApiController.deleteDestination);

//Routes <Agences>
router.get('/agences', agenceController.getAgence);
router.get('/addagence', agenceController.addAgence);
router.post('/newagence', agenceController.newAgence);
router.get('/agences/:idagency', agenceController.agenceFormUpdate);
router.post('/updateagency', agenceController.editAgence);

//Routes <API Agences>
router.get('api/agence', agenceApiController.getAgence);
router.post('api/agence', agenceApiController.newAgence);
router.put('api/agence/:idagency', agenceApiController.editAgence);



module.exports = router;
//module = une variable
//export = un objet

