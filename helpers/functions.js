var path = require('path');

global.controller = function(controllerName, functionName){
    return require(path.join(__base, 'controllers', controllerName))[functionName];
}

global.middleware = function (fileName, functionName) {
    return require(path.join(__base, 'middlewares', fileName))[functionName];
}