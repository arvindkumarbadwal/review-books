var express = require('express');
var router = express.Router();

router.get('/authors', controller('author', 'author_list'));

module.exports = router;