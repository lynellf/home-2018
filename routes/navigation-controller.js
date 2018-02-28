var express = require('express');
var router = express.Router();
var Navigation = require('../model/navigation');

// GET / All Navigations
router.get('/all', function(req, res, next) {
  Navigation.find({}, function(err, data) {
    if(!err) {
      res.send(data)
    } else {
      res.send(err)
    }
  });
});

// POST / New Navigation Entry
router.post('/new', function(req, res, next) {
  console.log(req.body);
  Navigation.create(
    {
      name: req.body.name,
      url: req.body.url,
    },
    function(err) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.send(true);
      }
    }
  );
});

// POST / Delete Navigation
router.post('/delete::id', function(req, res, next) {
  Navigation.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (!err) {
          res.send(true);
      } else {
          res.send(err);
      }
  });
});

// POST / Rename Navigation
router.post('/rename::id', function(req, res, next) {
  Navigation.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, function (err) {
      if (!err) {
          res.send(true);
      } else {
          res.send(err);
      }
  });
});

// POST / Change URL
router.post('/url::id', function(req, res, next) {
  Navigation.findOneAndUpdate({ _id: req.params.id }, { url: req.body.url }, function (err) {
      if (!err) {
          res.send(true);
      } else {
          res.send(err);
      }
  });
});

module.exports = router;