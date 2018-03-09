const router = require(__base + 'libs/route-group');

router.post('/login', controller('api/index', 'login'));

router.group(function (router) {
    // Make sure all routes in this group use authentication
    router.use(middleware('jwt-auth', 'jwtAuthenticate'));

    router.get('/user', controller('api/index', 'user'));
});



module.exports = router;