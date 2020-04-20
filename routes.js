let express = require('express');
let router = express.Router();

//import attribut controller
var login = require('./controllers/loginController');
var destinationController = require('./controllers/destinationController');
var destinationApiController = require('./controllers/destinationApiCOntroller');

//LOGIN
//Route test
router.get('/api', function(req, res) {
    res.json({ 'message': 'Welcome'});
});

//Route to handle user registration and login
router.get('/register', login.register);
router.get('/login', login.getsignup);

//Routes dédiées au domaine <Destination>
router.get('/destinations', destinationController.getDestination);
router.get('/adddestination', destinationController.addDestination);
router.post('/newdestination', destinationController.newDestination);
router.get('/destinations/:iddestination', destinationController.destFormUpdate);
router.post('/updatedest', destinationController.editDestination)
router.get('/destinations/delete/:iddestination', destinationController.deleteDestination);

// Routes dédiées au domaine <API Destination>
router.get('/api/destination', destinationApiController.getDestination);
router.post('/api/destination', destinationApiController.newDestination);
router.put('/api/destination/:iddestination', destinationApiController.editDestination);
router.delete('/api/destination/:iddestination', destinationApiController.deleteDestination);


module.exports = router;
//module = une variable
//export = un objet

