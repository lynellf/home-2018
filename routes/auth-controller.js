var express = require('express');
var router = express.Router();
var User = require('../model/user');

// User registration
router.post('/register', (req, res, next) => {
    const userData = req.body;
    // Collect registration data and post to database
    User.create(userData, function (err) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('login', { title: 'Login' });
        }
    });
});

// POST / User login
router.post('/login', (req, res, next) => {
    var userData = req.body;
    console.log(userData);
    User.authenticate(userData, function(error, user, err) {
        if (err) {
            err = new Error('Wrong email or password');
            err.status = 401;
            return next(err);
        } else {
            console.log(user);
            req.session.userId = user._id;
            res.render('index', { title: 'Dashboard' });
        }
    });
});

// GET / Logout
router.get('/logout', function(req, res, next) {
    console.log(req.session);
    if (req.session) {
    // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                res.render('login', { title: 'Login' });
            }
        });
    }
});

module.exports = router;
