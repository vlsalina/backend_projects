var express = require('express');
var router = express.Router();

/* GET create page. */
router.get('/create', function(req, res, next) {
  res.render('create', { 
    title: 'Vincent\'s Blog Site',
    description: 'Create a blog' 
  });
});

module.exports = router;
