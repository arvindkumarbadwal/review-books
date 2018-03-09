var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var { platform } = require(__base+'config/route.json');

fs.readdir('./routes', (err, files) => {
    files.forEach(filename => {
        var stats = fs.statSync('./routes/' + filename);
        if (stats.isFile()) {
            router.use('/', require('../routes/' + filename));
        }
    });
});

if (platform !== undefined){
    platform.forEach(option => {
        var routeDir = path.join(__base, 'routes', option.folder);
        fs.readdir(routeDir, (err, files) => {
            if (files !== undefined) {
                files.forEach(filename => {
                    var stats = fs.statSync(path.join(routeDir, filename));
                    if (stats.isFile()) {
                        router.use(option.prefix, require(path.join(routeDir, filename)));
                    }
                });
            }
        });    
    });
}


module.exports = router;