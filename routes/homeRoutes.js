const express     = require('express');
const router      = express.Router();
const passport    = require('passport');

router.get('/', (req, res) => {
  res.render('login', { title: "Log In", alert: req.query.alert })
})

// checks username and password using passport
router.post('/', passport.authenticate('local',
  { failureRedirect: '/?alert=error' }),
  (req, res) => {
      req.session.user = req.user
      res.redirect('/dashboard');
})

module.exports = router;