var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config');
var router = express.Router();

router.get('/', function(req, res) {
    console.log(req.headers);
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });

    res
      .status(200)
      .render('admin', { title: 'Dashboard' });
  });
});

module.exports = router;
