const jwt = require('jwt-simple');
const User = require('../modules/user');
const config = require('../config');

function tokenForUser(user) {
  //USER ID + OUR SECRET STRING = JSON WEB TOKEN
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id , iat: timestamp}, config.secret);
}

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(422).send({error: 'You must provide email and password'});
  }

//  See if a user with a given email exists
//  User - the collection of all users that are exist in DB
  User.findOne({email: email}, function (err, existingUser) {
    if(err) {return next(err)}

    // If a user with email does exist, return an error
    if(existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }

// If a user with email does NOT exist, create and save user record
//  creating user
    const user = new User({
      email: email,
      password: password
    });
    //saving user to DB
    user.save(function (err) {
      if(err) {return next(err)}
    });

// Respond to request indicating the user was created
    res.json({token: tokenForUser(user)});
  });
}