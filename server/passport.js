const session = require('express-session');
const passport = require('passport')
const cookieParser = require('cookie-parser')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

module.exports = (app) => {
  app.use(cookieParser());
  app.use(session({ secret: "test", resave: true, saveUninitialized: true, }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {  done(null, user); });
  passport.deserializeUser((user, done) => { done(null, user); });
  
  passport.use('local', new LocalStrategy(
    {
      usernameField: 'Email',
      passwordField: 'Password',
    },
    async (email, password, done) => {
      const correct = await User.IsSignInCorrect(email, password)
      if (!correct) 
        return done(null, false, { message: 'Invalid password' })
      else if (correct)
        return done(null, email);
      else
        return done(null, false, { message: 'Login Error' })
    })
  )
  return passport
}