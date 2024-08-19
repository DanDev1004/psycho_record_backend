import Usuario from "../models/UsuarioModel.js";
import Rol from "../models/RolModel.js";
import argon2 from "argon2";

export const Login = async (req, res) =>{
    const user = await Usuario.findOne({
        where: {
            EMAIL: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario no encontrado"});
    const verificarContrasenia = await argon2.verify(user.USER_PASSWORD, req.body.password);
    if(!verificarContrasenia){
        return res.status(400).json({msg: "Contraseña errónea"});
    }
    
    req.session.userId = user.ID_USUARIO;
    req.session.role = user.ID_ROL;
    const ID_USUARIO = user.ID_USUARIO;
    const DNI_USUARIO = user.DNI_USUARIO;
    const NOMBRE_USUARIO = user.NOMBRE_USUARIO;
    const APELLIDO_USUARIO = user.APELLIDO_USUARIO;
    const USERNAME = user.USERNAME;
    const EMAIL = user.EMAIL;
    const ID_ROL = user.ID_ROL;
    res.status(200).json({ID_USUARIO, DNI_USUARIO, NOMBRE_USUARIO, APELLIDO_USUARIO,USERNAME,EMAIL,ID_ROL});
}

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Ingrese a su cuenta"});
    }
    const user = await Usuario.findOne({
        attributes:['ID_USUARIO','DNI_USUARIO','NOMBRE_USUARIO','APELLIDO_USUARIO','USERNAME','EMAIL','ID_ROL'],
        include: [
            {
                model: Rol,
                attributes: ['NOMBRE_ROL']
            }
        ],
        where: {
            ID_USUARIO: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario no encontrado"});
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "No puedo cerrar sesión"});
        res.status(200).json({msg: "Has cerrado sesión"});
    });
}