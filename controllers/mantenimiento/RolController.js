import Rol from "../../models/mantenimiento/RolMoldel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Rol.findAll({
            attributes: ['ID_ROL', 'NOMBRE_ROL', 'ESTADO'],
            where: { ESTADO: true }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await Rol.findOne({
            attributes: ['ID_ROL', 'NOMBRE_ROL', 'ESTADO'],
            where: {
                ID_ROL: req.params.id,
                ESTADO: true
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Rol no encontrado o inactivo" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { NOMBRE_ROL } = req.body;

    try {
        const existeRol = await Rol.findOne({
            where: {
                NOMBRE_ROL: NOMBRE_ROL,
                ESTADO: true
            }
        });

        if (existeRol) {
            return res.status(400).json({ msg: "El nombre del rol ya está en uso" });
        }

        await Rol.create({
            NOMBRE_ROL: NOMBRE_ROL
        });
        res.status(201).json({ msg: "Rol creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const { NOMBRE_ROL } = req.body;
    const rol = await Rol.findOne({
        where: {
            ID_ROL: req.params.id,
            ESTADO: true
        }
    });

    if (!rol) {
        return res.status(404).json({ msg: "Rol no encontrado o inactivo" });
    }

    try {
        const existeRol = await Rol.findOne({
            where: {
                NOMBRE_ROL: NOMBRE_ROL,
                ESTADO: true,
                ID_ROL: { [Op.ne]: req.params.id }
            }
        });

        if (existeRol) {
            return res.status(400).json({ msg: "El nombre del rol ya está en uso" });
        }

        await Rol.update({
            NOMBRE_ROL: NOMBRE_ROL,
        }, {
            where: {
                ID_ROL: rol.ID_ROL
            }
        });

        res.status(200).json({ msg: "Rol actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const rol = await Rol.findOne({
        where: {
            ID_ROL: req.params.id,
            ESTADO: true
        }
    });
    if (!rol) {
        return res.status(404).json({ msg: "Rol no encontrado o ya inactivo" });
    }
    try {
        await Rol.update({
            ESTADO: false,
        }, {
            where: {
                ID_ROL: rol.ID_ROL
            }
        });
        res.status(200).json({ msg: "Rol desactivado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
