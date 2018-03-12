module.exports = router => { 
    router.group('/api/v1', router => {
        router.post('/login', controller('api/index', 'login'));
    
        router.group(router => {
            // use authentication
            router.use(middleware('jwt-auth', 'jwtAuthenticate'));
    
            router.get('/user', controller('api/index', 'user'));
        });
    });
};