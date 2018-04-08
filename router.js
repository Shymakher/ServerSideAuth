const Authentication = require('./controllers/authentication');

module.exports = function (app) {
    // app.get('/', function (req, res, next) {
    //     res.send(['1', '2', '3']);
    // });

    app.post('/signup', Authentication.signup);
};