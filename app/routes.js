var Feed = require('./models/feed');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
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

    module.exports = function(app) {



//////////// STATICS //////////////////
        
        // Index
        app.get('/', function(req, res, next) {
          res.render('index');
        });

        ///////////// Scrape etc.
      app.post('/poststatus', function(req, res) {
        var preview = require("page-previewer");
        preview(req.body.link, function(err, data) {
          if(!err) {
            console.log(data);
            if (req.body.link.indexOf("youtube") === -1){
              var status = new Feed({status: data});
              status.save(function(err) {
                if(err) res.status(500).send(err);
                res.jsonp(data); //Prints the meta data about the page
              });
            } else {
              var youtubeID = req.body.link.split("v=")[1].split("&")[0];
              data.embed = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + youtubeID + '" frameborder="0" allowfullscreen></iframe>';
              var status = new Feed({status: data});
              status.save(function(err) {
                if(err) res.status(500).send(err);
                res.jsonp(data);
              });
            }
          }
        });
      });

        // QUERY
        app.get('/api/feed', function(req, res) {
            Feed.find(function(err, feed) {
                if (err)
                    res.send(err);
                res.jsonp(feed); // return feed in JSON format
            });
        });
        // POST
        app.post('/api/feed', function(req, res) {
            var status = new Feed(req.body);
            status.save(function(err) {
              if(err) res.status(500).send(err);
              res.status(201).send(status);
            });
          });
        // DELETE
        app.delete('/api/feed/:id', function(req, res) {
          var id = req.params.id;
          Feed.remove({_id: id}, function(err) {
            if(err) res.status(404).send(err);
            res.status(204).send("successfully deleted");
          }).select('-__v');
        });

        
    app.get('/users', function(req, res) {
      User.find(function(err, users) {
        if(err) return res.status(500).json({ message: err });
        return res.status(200).json(users);
      });
    }

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
