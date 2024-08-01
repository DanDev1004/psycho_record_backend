import Usuario from "../models/UsuarioModel.js";

export const verificarUsuarioLogeado = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Ingrese a su cuenta"});
    }
    const user = await Usuario.findOne({
        where: {
            ID_USUARIO: req.session.userId
        }
    });
    if(!user) {
        return res.status(404).json({msg: "Usuario no encontrado"});
    }
   req.userId = Usuario.ID_USUARIO;
   req.role = Usuario.ID_ROL; 
    next();
}

export const adminPermiso = async (req, res, next) =>{
    const user = await Usuario.findOne({
        where: {
            ID_USUARIO: req.session.userId
        }
    });
    if(!user){
         return res.status(404).json({msg: "Usuario no encontrado"});
    }
    if(user.ID_ROL !== 1){
        return res.status(403).json({msg: "Acceso prohibido"});
    }
    next();
}
