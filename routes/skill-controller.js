var express = require('express');
var router = express.Router();
var Skill = require('../model/skill');

// GET / All Skills
router.get('/all', function(req, res, next) {
  Skill.find({}, function(err, data) {
    if(!err) {
      res.send(data)
    } else {
      res.send(err)
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

// GET / Delete Project
router.get('/delete/:id', function(req, res, next) {
  Project.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (!err) {
          res.send(true);
      } else {
          res.send(err);
      }
  });
});

module.exports = router;