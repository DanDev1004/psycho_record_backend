import EstadoCivil from "../../models/mantenimiento/EstadoCivilModel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await EstadoCivil.findAll({
            attributes: ['ID_EC', 'NOMBRE_EC', 'ESTADO'],
            where: { ESTADO: true }  
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await EstadoCivil.findOne({
            attributes: ['ID_EC', 'NOMBRE_EC', 'ESTADO'],
            where: {
                ID_EC: req.params.id,
                ESTADO: true  
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Estado civil no encontrado o inactivo" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { NOMBRE_EC } = req.body;

    try {
        const existeEstadoCivil = await EstadoCivil.findOne({
            where: {
                NOMBRE_EC: NOMBRE_EC,
                ESTADO: true
            }
        });

        if (existeEstadoCivil) {
            return res.status(400).json({ msg: "El nombre del estado civil ya está en uso" });
        }

        await EstadoCivil.create({
            NOMBRE_EC: NOMBRE_EC
        });
        res.status(201).json({ msg: "Estado civil creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const { NOMBRE_EC } = req.body;
    const estadoCivil = await EstadoCivil.findOne({
        where: {
            ID_EC: req.params.id,
            ESTADO: true
        }
    });

    if (!estadoCivil) {
        return res.status(404).json({ msg: "Estado civil no encontrado o inactivo" });
    }

    try {
        const existeEstadoCivil = await EstadoCivil.findOne({
            where: {
                NOMBRE_EC: NOMBRE_EC,
                ESTADO: true,
                ID_EC: { [Op.ne]: req.params.id }
            }
        });

        if (existeEstadoCivil) {
            return res.status(400).json({ msg: "El nombre del estado civil ya está en uso" });
        }

        await EstadoCivil.update({
            NOMBRE_EC: NOMBRE_EC,
        }, {
            where: {
                ID_EC: estadoCivil.ID_EC
            }
        });

        res.status(200).json({ msg: "Estado civil actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const estadoCivil = await EstadoCivil.findOne({
        where: {
            ID_EC: req.params.id,
            ESTADO: true  
        }
    });
    if (!estadoCivil) {
        return res.status(404).json({ msg: "Estado civil no encontrado o ya inactivo" });
    }
    try {
        await EstadoCivil.update({
            ESTADO: false  
        }, {
            where: {
                ID_EC: estadoCivil.ID_EC
            }
        });
        res.status(200).json({ msg: "Estado civil eliminado (desactivado)" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
