import Religion from "../../models/mantenimiento/ReligionModel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Religion.findAll({
            attributes: ['ID_RELIGION', 'NOMBRE_RELIGION', 'ESTADO'],
            where: { ESTADO: true }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await Religion.findOne({
            attributes: ['ID_RELIGION', 'NOMBRE_RELIGION', 'ESTADO'],
            where: {
                ID_RELIGION: req.params.id,
                ESTADO: true
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Religión no encontrada o inactiva" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { NOMBRE_RELIGION } = req.body;

    try {
        const existeReligion = await Religion.findOne({
            where: {
                NOMBRE_RELIGION: NOMBRE_RELIGION,
                ESTADO: true
            }
        });

        if (existeReligion) {
            return res.status(400).json({ msg: "El nombre de la religión ya está en uso" });
        }

        await Religion.create({
            NOMBRE_RELIGION: NOMBRE_RELIGION
        });
        res.status(201).json({ msg: "Religión creada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const { NOMBRE_RELIGION } = req.body;
    const religion = await Religion.findOne({
        where: {
            ID_RELIGION: req.params.id,
            ESTADO: true
        }
    });

    if (!religion) {
        return res.status(404).json({ msg: "Religión no encontrada o inactiva" });
    }

    try {
        const existeReligion = await Religion.findOne({
            where: {
                NOMBRE_RELIGION: NOMBRE_RELIGION,
                ESTADO: true,
                ID_RELIGION: { [Op.ne]: req.params.id }
            }
        });

        if (existeReligion) {
            return res.status(400).json({ msg: "El nombre de la religión ya está en uso" });
        }

        await Religion.update({
            NOMBRE_RELIGION: NOMBRE_RELIGION,
        }, {
            where: {
                ID_RELIGION: religion.ID_RELIGION
            }
        });

        res.status(200).json({ msg: "Religión actualizada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const religion = await Religion.findOne({
        where: {
            ID_RELIGION: req.params.id,
            ESTADO: true
        }
    });
    if (!religion) {
        return res.status(404).json({ msg: "Religión no encontrada o ya inactiva" });
    }
    try {
        await Religion.update({
            ESTADO: false
        }, {
            where: {
                ID_RELIGION: religion.ID_RELIGION
            }
        });
        res.status(200).json({ msg: "Religión desactivada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
