var express = require('express');
var router = express.Router();

/* GET About page. */
router.get('/', function(req, res, next) {
  res.render('About', { title: 'Vincent\'s Blog Site', description: 'About Page' });
});

module.exports = router;
