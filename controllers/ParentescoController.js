import Parentesco from "../models/ParentescoModel.js";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Parentesco.findAll({
            attributes: ['ID_PARENTESCO', 'NOMBRE_PARENTESCO']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await Parentesco.findOne({
            attributes: ['ID_PARENTESCO', 'NOMBRE_PARENTESCO'],
            where: {
                ID_PARENTESCO: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { NOMBRE_PARENTESCO } = req.body;

    try {
        await Parentesco.create({
            NOMBRE_PARENTESCO: NOMBRE_PARENTESCO
        });
        res.status(201).json({ msg: "Parentesco creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const parentesco = await Parentesco.findOne({
        where: {
            ID_PARENTESCO: req.params.id
        }
    });
    if (!parentesco) {
        return res.status(404).json({ msg: "Parentesco no encontrado" });
    }
    const { NOMBRE_PARENTESCO } = req.body;
    try {
        await Parentesco.update({
            NOMBRE_PARENTESCO: NOMBRE_PARENTESCO,
        }, {
            where: {
                ID_PARENTESCO: parentesco.ID_PARENTESCO
            }
        });

        res.status(200).json({ msg: "Parentesco actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const parentesco = await Parentesco.findOne({
        where: {
            ID_PARENTESCO: req.params.id
        }
    });
    if (!parentesco) {
        return res.status(404).json({ msg: "Parentesco no encontrado" });
    }
    try {
        await Parentesco.destroy({
            where: {
                ID_PARENTESCO: parentesco.ID_PARENTESCO
            }
        });
        res.status(200).json({ msg: "Parentesco eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
