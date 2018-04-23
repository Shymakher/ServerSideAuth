const Authentication = require('./controllers/authentication');
const passsportService = require('./services/passport');
const passport = require('passport');

const reqiureAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function (app) {
    app.get('/', reqiureAuth,function (req, res, next) {
        res.send(['1', '2', '3']);
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
};