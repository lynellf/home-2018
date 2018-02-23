var collection = require('mongoose'),
    bcrypt = require('bcrypt'),
  User = new collection.Schema({
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  });


// User authentication
User.statics.authenticate = function(userData, callback) {
    User.findOne({ email: userData.email })
        .exec(function (error, user) {
            if (error) {
                return callback(error);
            } else if ( !user ) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(userData.password, user.password , function(error, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        });
};

// Hash password before saving to database
User.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

var User = collection.model('User', User);
module.exports = User;
