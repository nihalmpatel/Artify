const express       = require('express');
const app           = express();
const mongooes      = require('mongoose');
const jwt           = require('jsonwebtoken');
const passport      = require('passport');
const flash         = require('connect-flash');
const morgan        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const session       = require('express-session');
const configDB      = require('./config/database.js');
const port          = process.env.PORT || 8080;

// mongodb configuration 
mongooes.connect(configDB.url);

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('superSecret',configDB.secret);
app.set('jwtoken',jwt);

/* required for passport
app.use(session({ secret: 'iuseartifydailybecauseiloveit' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session */

// routes 
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch 
app.listen(port);
console.log('Server is running on port:' + port);
  