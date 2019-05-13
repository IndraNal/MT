// const router = require("express").Router();
// const carController = require("../../controller/carController");


// router.route("/")

//   .get(carController.findAll)
//   .post(carController.createCar)


// module.exports = router;


// Bring in User Model
//let db = require('../../models');



// module.exports = function (app, passport) {

  
//   app.get('/user', (req, res, next) => {
//     if (req.user) {
//       return res.status(200).json({
//         user: req.user,
//         authenticated: true
//       });
//     } else {
//       return res.status(401).json({
//         error: 'User is not authenticated',
//         authenticated: false
//       });
//     }
//   });


 

//   app.post('/user', passport.authenticate('local-signup'), (req, res, next) => {
//     console.log('/login handler');
//     console.log(req.body);
//     // console.log(next);
//     req.session.save((err) => {
//       if (err) {
//         return next(err);
//       }

//       res.status(200)
//         .send('OK1')

//     });
//   });



//   app.post('/user/login', passport.authenticate('local-signin'), (req, res, next) => {
//     console.log('/sign handler');
//     req.session.save((err) => {
//       if (err) {
//         return next(err);
//       }

//       res.status(200).send('sucessfully signed in test');
//     });
//   });

  
//   app.get('/logout', (req, res, next) => {
//     req.logout();
//     req.session.save((err) => {
//       if (err) {
//         return next(err);
//       }
//       res.status(200).send('OK');
//     });
//   });

//   // Use this to test that your API is working
//   app.get('/ping', (req, res) => {
//     res.status(200).send("pong!");
//   });



// }


module.exports = function (app, passport) {

const express = require('express')
//const router = express.Router()
//const User = require('../database/models/user')

var User  = require('../../models').User;
//const passport = require('../passport')

app.post('/user', (req, res) => {
    console.log('user signup');
    console.log(req)
    //var email = req.body.email;
    var generateHash = function (password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
    // ADD VALIDATION
    User.findOne({where: { email: email }  }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${email}`
            })
        }
        else {
                var userPassword = generateHash(password);
                var data = {
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  email: email,
                  password: userPassword,
            
                }
			
					User.create(data).then(function (newUser, created) {
						if (!newUser) {

              return res.json(err)
						}
						if (newUser) {
							console.log("new user")
              res.json(savedUser)
						}

			
        })
      }
    })
  })

app.post(
    '/user/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

app.get('/user', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

app.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

}