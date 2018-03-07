var express = require('express');
var router = express.Router();
var Skill = require('../model/skill');

// GET / All Skills
router.get('/all', function(req, res, next) {
  Skill.find({}, null, { sort: { rating: -1 } }, function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

// POST / New Skill Entry
router.post('/new', function(req, res, next) {
  console.log(req.body);
  Skill.create(
    {
      name: req.body.name,
      rating: req.body.rating,
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

// POST / Delete Skill
router.post('/delete::id', function(req, res, next) {
  Skill.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (!err) {
          res.send(true);
      } else {
          res.send(err);
      }
  });
});

// POST / Rename Skill
router.post('/rename::id', function(req, res, next) {
  Skill.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, function (err) {
      if (!err) {
          res.send(true);
      } else {
          res.send(err);
      }
  });
});

// POST / Rate Skill
router.post('/rate::id', function(req, res, next) {
  Skill.findOneAndUpdate({ _id: req.params.id }, { rating: req.body.rating }, function (err) {
      if (!err) {
          res.send(true);
      } else {
          res.send(err);
      }
  });
});


module.exports = router;