var express = require('express');
var multer = require('multer');
var router = express.Router();
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

/* GET users listing. */
router.post('/upload', upload.array('file', 10),
function(req, res, next) {
    console.log(req.body);
    res.render('files', { title: 'File Manager', active: 'File Manager' })
  });
  
  module.exports = router;