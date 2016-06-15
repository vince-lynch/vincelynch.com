var Feed = require('../models/feed');

// POST
function Create(req, res) {
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
};

  // QUERY
  function Index(req, res) {
      Feed.find(function(err, feed) {
          if (err)
              res.send(err);
          res.jsonp(feed); // return feed in JSON format
      });
  };

  // DELETE
  function Delete(req, res) {
    var id = req.params.id;
    Feed.remove({_id: id}, function(err) {
      if(err) res.status(404).send(err);
      res.status(204).send("successfully deleted");
    }).select('-__v');
  };




module.exports = {
  index: Index,
  create: Create,
  delete: Delete
};