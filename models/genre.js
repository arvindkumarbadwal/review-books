var mongoose = require('mongoose')

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var genreSchema = new mongoose.Schema({
    'name': { type: String, required: true, min: 3, max: 100 }
})

// Virtual for genreSchema's URL
genreSchema
    .virtual('url')
    .get(function () {
        return '/catalog/genre/' + this._id;
    });

//Export model
module.exports = mongoose.model('Genre', genreSchema);