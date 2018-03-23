var mongoose = require('mongoose');
var moment = require('moment');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var authorSchema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 100 },
    family_name: { type: String, required: true, max: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
}, schemaOptions);

// Virtual for author's full name
authorSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

// Virtual for author's URL
authorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

// Virtual for author's Life Span
authorSchema
    .virtual('lifespan')
    .get(function () {
        return moment(this.date_of_birth).format('MMMM Do, YYYY') + ' - ' + moment(this.date_of_death).format('MMMM Do, YYYY');
    });

//Export model
module.exports = mongoose.model('Author', authorSchema);
