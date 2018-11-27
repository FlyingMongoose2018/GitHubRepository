var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const User = require('../models/user.js');


router.get('/ResetPassword', function (req, res) {
    if (req.session.user) {
        res.render('ChangePassword', {
            pageTitle: "Change Password",
            pageID: "Change Password Page",
            Location: "../",
            ConfirmOldPassword: 'True',
            error: ""
        });
    } else {
        res.redirect('login');
    }
});

router.post('/ResetPassword', function (req, res) {
    //test queries for reset password

    if ((req.body.password_1 != req.body.password_2)) {
        res.render('ChangePassword', {
            pageTitle: "Change Password",
            pageID: "Change Password Page",
            Location: "../",
            ConfirmOldPassword: 'True',
            error: '*Passwords do not match*'
        });
    } else {
        //validate old password
        User.findOneAndUpdate({
            username: req.session.user,
            password: req.body.password
        }, {
            password: req.body.password_1
        }, function (err, doc) {
            if (err) throw err;
            console.log(doc);
            if (doc == null || doc.length == 0) {
                res.render('ChangePassword', {
                    pageTitle: "Change Password",
                    pageID: "Change Password Page",
                    Location: "../",
                    ConfirmOldPassword: 'True',
                    error: '*Current password does not match*'
                });
            } else {
                res.redirect('/');

            }
        })

    }

});


module.exports = router;
