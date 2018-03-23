module.exports = router => {
    router.group('/admin', router => {
        router.get('/', controller('admin/index', 'index'));
        router.get('/login', controller('admin/index', 'loginGet'));
        router.post('/login', controller('admin/index', 'loginPost'));
        router.get('/dashboard', controller('admin/index', 'dashboard'));
    })
}