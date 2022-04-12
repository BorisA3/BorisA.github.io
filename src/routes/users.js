// url para autentificar, ingresar a la aplicacion
const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

const User = require('../models/User');

const {isAuthenticated } = require('../helpers/auth');
const passport = require('passport');

router.get('/users/signin', (req,res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',    
    failureFlash: true

}));

router.get('/users/signup', (req,res) => {
    res.render('users/signup');
});

router.post('/users/signup',async (req, res) => {
    const {name, email, password, confirm_password} = req.body;
   const errors = [];
    if(password != confirm_password) {
        errors.push({text: 'Contraseñas no coinciden'});
    }

    if(password.length < 4) {
        errors.push({text: 'La contraseña debe de ser mayor a 4 caracteres'});
    }

    if(errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }

    else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'Ya existe una cuenta con este email.');
            res.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Usuario Registrado');
        res.redirect('/users/signin');
    }
});

router.get('/users', isAuthenticated, async (req, res) => {
    const users = await User.find({}).lean().sort ({date: 'desc'});
        res.render('users', { users });
});


router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.delete('/users/delete/:id', isAuthenticated, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Usuario Eliminada');
    res.redirect('/users');

}); 


module.exports = router;