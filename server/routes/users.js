var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  if (req.body.email === 'qaz' && req.body.password === 'qaz') {
    res.send({user: {name: 'Ann', email: 'qaz'}});
  } else {
    res.send({error: 'Wrong name or password'})
  }
});

module.exports = router;
