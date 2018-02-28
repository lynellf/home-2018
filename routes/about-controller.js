var express = require('express');
var router = express.Router();
var About = require('../model/about');

// GET / About

router.get('/', function(req, res, next) {
  About.find({}, function(err, data) {
    console.log(data);
    if(!err) {
      res.send(data)
    } else {
      res.send(err);
    }
  });
});

// POST / Update about 

router.post('/update', function(req, res, next) {
  About.findOneAndUpdate({}, { post: req.body.post }, { upsert: true }, function(err) {
    if (!err) {
      res.send(true)
    } else {
      res.send(err);
    }
  });
});

module.exports = router;