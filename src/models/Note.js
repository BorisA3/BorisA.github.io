const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortid = require("shortid");
const slug = require("slug");

//const Note = require('../models/Note');
const NoteSchema = new Schema({
    title: {type: String, require: true},
    description: {type: String, required: true},/* 
    imagen: String, url:  {type: String,lowercase: true}, */
    date: { type: Date, default: Date.now}
});

NoteSchema.pre("save", function (next) {
    // Crear la URL
    const url = slug(this.title);
    this.url = `${url}-${shortid.generate()}`;
  
    next();
  });

  NoteSchema.index({ title: "text" }); 
module.exports = mongoose.model('Note', NoteSchema)