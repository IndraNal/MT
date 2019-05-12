// const User = require('../models/user')
// const LocalStrategy = require('passport-local').Strategy
// var bCrypt = require('bcrypt-nodejs');

// // const strategy = new LocalStrategy(
// // 	{
// // 		usernameField: 'email',
// // 		passwordField: 'password',
// // 		passReqToCallback: true // allows us to pass back the entire request to the callback
// // 	},
// // 	function (email, password, done) {
// // 		User.findOne({ email: email }, (err, user) => {
// // 			if (err) {
// // 				return done(err)
// // 			}
// // 			if (!user) {
// // 				return done(null, false, { message: 'Incorrect username' })
// // 			}
// // 			if (!user.checkPassword(password)) {
// // 				return done(null, false, { message: 'Incorrect password' })
// // 			}
// // 			return done(null, user)
// // 		})
// // 	}
// // )



// const strategy = new LocalStrategy(
// 	{
// 		usernameField: 'email',
// 		passwordField: 'password',
// 		passReqToCallback: true // allows us to pass back the entire request to the callback
// 	},
// 	(req, email, password, done) => {
// 		var generateHash = function (password) {
// 			return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
// 		};

// 		User.findOne({ where: { email: email } }).then(function (response) {
// 			console.log(response.dataValues)
// 			if (response.dataValues) {
// 				console.log('message', 'That email is already taken.');
// 				//return done(null, false, { message: 'That email is already taken' });
// 				return done(null, response.dataValues);
// 			}

// 			else {
// 				var userPassword = generateHash(password);

// 				var data = {
// 					firstname: req.body.firstname,
// 					lastname: req.body.lastname,
// 					email: email,
// 					password: userPassword,

// 				}
// 				User.create(data).then(function (newUser, created) {
// 					if (!newUser) {

// 						return done(null, false);
// 					}
// 					if (newUser) {
// 						console.log("new user")
// 						return done(null, newUser);
// 					}

// 				});


// 			}

// 		}).catch(err => console.log(error))



// 	}

// )
// module.exports = strategy
