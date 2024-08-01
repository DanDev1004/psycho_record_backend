import EstadoCivil from "../models/EstadoCivilModel.js";

export const obtenerTodos = async(req, res) => {
    try {
        const response = await EstadoCivil.findAll({
            attributes: ['ID_EC', 'NOMBRE_EC']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async(req, res) => {
    try {
        const response = await EstadoCivil.findOne({
            attributes: ['ID_EC', 'NOMBRE_EC'],
            where: {
                ID_EC: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async(req, res) => {
    const { NOMBRE_EC } = req.body;

    try {
        await EstadoCivil.create({
            NOMBRE_EC: NOMBRE_EC
        });
        res.status(201).json({ msg: "Estado civil creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async(req, res) => {
    const estadoCivil = await EstadoCivil.findOne({
        where: {
            ID_EC: req.params.id
        }
    });
    if (!estadoCivil) {
        return res.status(404).json({ msg: "Estado civil no encontrado" });
    }
    const { NOMBRE_EC } = req.body;
    try {
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

export const eliminar = async(req, res) => {
    const estadoCivil = await EstadoCivil.findOne({
        where: {
            ID_EC: req.params.id
        }
    });
    if (!estadoCivil) {
        return res.status(404).json({ msg: "Estado civil no encontrado" });
    }
    try {
        await EstadoCivil.destroy({
            where: {
                ID_EC: estadoCivil.ID_EC
            }
        });
        res.status(200).json({ msg: "Estado civil eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
