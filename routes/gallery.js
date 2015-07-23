var express = require('express');

var router = express.Router();

var models = require('../models');

var Gallery = models.Gallery;

module.exports = router;

router.use(function (req, res, next){
  next();
});

router.route('/')
  .get(function (req, res){
    Gallery
      .findAll()
      .then(function(image){
        res.render('gallery', {images: image});
      });
  })
  .post(function (req, res){
    Gallery
      .create({
        author: req.body.author,
        link: req.body.url,
        description: req.body.description
      })
      .then(function(){
        return res.redirect('/gallery');
      });
  });

router.route('/:id')
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
      return res.redirect('/gallery');
    });
  });