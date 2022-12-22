var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//come back to this for session
router.get("/check-session", (req, res, next) => {
  if (req.session.user) {
    res.send({ session: true, user: req.session.user });
  }
  res.send({ session: false, user: null });
});

module.exports = router;
