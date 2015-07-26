var express = require('express');

var router = express.Router();

var models = require('../models');

var Gallery = models.Gallery;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = router;

router.use(function (req, res, next){
  next();
});

router.route('/')
  .post(function (req, res){
    Gallery
      .create({
        author: req.body.author,
        link: req.body.url,
        description: req.body.description
      })
      .then(function(){
        return res.redirect('/');
      });
  });

router.route('/:id')
  .get(function (req, res){
    var id = req.params.id;
    Gallery
      .findOne({
        where: {'id': id}
      })
    .then(function(single){
      Gallery.findAll()
        .then(function(images){
          var sideImages = [];
          for (var i = 0; i < 3; i++){
            var num = Math.floor(Math.random() * images.length);
            sideImages.push(images[num]);
          }
          res.render('single', {
            single: single,
            sideImages: sideImages});
        });
    });
  })
  .put(function (req, res){
    var id = req.params.id;
    Gallery
    .findOne({
      where: {'id': id}
    })
    .then(function (image){
      image.updateAttributes({
        author: req.body.author,
        link: req.body.url,
        description: req.body.description
      });
    })
    .then(function (){
      return res.redirect('/');
    });
  })
  .delete(function (req, res){
    var id = req.params.id;
    Gallery
      .findOne({
        where: {'id': id}
      })
      .then(function (image){
        image.destroy({ force: true});
      })
      .then(function(){
        return res.redirect('/');
      });
  });

router.route('/:id/edit')
  .get(isAuthenticated)
  .get(function (req, res){
    var id = req.params.id;
    Gallery
      .findOne({
        where: {'id': id}
      })
      .then(function (image){
        res.render('edit',
          {
            author: image.author,
            link: image.link,
            caption: image.description,
            id: id
          });
      });
  });

function isAuthenticated (req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}