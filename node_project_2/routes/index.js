var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vincent\'s Blog Site', descirption: 'My Blog Site' });
});

module.exports = router;
