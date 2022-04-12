const mongoose = require('mongoose');
const { use } = require('passport');

mongoose.connect('mongodb+srv://BayronAlarcon:Admin2022@cluster0.fdi9q.mongodb.net/tienda?retryWrites=true&w=majority')

    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

