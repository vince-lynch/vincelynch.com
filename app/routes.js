var Feed = require('./models/feed');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = require('../config/tokens').secret;
var router = require('express').Router();
var jwt = require('jsonwebtoken');
var usersController = require('/controllers/userController');
var FeedController = require('/controllers/FeedController');
var authenticationController = require('/controllers/authentication');
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
  .put(usersController.update)
  .delete(usersController.delete);


  router.route('/api/feed')
    .get(FeedController.index);

  router.route('/api/feed/:id')
    .all(secureRoute)
    .delete(FeedController.delete);

router.route('/poststatus').post(FeedController.create)

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

module.exports = router;
    module.exports = function(app) {



//////////// STATICS //////////////////
        
        // Index
        app.get('/', function(req, res, next) {
          res.render('index');
        });

      
  app.get('/users/:id', function(req, res) {
     User.findById(req.params.id, function(err, user) {
       if(err) return res.status(500).json({ message: err });
       return res.status(200).json(user);
     });
   }

   app.put('/users/:id', function(req, res) {
     User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, user) {
       if(err) return res.status(500).json({ message: err });
       return res.status(200).json(user);
     });
   }

 app.get('/users', function(req, res) {
      User.find(function(err, users) {
        if(err) return res.status(500).json({ message: err });
        return res.status(200).json(users);
      });
    }



    app.delete('/users/:id', function(req, res) {
      User.findByIdAndRemove(req.params.id, function(err) {
        if(err) return res.status(500).json({ message: err });
        return res.status(204).send();
      });
    }

    app.post('/register', function(req, res) {
      User.create(req.body, function(err, user) {
        // tidy up mongoose's awful error messages
        if(err) {
          if(err.code && (err.code === 11000 || err.code === 11001)) {
            var attribute = err.message.match(/\$([a-z]+)_/)[1];
            err = "An account with that " + attribute + " already exists";
          }
          return res.status(400).json({ message: err.toString() });
        }

        var payload = { _id: user._id, username: user.username };
        var token = jwt.sign(payload, secret, "24h");
        return res.status(200).json({ message: "Thanks for registering", user: user, token: token });
      });
    }

    app.post('/login', function login(req, res) {
      console.log(req.body)
      User.findOne({ email: req.body.email }, function(err, user) {
        if(err) return res.send(500).json({ message: err });
        if(!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: "Unauthorized" });

        var payload = { _id: user._id, username: user.username };
        var token = jwt.sign(payload, secret, "24h");
        return res.status(200).json({ message: "Login successful", user: user, token: token });
      });
    }

};
