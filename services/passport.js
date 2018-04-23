const User = require('../modules/user');
const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
//  Verify this email and password, call done with the user
//  if it is the correct email and password
//  otherwise, call done with false
  User.findOne({email: email}, function (err, user) {
    if(err) {return done(err);}
    if(!user) {return done(null, false);}

  //  compare passwords - is 'password' equal to user.password ?
  user.comparePassword(password, function (err, isMatch) {
    if (err) {return done(err);}
    if (!isMatch) {return done(null, false)}

    return done(null, user);
  })
  });
});

//Setup options for JWT Strategy
const jwtOptions = {
  //find a token in header with name 'authorization'
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT Strategy
//JSON WEB TOKEN + OUR SECRET STRING = USER ID
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
//  See if user ID in the payload exist in our database
//  If it does,  call 'done'  with that user object
//  otherwise, call done without a user object
//  payload - decoded jwt
  User.findById(payload.sub, function (err, user) {
    if(err){return done(err, false);}

    if(user){
      done(null, user);
    }else{
      done(null, false);
    }
  });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);