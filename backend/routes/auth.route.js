import express from 'express';
import passport from 'passport';

const router = express.Router();

/* https://github.com/cfsghost/passport-github/blob/master/examples/login/app.js */
// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: process.env.CLIENT_BASE_URL + '/login',
  }),
  function (req, res) {
    res.redirect(process.env.CLIENT_BASE_URL);
  }
);

router.get('/check', function (req, res) {
  if (req.isAuthenticated()) {
    res.send({ user: req.user });
  } else {
    res.send({ user: null });
  }
});

router.get('/logout', function (req, res) {
  req.session.destroy((err) => {
    res.json({ message: 'Logged out' });
  });
});

/*
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: process.env.CLIENT_BASE_URL + '/login',
  }),
  function (req, res) {
    res.redirect(process.env.CLIENT_BASE_URL);
  }
);

router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ user: req.user });
  } else {
    res.send({ user: null });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.json({ message: 'Logged out' });
  });
});
*/
export default router;
