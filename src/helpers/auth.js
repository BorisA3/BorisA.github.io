const { redirect } = require("express/lib/response");

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'No autorizado');
    res.redirect('/users/signin');
};


exports.usuarioInfo = (req) => {
    const usuario = [];
    console.log(req.user);
  
      const login = true;
      const _id = req.user._id;
      const name = req.user.name;
      const email = req.user.email;      
      
  
    usuario.push({
      _id, name, email});
  
    return usuario;
  
  };

module.exports = helpers;