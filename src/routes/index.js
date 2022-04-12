//url de mi pagina principal

const express = require('express');
const router = express.Router();

// visita la pagina inicial.
router.get('/', (req, res) => { 
    res.render('index');
    
});

router.get('/about',(req, res) => {
    res.render('about');
});

router.get('/hombre',(req, res) => {
    res.render('hombre');
});

router.get('/mujer',(req, res) => {
    res.render('mujer');
});

router.get('/nosotros',(req, res) => {
    res.render('nosotros');
});

router.get('/nike',(req, res) => {
    res.render('nike');
});

router.get('/adidas',(req, res) => {
    res.render('adidas');
});

router.get('/underarmour',(req, res) => {
    res.render('underarmour');
});




module.exports = router;