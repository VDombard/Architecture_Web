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
router.get('/destinations/add', destinationController.addDestination);
router.post('/destinations/new', destinationController.newDestination);
router.get('/destinations/update/:ID_Destination', destinationController.editDestination);
router.get('/destinations/delete/:ID_Destination', destinationController.deleteDestination);

// Routes dédiées au domaine <API Destination>
router.get('/api/destination', destinationApiController.getDestination);
router.post('/api/destination', destinationApiController.newDestination);
router.put('/api/destination/:ID_Destination', destinationApiController.editDestination);
router.delete('/api/destination/:ID_Destination', destinationApiController.deleteDestination);


module.exports = router;
//module = une variable
//export = un objet

