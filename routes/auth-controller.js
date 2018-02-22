var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 10);

  User.create(
    {
      email: req.body.email,
      password: hashedPassword,
    },
    function(err, user) {
        console.log(err);
      if (err)
        return res
          .status(500)
          .send('There was a problem registering the user.');

      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
      res.render('admin', { title: 'Dashboard' });
    }
  );
});

module.exports = router;
