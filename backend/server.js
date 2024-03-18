import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import './passport/github.auth.js';

import { URL } from 'url';
import userRoutes from './routes/user.route.js';
import exploreRoutes from './routes/explore.route.js';
import authRoutes from './routes/auth.route.js';

import connectMongoDB from './db/connectMongoDB.js';

/* https://byby.dev/node-dirname-not-defined */
const __dirname = new URL('.', import.meta.url).pathname;
// console.log('__dirname', __dirname);

dotenv.config();
// console.log('env', process.env.GITHUB_API_KEY);

const app = express();

/* https://github.com/cfsghost/passport-github/blob/master/examples/login/app.js */
app.use(
  session({ secret: 'keyboard cat', resave: false, saveUninitialized: false })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/explore', exploreRoutes);

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
  connectMongoDB();
});
