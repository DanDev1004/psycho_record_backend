import AreaPe from "../../models/mantenimiento/AreaPeModel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await AreaPe.findAll({
            attributes: ['ID_AREA_PE', 'NOMBRE_AREA_PE', 'ESTADO'],
            where: {
                ESTADO: true 
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await AreaPe.findOne({
            attributes: ['ID_AREA_PE', 'NOMBRE_AREA_PE', 'ESTADO'],
            where: {
                ID_AREA_PE: req.params.id,
                ESTADO: true  
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Área-Programa-Educativo no encontrada o inactiva" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { NOMBRE_AREA_PE } = req.body;

    try {
        const areaExistente = await AreaPe.findOne({
            where: {
                NOMBRE_AREA_PE: NOMBRE_AREA_PE,
                ESTADO: true
            }
        });

        if (areaExistente) {
            return res.status(400).json({ msg: "El nombre ya está en uso" });
        }

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
            ID_AREA_PE: req.params.id,
            ESTADO: true  
        }
    });
    if (!areaPe) {
        return res.status(404).json({ msg: "Área-Programa-Educativo no encontrada o inactiva" });
    }

    const { NOMBRE_AREA_PE } = req.body;
    try {
        const areaExistente = await AreaPe.findOne({
            where: {
                NOMBRE_AREA_PE: NOMBRE_AREA_PE,
                ESTADO: true,
                ID_AREA_PE: { [Op.ne]: req.params.id } 
            }
        });

        if (areaExistente) {
            return res.status(400).json({ msg: "El nombre ya está en uso" });
        }

        await AreaPe.update({
            NOMBRE_AREA_PE: NOMBRE_AREA_PE,
        }, {
            where: {
                ID_AREA_PE: areaPe.ID_AREA_PE
            }
        });

        res.status(200).json({ msg: "Área-Programa-Educativo actualizada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const eliminar = async (req, res) => {
    const areaPe = await AreaPe.findOne({
        where: {
            ID_AREA_PE: req.params.id,
            ESTADO: true  
        }
    });
    if (!areaPe) {
        return res.status(404).json({ msg: "Área-Programa-Educativo no encontrada o ya inactiva" });
    }
    try {
        await AreaPe.update({
            ESTADO: false
        }, {
            where: {
                ID_AREA_PE: areaPe.ID_AREA_PE
            }
        });
        res.status(200).json({ msg: "Área-Programa-Educativo desactivada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

