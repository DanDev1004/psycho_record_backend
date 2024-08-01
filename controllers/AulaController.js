import Aula from "../models/AulaModel.js";
import AreaPe from "../models/AreaPeModel.js";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Aula.findAll({
            attributes: ['ID_AULA', 'ID_AREA_PE', 'ANIO', 'PERIODO', 'CICLO'],
            include: [{
                model: AreaPe,
                attributes: ['NOMBRE_AREA_PE']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await Aula.findOne({
            attributes: ['ID_AULA', 'ID_AREA_PE', 'ANIO', 'PERIODO', 'CICLO'],
            where: {
                ID_AULA: req.params.id
            },
            include: [{
                model: AreaPe,
                attributes: ['NOMBRE_AREA_PE']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { ID_AREA_PE, ANIO, PERIODO, CICLO } = req.body;

    try {
        await Aula.create({
            ID_AREA_PE: ID_AREA_PE,
            ANIO: ANIO,
            PERIODO: PERIODO,
            CICLO: CICLO
        });
        res.status(201).json({ msg: "Aula creada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const aula = await Aula.findOne({
        where: {
            ID_AULA: req.params.id
        }
    });
    if (!aula) {
        return res.status(404).json({ msg: "Aula no encontrada" });
    }
    const { ID_AREA_PE, ANIO, PERIODO, CICLO } = req.body;
    try {
        await Aula.update({
            ID_AREA_PE: ID_AREA_PE,
            ANIO: ANIO,
            PERIODO: PERIODO,
            CICLO: CICLO
        }, {
            where: {
                ID_AULA: aula.ID_AULA
            }
        });

        res.status(200).json({ msg: "Aula actualizada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const aula = await Aula.findOne({
        where: {
            ID_AULA: req.params.id
        }
    });
    if (!aula) {
        return res.status(404).json({ msg: "Aula no encontrada" });
    }
    try {
        await Aula.destroy({
            where: {
                ID_AULA: aula.ID_AULA
            }
        });
        res.status(200).json({ msg: "Aula eliminada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
