const User = require('../modules/user');
const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Setup options for JWT Strategy
const jwtOptions = {};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
//  See if user ID in the payload exist in our database
//  If it does,  call 'done'  with that user object
//  otherwise, call done without a user object
  User.findById(payload.sub, function (err, user) {
    if(err){return done(err, false);}

    if(user){
      done(null, user);
    }else{
      done(null, false);
    }
  });
});