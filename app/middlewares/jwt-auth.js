var passport = require('passport');
/**
 * jwt auth middleware
 */
exports.jwtAuthenticate = passport.authenticate('jwt', { session: false });