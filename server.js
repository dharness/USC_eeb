// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var http = require('http')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var MongoClient = require('mongodb').MongoClient;
_Grid = MongoClient.Grid;
var dbConfig = require('./app/db.js');
var User = require('./models/user.js');
var mongoose = require('mongoose');
var flash = require('connect-flash')
mongoose.connect(dbConfig.url);
var bCrypt = require('bcrypt');

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({
	secret: 'mySecretKey'
}));
app.use(passport.initialize());
app.use(passport.session());

// DATBASE CRUMS ======================================

MongoClient.connect('mongodb://usc_admin:admin1@ds031701.mongolab.com:31701/usc_web', function(err, db) {
	if (err) throw err;
	console.log("Connected to Database");
	_db = db //this is our global database object
})

app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(express.static(__dirname + '/public'))
app.engine('html', require('ejs').renderFile);


// LOGIN ======================================
passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use('login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {

		// check in mongo if a user with username exists or not
		User.findOne({
				'username': username
			},
			function(err, user) {
				// In case of any error, return using the done method
				if (err)
					return done(err);
				// Username does not exist, log error & redirect back
				if (!user) {
					console.log('User Not Found with username ' + username);
					return done(null, false,
						flash('message', 'User Not found.'));
				}
				// User exists but wrong password, log the error 
				if (!isValidPassword(user, password)) {
					console.log('Invalid Password');
					return done(null, false,
						flash('message', 'Invalid Password'));
				}
				// User and password both match, return user from 
				// done method which will be treated like success
				return done(null, user);
			}
		);
	}));

// comment back in to add new user
// passport.use('signup', new LocalStrategy({
// 		passReqToCallback: true
// 	},
// 	function(req, username, password, done) {
// 		findOrCreateUser = function() {
// 			// find a user in Mongo with provided username
// 			User.findOne({
// 				'username': username
// 			}, function(err, user) {
// 				// In case of any error return
// 				if (err) {
// 					console.log('Error in SignUp: ' + err);
// 					return done(err);
// 				}
// 				// already exists
// 				if (user) {
// 					console.log('User already exists');
// 					return done(null, false,
// 						req.flash('message', 'User Already Exists'));
// 				} else {
// 					// if there is no user with that email
// 					// create the user
// 					var newUser = new User();
// 					// set the user's local credentials
// 					newUser.username = username;
// 					newUser.password = createHash(password);

// 					// save the user
// 					newUser.save(function(err) {
// 						if (err) {
// 							console.log('Error in Saving user: ' + err);
// 							throw err;
// 						}
// 						console.log('User Registration succesful');
// 						return done(null, newUser);
// 					});
// 				}
// 			});
// 		};

// 		// Delay the execution of findOrCreateUser and execute 
// 		// the method in the next tick of the event loop
// 		process.nextTick(findOrCreateUser);
// 	}));

var isValidPassword = function(user, password) {
	return bCrypt.compareSync(password, user.password);
}

// Generates hash using bCrypt
var createHash = function(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

/* Handle Login POST */
app.post('/login', passport.authenticate('login', {
	successRedirect: '/admin',
	failureRedirect: '/',
	failureFlash: true
}));

isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
} 

app.get('/logout', isAuthenticated, function(req, res){ 		// SECURE ++++++
	console.log('logging user out')
  req.logout();
  res.redirect('/');
});

// comment back in to add new user
// app.post('/signup', passport.authenticate('signup', {
// 	successRedirect: '/home',
// 	failureRedirect: '/signup',
// 	failureFlash: true
// }));

// routes ======================================================================
require('./app/routes.js')(app) // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port, '127.0.0.1')
console.log('The magic happens on 127.0.0.1:' + port)
