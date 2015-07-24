var config = require('./config/config.json');

var express = require('express');
var app = express();

var models = require('./models');

var Gallery = models.Gallery;

var bodyParser = require('body-parser');

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

app.get('/', function (req, res){
  Gallery
    .findAll()
    .then(function(image){
      res.render('gallery', {images: image});
    });

});

app.get('/new_photo', function (req, res){
  res.render('new');
});

app.use('/gallery', require('./routes/gallery'));

var server = app.listen(config.port, displayServer);

function displayServer (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('buggah stay working at http://%s:%s', host, port);
}