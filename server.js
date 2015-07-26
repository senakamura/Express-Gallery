var config = require('./config/config.json');

var express = require('express');
var app = express();

var session = require('express-session');

var models = require('./models');

var Gallery = models.Gallery;

var User = models.User;

var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded());

var methodOverride = require('method-override');

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

var path = require('path');

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('view engine', 'jade');
app.set('views', './views');

app.use(session({secret: 'tacocat', cookie: {maxAge: 60000}}));

require('./app/auth.js')(app);

app.get('/login', function (req, res){
  res.render('login');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/', function (req, res){
  console.log(req.user);
  Gallery
    .findAll({order: 'id ASC'})
    .then(function(images){
      var topImg = images.shift();
      res.render('gallery', {
        username: req.user || null,
        topImg: topImg,
        images: images});
    });

});

app.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

app.use('/gallery', require('./routes/gallery'));

app.use('/new_photo', require('./routes/newphoto'));

var server = app.listen(config.port, displayServer);

function displayServer (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('buggah stay working at http://%s:%s', host, port);
}