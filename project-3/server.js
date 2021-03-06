var express = require('express');
var path = require('path');
const router = express.Router()
// Init App
var app = express();
var db = require("./models");
var bodyParser = require('body-parser');
// var expressValidator = require('express-validator');
// var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var routes = require("./routes")

require('dotenv').config();

var PORT = process.env.PORT || 3001;

//For BodyParser

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// For passport
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



// // Express Messages Middleware
// app.use(flash());
// app.use(function (req, res, next) {
//   res.locals.message = req.flash('message');
//   res.locals.lmessage = req.flash('lmessage');
//   //res.locals.lmessage = req.flash('lmessage');
//   next();
// });
app.use('/', routes);

// Express Validator Middleware
// app.use(expressValidator({
//   errorFormatter: function (param, msg, value) {
//     var namespace = param.split('.')
//       , root = namespace.shift()
//       , formParam = root;

//     while (namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param: formParam,
//       msg: msg,
//       value: value
//     };
//   }
// }));

// Passport Config
//require('./passport/index')(passport, db.User);

// Define API routes here
//require('./routes/api/users.js')(app, passport);
// require('./routes/api/cars')

//var syncOptions = { force: false }
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});