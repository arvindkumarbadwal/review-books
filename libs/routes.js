const fs = require('fs');
const path = require('path');
const express = require('express');
const router = require(__base + 'libs/route-group');

fs.readdir('./routes', (err, files) => {
    files.forEach(filename => {
        var stats = fs.statSync('./routes/' + filename);
        if (stats.isFile()) {
            require('../routes/' + filename)(router);
        }
    });
});

module.exports = router;