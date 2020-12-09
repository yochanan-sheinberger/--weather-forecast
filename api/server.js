const express = require('express');
const session = require('express-session');

const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

app.use(cors());
passport.use(new LocalStrategy(
  (username, password, done) => {
    if (username === 'admin' && password === 'admin') {
      return done(null, username);
    }
    return done('unauthorized access', false);
  },
));

passport.serializeUser((user, done) => {
  if (user) done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

app.use(session({ secret: 'anything', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

const auth = () => (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error) res.status(400).json({ statusCode: 200, message: error });
    // eslint-disable-next-line consistent-return
    req.login(user, (err) => {
      if (err) return next(err);
      console.log('nadav');
      next();
    });
  })(req, res, next);
};

app.get('/', (req, res) => {
  console.log('root');
  res.json('root');
});

app.post('/authenticate', auth(), (req, res) => {
  console.log('authentication attemp');
  res.status(200).json({ statusCode: 200, user: req.user });
});

const isLoggedIn = (req, res, next) => {
  console.log('session ', req.session);
  if (req.isAuthenticated()) {
    console.log('user ', req.session.passport.user);
    return next();
  }
  return res.status(400).json({ statusCode: 400, message: 'not authenticated' });
};

app.get('/getData', isLoggedIn, (req, res) => {
  console.log('get test');
  res.json('data is');
});

app.listen(3000, () => {
  console.log('App running at 3000');
});
