import Condicion from "../models/CondicionModel.js";
import Categoria from "../models/CategoriaModel.js";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Condicion.findAll({
            attributes: ['ID_CONDICION', 'NOMBRE_CONDICION', 'ID_CATEGORIA'],
            include: [
                {
                    model: Categoria,
                    attributes: ['NOMBRE_CATEGORIA']
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
        const response = await Condicion.findOne({
            attributes: ['ID_CONDICION', 'NOMBRE_CONDICION', 'ID_CATEGORIA'],
            where: {
                ID_CONDICION: req.params.id
            },
            include: [
                {
                    model: Categoria,
                    attributes: ['NOMBRE_CATEGORIA']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { NOMBRE_CONDICION, ID_CATEGORIA } = req.body;

    try {
        await Condicion.create({
            NOMBRE_CONDICION,
            ID_CATEGORIA
        });
        res.status(201).json({ msg: "Condición creada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const condicion = await Condicion.findOne({
        where: {
            ID_CONDICION: req.params.id
        }
    });
    if (!condicion) {
        return res.status(404).json({ msg: "Condición no encontrada" });
    }
    const { NOMBRE_CONDICION, ID_CATEGORIA } = req.body;
    try {
        await Condicion.update({
            NOMBRE_CONDICION,
            ID_CATEGORIA
        }, {
            where: {
                ID_CONDICION: condicion.ID_CONDICION
            }
        });

        res.status(200).json({ msg: "Condición actualizada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const condicion = await Condicion.findOne({
        where: {
            ID_CONDICION: req.params.id
        }
    });
    if (!condicion) {
        return res.status(404).json({ msg: "Condición no encontrada" });
    }
    try {
        await Condicion.destroy({
            where: {
                ID_CONDICION: condicion.ID_CONDICION
            }
        });
        res.status(200).json({ msg: "Condición eliminada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
