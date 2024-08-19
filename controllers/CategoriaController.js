import Categoria from "../models/CategoriaModel.js";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Categoria.findAll({
            attributes: ['ID_CATEGORIA', 'NOMBRE_CATEGORIA']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await Categoria.findOne({
            attributes: ['ID_CATEGORIA', 'NOMBRE_CATEGORIA'],
            where: {
                ID_CATEGORIA: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { NOMBRE_CATEGORIA } = req.body;

    try {
        await Categoria.create({
            NOMBRE_CATEGORIA
        });
        res.status(201).json({ msg: "Categoría creada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
 
export const actualizar = async (req, res) => {
    const categoria = await Categoria.findOne({
        where: {
            ID_CATEGORIA: req.params.id
        }
    });
    if (!categoria) {
        return res.status(404).json({ msg: "Categoría no encontrada" });
    }
    const { NOMBRE_CATEGORIA } = req.body;
    try {
        await Categoria.update({
            NOMBRE_CATEGORIA
        }, {
            where: {
                ID_CATEGORIA: categoria.ID_CATEGORIA
            }
        });

        res.status(200).json({ msg: "Categoría actualizada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const categoria = await Categoria.findOne({
        where: {
            ID_CATEGORIA: req.params.id
        }
    });
    if (!categoria) {
        return res.status(404).json({ msg: "Categoría no encontrada" });
    }
    try {
        await Categoria.destroy({
            where: {
                ID_CATEGORIA: categoria.ID_CATEGORIA
            }
        });
        res.status(200).json({ msg: "Categoría eliminada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
