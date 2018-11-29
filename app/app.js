var express = require('express');
var reload = require('reload');
var app = express();
var http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');


var server = http.createServer();


app.set('port', 5656);
app.set('view engine', 'ejs');
app.set('views',"app/views");

app.use(session({
    key: 'user_sid',
    secret: 'somerandomstuffs',
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: false
    }
}));


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/thread'));
app.use(require('./routes/login'));
app.use(require('./routes/SignUp'));
app.use(require('./routes/ForgotPassword'));
app.use(require('./routes/createPost'));
app.use(require('./routes/ResetPassword'));
app.use(require('./routes/user'));
app.use(require('./routes/Signout'));
app.use(require('./routes/search'));

require('./util/mongoose.js')(); //adds mongoose connection

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});


var server = app.listen(5656, function(){
    console.log("Active");
});


reload(app,server);
