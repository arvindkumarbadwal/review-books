var path = require('path');
const { URL } = require('url');

global.requireController = global.controller = function(controllerName, functionName){
    
    if (functionName === undefined){
        return require(path.join(__base, 'app', 'controllers', controllerName));
    }

    return require(path.join(__base, 'app', 'controllers', controllerName))[functionName];
}

global.requireMiddleware = global.middleware = function (fileName, functionName) {

    if (functionName === undefined) {
        return require(path.join(__base, 'app', 'middlewares', fileName));
    }

    return require(path.join(__base, 'app', 'middlewares', fileName))[functionName];
}

global.requireModel = function (modelName) {
    return require(path.join(__base, 'app', 'models', modelName));
}

global.asset_url = function(fileName) {
    return new URL(fileName, __base_url).href;
}