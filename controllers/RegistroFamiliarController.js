import RegistroFamiliar from "../models/RegistroFamiliarModel.js";
import Parentesco from "../models/ParentescoModel.js";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await RegistroFamiliar.findAll({
            attributes: ['ID_RF', 'NOMBRE_RF', 'TELEFONO', 'ID_PARENTESCO'],
            include: [
                {
                    model: Parentesco,
                    attributes: ['NOMBRE_PARENTESCO']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await RegistroFamiliar.findOne({
            attributes: ['ID_RF', 'NOMBRE_RF', 'TELEFONO', 'ID_PARENTESCO'],
            where: {
                ID_RF: req.params.id
            },
            include: [
                {
                    model: Parentesco,
                    attributes: ['NOMBRE_PARENTESCO']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { NOMBRE_RF, TELEFONO, ID_PARENTESCO } = req.body;

    try {
        await RegistroFamiliar.create({
            NOMBRE_RF: NOMBRE_RF,
            TELEFONO: TELEFONO,
            ID_PARENTESCO: ID_PARENTESCO
        });
        res.status(201).json({ msg: "Registro familiar creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const registroFamiliar = await RegistroFamiliar.findOne({
        where: {
            ID_RF: req.params.id
        }
    });
    if (!registroFamiliar) {
        return res.status(404).json({ msg: "Registro familiar no encontrado" });
    }
    const { NOMBRE_RF, TELEFONO, ID_PARENTESCO } = req.body;
    try {
        await RegistroFamiliar.update({
            NOMBRE_RF: NOMBRE_RF,
            TELEFONO: TELEFONO,
            ID_PARENTESCO: ID_PARENTESCO
        }, {
            where: {
                ID_RF: registroFamiliar.ID_RF
            }
        });

        res.status(200).json({ msg: "Registro familiar actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const registroFamiliar = await RegistroFamiliar.findOne({
        where: {
            ID_RF: req.params.id
        }
    });
    if (!registroFamiliar) {
        return res.status(404).json({ msg: "Registro familiar no encontrado" });
    }
    try {
        await RegistroFamiliar.destroy({
            where: {
                ID_RF: registroFamiliar.ID_RF
            }
        });
        res.status(200).json({ msg: "Registro familiar eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
