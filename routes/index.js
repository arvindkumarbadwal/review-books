const passport = require('passport');

//Middlewares
const auth = require('../middlewares/auth');

// Controllers
const HomeController = require('../controllers/home');
const userController = require('../controllers/user');
const contactController = require('../controllers/contact');

module.exports = router => {
    router.get('/', HomeController.index);
    router.get('/contact', contactController.contactGet);
    router.post('/contact', contactController.contactPost);
    router.get('/account', auth.ensureAuthenticated, userController.accountGet);
    router.put('/account', auth.ensureAuthenticated, userController.accountPut);
    router.delete('/account', auth.ensureAuthenticated, userController.accountDelete);
    router.get('/signup', userController.signupGet);
    router.post('/signup', userController.signupPost);
    router.get('/login', userController.loginGet);
    router.post('/login', userController.loginPost);
    router.get('/forgot', userController.forgotGet);
    router.post('/forgot', userController.forgotPost);
    router.get('/reset/:token', userController.resetGet);
    router.post('/reset/:token', userController.resetPost);
    router.get('/logout', userController.logout);
    router.get('/unlink/:provider', auth.ensureAuthenticated, userController.unlink);
    router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
    router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
    router.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
    router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
}