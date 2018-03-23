var mongoose = require('mongoose');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var adminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    gender: String,
    picture: String
}, schemaOptions);

adminSchema.pre('save', function (next) {
    var admin = this;
    if (!admin.isModified('password')) { return next(); }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(admin.password, salt, null, function (err, hash) {
            admin.password = hash;
            next();
        });
    });
});

adminSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        cb(err, isMatch);
    });
};

adminSchema.virtual('gravatar').get(function () {
    if (!this.get('email')) {
        return 'https://gravatar.com/avatar/?s=200&d=retro';
    }
    var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
});

adminSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.password;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
    }
};

module.exports = mongoose.model('admin', adminSchema);
