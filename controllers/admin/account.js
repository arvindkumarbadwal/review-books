var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var Admin = require(__base+'models/admin');

/**
 * GET /login
 */
exports.loginGet = function (req, res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('admin/account/login', {
        title: 'Administrator Log In'
    });
};

/**
 * POST /login
 */
exports.loginPost = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    var errors = req.validationErrors();

    if (errors) {
        req.flash('error', errors);
        return res.redirect('/admin/login');
    }

    passport.authenticate('admin-local', function (err, user, info) {
        if (!user) {
            req.flash('error', info);
            return res.redirect('/admin/login')
        }
        req.logIn(user, function (err) {
            res.redirect('/admin/dashboard');
        });
    })(req, res, next);
};

/**
 * GET /logout
 */
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/admin/login');
};

exports.dashboard = function(req, res) {
    
}