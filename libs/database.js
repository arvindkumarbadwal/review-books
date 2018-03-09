//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect(process.env.MONGODB).then(
    () => {
        console.log('ready to use mongoose');
    },
    err => {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
        process.exit(1);
    }
);
mongoose.set({"debug":true});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;