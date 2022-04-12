//url para CRUD de notas
const { Router } = require('express');
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();   
const multer = require('multer');
const shortid = require("shortid");
const slug = require("slug");

const Note = require('../models/Note');
const {isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', (req, res) =>  {
    res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
     const {title, description }= req.body;
     const errors = [];
     if(!title) {
        errors.push({text: 'Titulo Vacio'});
     }
     if(!description) {
        errors.push({text: 'Descipcion Vacia'});
     }
     if(errors.length > 0) {
         res.render('notes/new-note' , {
             errors,
             title,
             description
            
         });
        } else {
/* 
            upload(req, res, function (error) {
                console.log(req.body);
                if (error) {
                  // Errores de Multer
                  if (error instanceof multer.MulterError) {
                    if (error.code === "LIMIT_FILE_SIZE") {
                      req.flash("messages", [
                        {
                          message:
                            "El tamaño del archivo es superior al límite. Máximo 100Mb",
                          alertType: "danger",
                        },
                      ]);
                    } else {
                      req.flash("messages", [
                        { message: error.message, alertType: "danger" },
                      ]);
                    }
                  } else {
                    // Errores creado por el usuario
                    req.flash("messages", [
                      { message: error.message, alertType: "danger" },
                    ]);
                  }
                  // Redireccionar y mostrar el error
                  res.redirect("/");
                  return;
                } else {
                  // Archivo cargado correctamente
                  res.redirect('/notes');
                }
              }); */

              const newNote = new Note ({ title, description});
              await newNote.save();
              req.flash('success_msg', 'Sugerencia agregada');
              res.redirect('/notes');
         }
         
});
/* 
const configuracionMulter = {
    // Tamaño máximo del archivo en bytes
    limits: {
      fileSize: 100000000,
    },
    // Dónde se almacena el archivo
    storage: (fileStorage = multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, `${__dirname}../../public/uploads/img`);
      },
      filename: (req, file, cb) => {
        // Construir el nombre del archivo
        // iphone.png --> image/png --> ["image", "png"]
        // iphone.jpg --> image/jpeg
        const extension = file.mimetype.split("/")[1];
        cb(null, `${shortid.generate()}.${extension}`);
      },
    })),
    // Verificar el tipo de archivo mediante el mime type
    // https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/MIME_types
   
  };
  const upload = multer(configuracionMulter).single("image");  */

router.get('/notes', async (req, res) => {
    const notes = await Note.find({}).lean().sort ({date: 'desc'});
        res.render('notes/all-notes', { notes });
});


router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description});
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota Eliminada');
    res.redirect('/notes');

}); 




module.exports = router;