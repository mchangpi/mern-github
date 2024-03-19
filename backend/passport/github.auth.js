import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/user.model.js';

dotenv.config();

/* https://github.com/cfsghost/passport-github/blob/master/examples/login/app.js */
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        'https://mern-github-9zwl.onrender.com/api/auth/github/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      // console.log('github strategy profile', profile);
      const user = await User.findOne({ username: profile.username });
      if (!user) {
        // signup
        const newUser = new User({
          name: profile.displayName,
          username: profile.username,
          profileUrl: profile.profileUrl,
          avatarUrl: profile.photos[0].value,
          likedProfiles: [],
          likedBy: [],
        });
        await newUser.save();
        done(null, newUser);
      } else {
        // signin
        console.log(user.username + ' login');
        done(null, user);
      }
    }
  )
);
