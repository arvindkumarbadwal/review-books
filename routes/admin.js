module.exports = router => {
    router.group('/admin', router => {
        router.get('/login', controller('admin/account', 'loginGet'));
        router.post('/login', controller('admin/account', 'loginPost'));
    })
}