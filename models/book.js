var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var bookSchema = new mongoose.Schema({
        title: { type: String, required: true },
        author: { type: mongoose.Schema.ObjectId, ref: 'Author', required: true },
        summary: { type: String, required: true },
        isbn: { type: String, required: true },
        genre: [{ type: mongoose.Schema.ObjectId, ref: 'Genre' }]
    }, schemaOptions);

// Virtual for book's URL
bookSchema
    .virtual('url')
    .get(function () {
        return '/book/' + this._id;
    });

//Export model
module.exports = mongoose.model('Book', bookSchema);