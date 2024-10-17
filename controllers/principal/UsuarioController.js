import Usuario from "../../models/principal/UsuarioModel.js";
import Rol from "../../models/mantenimiento/RolMoldel.js";
import argon2 from "argon2";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Usuario.findAll({
            attributes: ['ID_USUARIO', 'DNI_USUARIO', 'NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'USERNAME', 'TELEFONO', 'EMAIL', 'ID_ROL', 'ESTADO'],
            where: { ESTADO: true },
            include: [
                {
                    model: Rol,
                    attributes: ['NOMBRE_ROL']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const obtenerPorId = async (req, res) => {
    try {
        const response = await Usuario.findOne({
            attributes: ['ID_USUARIO', 'DNI_USUARIO', 'NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'USERNAME', 'TELEFONO', 'EMAIL', 'ID_ROL', 'ESTADO'],
            where: {
                ID_USUARIO: req.params.id,
                ESTADO: true
            },
            include: [
                {
                    model: Rol,
                    attributes: ['NOMBRE_ROL']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const buscar = async (req, res) => {
    try {
        const { searchText } = req.body;
        const response = await Usuario.findAll({
            attributes: ['ID_USUARIO', 'DNI_USUARIO', 'NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'USERNAME', 'TELEFONO', 'EMAIL', 'ID_ROL', 'ESTADO'],
            include: [
                {
                    model: Rol,
                    attributes: ['NOMBRE_ROL']
                }
            ],
            where: {
                ID_USUARIO: {
                    [Op.ne]: req.session.userId
                },
                ESTADO: true,
                [Op.or]: [
                    { DNI_USUARIO: { [Op.like]: `%${searchText}%` } },
                    { NOMBRE_USUARIO: { [Op.like]: `%${searchText}%` } },
                    { APELLIDO_USUARIO: { [Op.like]: `%${searchText}%` } },
                    { USERNAME: { [Op.like]: `%${searchText}%` } }
                ]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const crear = async (req, res) => {
    const {
        DNI_USUARIO,
        NOMBRE_USUARIO,
        APELLIDO_USUARIO,
        USERNAME,
        TELEFONO,
        EMAIL,
        PASSWORD_USER,
        CONFIRM_PASSWORD_USER,
        ID_ROL
    } = req.body;

    if (PASSWORD_USER !== CONFIRM_PASSWORD_USER) {
        return res.status(400).json({ msg: "La contraseña no coincide con la confirmación" });
    }

    try {
        const existeDNI = await Usuario.findOne({
            where: { DNI_USUARIO: DNI_USUARIO, ESTADO: true }
        });
        if (existeDNI) {
            return res.status(400).json({ msg: "El DNI ya está en uso" });
        }

        const existeUsername = await Usuario.findOne({
            where: { USERNAME: USERNAME, ESTADO: true }
        });
        if (existeUsername) {
            return res.status(400).json({ msg: "El nombre de usuario ya está en uso" });
        }

        const existeEmail = await Usuario.findOne({
            where: { EMAIL: EMAIL, ESTADO: true }
        });
        if (existeEmail) {
            return res.status(400).json({ msg: "El email ya está en uso" });
        }

        const existeTelefono = await Usuario.findOne({
            where: { TELEFONO: TELEFONO, ESTADO: true }
        });
        if (existeTelefono) {
            return res.status(400).json({ msg: "El teléfono ya está en uso" });
        }

        const hashPassword = await argon2.hash(PASSWORD_USER);
        await Usuario.create({
            DNI_USUARIO: DNI_USUARIO,
            NOMBRE_USUARIO: NOMBRE_USUARIO,
            APELLIDO_USUARIO: APELLIDO_USUARIO,
            USERNAME: USERNAME,
            TELEFONO: TELEFONO,
            EMAIL: EMAIL,
            PASSWORD_USER: hashPassword,
            ID_ROL: ID_ROL
        });

        res.status(201).json({ msg: "Usuario creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const actualizar = async (req, res) => {
    const user = await Usuario.findOne({
        where: {
            ID_USUARIO: req.params.id,
            ESTADO: true
        }
    });
    if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    const { DNI_USUARIO, NOMBRE_USUARIO, APELLIDO_USUARIO, USERNAME, TELEFONO, EMAIL, PASSWORD_USER, CONFIRM_PASSWORD_USER, ID_ROL } = req.body;

    try {
        const existeUsuario = await Usuario.findOne({
            where: {
                [Op.or]: [
                    { DNI_USUARIO: DNI_USUARIO, ESTADO: true, ID_USUARIO: { [Op.ne]: req.params.id } },
                    { USERNAME: USERNAME, ESTADO: true, ID_USUARIO: { [Op.ne]: req.params.id } },
                    { EMAIL: EMAIL, ESTADO: true, ID_USUARIO: { [Op.ne]: req.params.id } },
                    { TELEFONO: TELEFONO, ESTADO: true, ID_USUARIO: { [Op.ne]: req.params.id } }
                ]
            }
        });

        if (existeUsuario) {
            return res.status(400).json({ msg: "DNI, Nombre de usuario, Email o telefono ya están en uso" });
        }

        let hashPassword;
        if (!PASSWORD_USER) {
            hashPassword = user.PASSWORD_USER;
        } else {
            if (PASSWORD_USER !== CONFIRM_PASSWORD_USER) {
                return res.status(400).json({ msg: "La contraseña no coincide con la confirmación" });
            }
            hashPassword = await argon2.hash(PASSWORD_USER);
        }

        await Usuario.update({
            DNI_USUARIO: DNI_USUARIO,
            NOMBRE_USUARIO: NOMBRE_USUARIO,
            APELLIDO_USUARIO: APELLIDO_USUARIO,
            USERNAME: USERNAME,
            TELEFONO: TELEFONO,
            EMAIL: EMAIL,
            PASSWORD_USER: hashPassword,
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
};

export const eliminar = async (req, res) => {
    const user = await Usuario.findOne({
        where: {
            ID_USUARIO: req.params.id,
            ESTADO: true
        }
    });

    if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    try {
        await Usuario.update({
            ESTADO: false
        }, {
            where: {
                ID_USUARIO: user.ID_USUARIO
            }
        });
        res.status(200).json({ msg: "Usuario desactivado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
