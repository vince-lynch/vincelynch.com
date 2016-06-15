var Feed = require('./models/feed');
var User = require('./models/user');
var jwt = require('jsonwebtoken');
var secret = require('../config/tokens').secret;
var router = require('express').Router();
var jwt = require('jsonwebtoken');
var usersController = require('./controllers/userController');
var FeedController = require('./controllers/FeedController');
var authenticationController = require('./controllers/authentication');
var secret = require('../config/tokens').secret;

// custom JWT middleware
function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, user) {
    if(!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}


router.route('/users')
  .get(secureRoute, usersController.index);


router.route('/users/:id')
    .all(secureRoute)
    .get(usersController.show)
    .delete(usersController.delete);


  router.route('/api/feed').get(FeedController.index);

  router.route('/api/feed/:id')
      .all(secureRoute)
      .delete(FeedController.delete);



  router.route('/poststatus')
  .all(secureRoute)
  .post(FeedController.create);

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

module.exports = router;
    