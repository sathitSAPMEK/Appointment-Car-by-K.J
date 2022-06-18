const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const morgan = require('morgan');
const session = require("express-session");
const passport = require("passport");
var crypto = require('crypto');
var LocalStrategy = require('passport-local');
const { firestoreDB } = require('./config');
require('dotenv').config();

const app = express();

// Below all the app.use methods
app.use(session({
  secret : "secret key",
  resave : false,
  saveUninitialized : false,
  expires: new Date(Date.now() + (30 * 86400 * 1000))
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(cors());

app.use(express.static(__dirname + '/public'));

// Initializing Passport
app.use(passport.initialize());
  
// Starting the session
app.use(passport.session());

function checkAuthenticated(req, res, next) {  
  console.log(req.session.isLoggedIn);
  if(req.session.isLoggedIn){
    return next();
  }else{
    return res.status(400).json({
      status: 404,
      message: "Can't Login Please Login!"
    })
  }  
}

app.get('/', async (req, res, next) => {
  res.status(200).send({
    'status': 200,
    'message': 'Server Phet Garage is Online 🚀'
  });
});

app.use('/api', require('./routes/api.route'));
app.use('/category', require('./routes/categorySpares'));
app.use('/spares', require('./routes/spares'));
app.use('/appointment', require('./routes/appointment'));
app.use('/chats', require('./routes/chats'));
app.use('/report', require('./routes/reports'));

// Authentication And Login
app.get('/login', checkAuthenticated, (req, res) =>{
  res.status(200).send({
    'status': 200,
    'message': 'Wellcome to Phet Garage 🚀'
  });
})
app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
