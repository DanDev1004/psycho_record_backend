import AreaPe from "../models/AreaPeModel.js";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await AreaPe.findAll({
            attributes: ['ID_AREA_PE', 'NOMBRE_AREA_PE']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await AreaPe.findOne({
            attributes: ['ID_AREA_PE', 'NOMBRE_AREA_PE'],
            where: {
                ID_AREA_PE: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { NOMBRE_AREA_PE } = req.body;

    try {
        await AreaPe.create({
            NOMBRE_AREA_PE: NOMBRE_AREA_PE
        });
        res.status(201).json({ msg: "Área-Programa-Educativo creada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const areaPe = await AreaPe.findOne({
        where: {
            ID_AREA_PE: req.params.id
        }
    });
    if (!areaPe) {
        return res.status(404).json({ msg: "Área-Programa-Educativo  no encontrada" });
    }
    const { NOMBRE_AREA_PE } = req.body;
    try {
        await AreaPe.update({
            NOMBRE_AREA_PE: NOMBRE_AREA_PE,
        }, {
            where: {
                ID_AREA_PE: areaPe.ID_AREA_PE
            }
        });

        res.status(200).json({ msg: "Área-Programa-Educativo  actualizada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const areaPe = await AreaPe.findOne({
        where: {
            ID_AREA_PE: req.params.id
        }
    });
    if (!areaPe) {
        return res.status(404).json({ msg: "Área-Programa-Educativo  no encontrada" });
    }
    try {
        await AreaPe.destroy({
            where: {
                ID_AREA_PE: areaPe.ID_AREA_PE
            }
        });
        res.status(200).json({ msg: "Área-Programa-Educativo  eliminada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
