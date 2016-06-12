// https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var morgan        = require('morgan');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var db = require('./config/db');
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url); 


app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(methodOverride('X-HTTP-Method-Override')); 

app.set("view engine", "ejs");
app.set("views", __dirname + "/public");
app.use(express.static(__dirname + '/public')); 

require('./app/routes.js')(app); // configure our routes

app.listen(port);  

console.log('Magic happens on port ' + port);      
exports = module.exports = app;   