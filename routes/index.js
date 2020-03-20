var express = require('express');
var router = express.Router();


// *** GET all clothing *** //
router.get('/clothing', function(req, res, next) {
  res.send('send clothing back');
});


module.exports = router;

