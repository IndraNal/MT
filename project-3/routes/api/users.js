// const router = require("express").Router();
// const carController = require("../../controller/carController");


// router.route("/")

//   .get(carController.findAll)
//   .post(carController.createCar)


// module.exports = router;


// Bring in User Model
let db = require('../../models');

// const express = require('express')
// const router = express.Router()
// const User = require('../../models/user')
// const passport = require('../../passport')

// router.post('/', (req, res) => {
//   console.log('user signup');

//   const { username, password } = req.body
//   // ADD VALIDATION
//   User.findOne({ username: username }, (err, user) => {
//     if (err) {
//       console.log('User.js post error: ', err)
//     } else if (user) {
//       res.json({
//         error: `Sorry, already a user with the username: ${username}`
//       })
//     }
//     else {
//       const newUser = new User({
//         username: username,
//         password: password
//       })
//       newUser.save((err, savedUser) => {
//         if (err) return res.json(err)
//         res.json(savedUser)
//       })
//     }
//   })
// })

// router.post(
//   '/login',
//   function (req, res, next) {
//     console.log('routes/user.js, login, req.body: ');
//     console.log(req.body)
//     next()
//   },
//   passport.authenticate('local'),
//   (req, res) => {
//     console.log('logged in', req.user);
//     var userInfo = {
//       username: req.user.username
//     };
//     res.send(userInfo);
//   }
// )

// router.get('/', (req, res, next) => {
//   console.log('===== user!!======')
//   console.log(req.user)
//   if (req.user) {
//     res.json({ user: req.user })
//   } else {
//     res.json({ user: null })
//   }
// })

// router.post('/logout', (req, res) => {
//   if (req.user) {
//     req.logout()
//     res.send({ msg: 'logging out' })
//   } else {
//     res.send({ msg: 'no user to log out' })
//   }
// })

// module.exports = router


//Register Form

module.exports = function (app, passport) {

  // app.get('/', function (req, res) {
  //   // res.render('signin');
  //   res.render('signin');
  // });


  // Use this route to verify the user is authenticated 
  // and get credentials. AKA if req.user, you have a session
  app.get('/user', (req, res, next) => {
    if (req.user) {
      return res.status(200).json({
        user: req.user,
        authenticated: true
      });
    } else {
      return res.status(401).json({
        error: 'User is not authenticated',
        authenticated: false
      });
    }
  });


  // app.post('/signin', passport.authenticate('local-signin', {
  //   successRedirect: '/UserPage',
  //   failureRedirect: '/',
  //   failureFlash: true
  // }
  // ));

  app.post('/user', passport.authenticate('local-signup'), (req, res, next) => {
    console.log('/login handler');
    console.log(req.body);
    // console.log(next);
    req.session.save((err) => {
      if (err) {
        return next(err);
      }

      res.status(200)
        .send('OK1')

    });
  });



  app.post('/', passport.authenticate('local-signin'), (req, res, next) => {
    console.log('/sign handler');
    req.session.save((err) => {
      if (err) {
        return next(err);
      }

      res.status(200).send('sucessfully signed in');
    });
  });

  // // Register Proccess
  // app.post('/register', passport.authenticate('local-signup', {
  //   successRedirect: '/',
  //   failureRedirect: '/register',
  //   failureFlash: true
  // }
  // ));

  // app.post('/signin', passport.authenticate('local-signin', {
  //   successRedirect: '/UserPage',
  //   failureRedirect: '/',
  //   failureFlash: true
  // }
  // ));

  // app.get('/logout', function (req, res) {
  //   req.session.destroy(function (err) {
  //     req.flash('success', 'You are logged out');
  //     res.redirect('/signin');
  //   });
  // });

  app.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).send('OK');
    });
  });

  // Use this to test that your API is working
  app.get('/ping', (req, res) => {
    res.status(200).send("pong!");
  });



}




