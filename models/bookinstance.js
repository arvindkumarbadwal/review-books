var mongoose = require('mongoose');
var moment = require('moment');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var bookInstanceSchema = new mongoose.Schema({
        book: { type: mongoose.Schema.ObjectId, ref: 'Book', required: true }, //reference to the associated book
        imprint: { type: String, required: true },
        status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance' },
        due_back: { type: Date, default: Date.now }
    }, schemaOptions);

// Virtual for bookinstance's URL
bookInstanceSchema
    .virtual('url')
    .get(function () {
        return '/bookinstance/' + this._id;
    });


bookInstanceSchema
    .virtual('due_back_formatted')
    .get(function () {
        return moment(this.due_back).format('MMMM Do, YYYY');
    });

//Export model
module.exports = mongoose.model('BookInstance', bookInstanceSchema);