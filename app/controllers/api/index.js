const jwt = require('jsonwebtoken');
const passport = require("passport");

exports.auth = passport.authenticate('jwt', { session: false });

exports.login = function (req, res) {
    passport.authenticate('user-local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json(info);
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            var payload = {
                user_id: user.id,
                user_email: user.email
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = 'Bearer '+jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
            
            return res.json({ user, token });
        });
    })(req, res);
}

exports.user = function (req, res) {
    res.send(req.user);
}