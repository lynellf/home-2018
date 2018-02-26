var express = require('express');
var multer = require('multer');
var fs = require('fs');
var dir = './public/uploads';
var router = express.Router();
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post('/upload', upload.array('file', 10), function(req, res, next) {
  console.log(req.body);
  res.render('files', { title: 'File Manager', active: 'File Manager' });
});

// GET Files

router.get('/list', function(req, res, next) {
  // List files in directory. Runs in async, requires
  // promise to remain in sync.

  var listFiles = function() {
    return new Promise(function(resolve, reject) {
      fs.readdir(dir, function(err, items) {
        err ? reject(err) : resolve(items);
      });
    });
  };

  listFiles().then(function(result) {
    var data = {
      files: result,
    };
    res.send(data),
      function(err) {
        res.send(err);
      };
  });
});

// GET / Delete File

router.get('/delete::name', function(req, res, next) {

  var deleteFile = function(fileName) {
    return new Promise(function(resolve, reject) {
      fs.unlink(dir + '/' + fileName, function(err) {
        err ? reject(err) : resolve(fileName);
      });
    });
  };

  deleteFile(req.params.name).then(function(result) {
      res.send(true),
        function(err) {
            res.send(err);
        };
  });
});

// POST / Rename File

router.post('/rename', function(req, res, next) {
    var renameFile = function(oldName, newName) {
        return new Promise(function(resolve, reject) {
            fs.rename(
              dir + '/' + oldName,
              dir + '/' + newName,
              function(err) {
                err ? reject(err) : resolve(newName);
              }
            );
        });
    };

    renameFile(req.body.oldName, req.body.newName).then(function(result) {
        res.send(true),
        function(err) {
            res.send(err);
        };
    });
});

module.exports = router;
