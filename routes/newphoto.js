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
  .get(isAuthenticated)
  .get(function (req, res){
    return res.render('new');
  });

function isAuthenticated (req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}