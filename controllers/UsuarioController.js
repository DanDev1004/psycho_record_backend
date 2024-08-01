import Usuario from "../models/UsuarioModel.js";
import Rol from "../models/RolModel.js";
import argon2 from "argon2";

export const obtenerTodos = async(req, res) => {
    try {
        const response = await Usuario.findAll({
            attributes: ['ID_USUARIO','DNI_USUARIO', 'NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'USERNAME','EMAIL', 'ID_ROL'],
            include: [{
                model: Rol,
                attributes: ['NOMBRE_ROL']
            }] 
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async(req, res) => {
    try {
        const response = await Usuario.findOne({
            attributes: ['ID_USUARIO','DNI_USUARIO', 'NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'USERNAME','EMAIL', 'ID_ROL'],
            where: {
                ID_USUARIO: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async(req, res) => {
    const { DNI_USUARIO, NOMBRE_USUARIO, APELLIDO_USUARIO, USERNAME, EMAIL, USER_PASSWORD, CONF_USER_PASSWORD, ID_ROL } = req.body;

    if (USER_PASSWORD !== CONF_USER_PASSWORD){
         return res.status(400).json({ msg: "la contraseña no coincide con la confirmación" });
    }

    const hashPassword = await argon2.hash(USER_PASSWORD);
    try {
        await Usuario.create({
            DNI_USUARIO: DNI_USUARIO,
            NOMBRE_USUARIO: NOMBRE_USUARIO,
            APELLIDO_USUARIO: APELLIDO_USUARIO,
            USERNAME: USERNAME,
            EMAIL: EMAIL,
            USER_PASSWORD: hashPassword,
            ID_ROL: ID_ROL
        });
        res.status(201).json({ msg: "Usuario creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async(req, res) => {
    const user = await Usuario.findOne({
        where: {
            ID_USUARIO: req.params.id
        }
    });
    if (!user){
     return res.status(404).json({ msg: "Usuario no encontrado" });
    }
     const { DNI_USUARIO, NOMBRE_USUARIO, APELLIDO_USUARIO, USERNAME, EMAIL, USER_PASSWORD, CONF_USER_PASSWORD, ID_ROL } = req.body;

    let hashPassword;
    
    if (USER_PASSWORD === "" || USER_PASSWORD === null) {
        hashPassword = user.USER_PASSWORD;
    } else {
        hashPassword = await argon2.hash(USER_PASSWORD);
    }
    if (USER_PASSWORD !== CONF_USER_PASSWORD){
         return res.status(400).json({ msg: "la contraseña no coincide con la confirmación" });
    }
    try {
        await Usuario.update({
            DNI_USUARIO: DNI_USUARIO,
            NOMBRE_USUARIO: NOMBRE_USUARIO,
            APELLIDO_USUARIO: APELLIDO_USUARIO,
            USERNAME: USERNAME,
            EMAIL: EMAIL,
            USER_PASSWORD: hashPassword,
            ID_ROL: ID_ROL
        }, {
            where: {
                ID_USUARIO: user.ID_USUARIO
            }
        });
        res.status(200).json({ msg: "Usuario actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async(req, res) => {
    const user = await Usuario.findOne({
        where: {
            ID_USUARIO: req.params.id
        }
    });
    if (!user){
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }   
    try {
        await Usuario.destroy({
            where: {
                ID_USUARIO: user.ID_USUARIO
            }
        });
        res.status(200).json({ msg: "Usuario eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
