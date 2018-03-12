module.exports = router => {
    router.group('/admin', router => {
        router.get('/authors', controller('author', 'author_list'));
    })
}