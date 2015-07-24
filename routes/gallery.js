var express = require('express');

var router = express.Router();

var models = require('../models');

var Gallery = models.Gallery;

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
    .then(function(image){
      res.render('single', {image: image.link, caption: image.description});
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
