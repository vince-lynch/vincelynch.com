var Feed = require('./models/feed');
    module.exports = function(app) {

//////////// STATICS //////////////////
        
        // Index
        app.get('/', function(req, res, next) {
          res.render('index');
        });

        // Feed
        app.get('/feed', function(req, res, next) {
          res.render('feed');
        });


        /////////////
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

};
