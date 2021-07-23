//DEPENDENCIES
const express           = require('express');
const path              = require('path');
const moment            = require('moment'); 
const mongoose          = require('mongoose');
const passport          = require('passport');
require('dotenv').config();
const homeRoute         = require('./routes/homeRoutes')
const dashRoute         = require('./routes/dashRoutes')
const registerRoute     = require('./routes/registerRoutes')
const reportRoute       = require('./routes/reportRoutes');
const Management        = require('./models/Management')
const expressSession    = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  });

//INSTANTIATION
const app = express();

//MONGODB CONNECTION
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
    });
    
    mongoose.connection
    .on('open', () => {
    console.log('Mongoose connection open');
    })
    .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
    }); 
  
//CONFIGURATION FOR THE TEMPLATE ENGINE: PUG
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.moment = moment
app.use(expressSession);

//MIDDLE WARE
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

passport.use(Management.createStrategy());
passport.serializeUser(Management.serializeUser());
passport.deserializeUser(Management.deserializeUser());

var loginChecker = function (req, res, next) {
    if (req.path != '/' && !req.session.user) {
      res.redirect('/')
    }
    next()
  }
  app.use(loginChecker)

//ROUTES
app.use('/',homeRoute); 
app.use('/dashboard',dashRoute);
app.use('/register',registerRoute); 
app.use('/report',reportRoute); 

// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
});

//LISTENING ON SERVER
app.listen(3400, ()=> console.log("Listening on Port 3400!!!"));