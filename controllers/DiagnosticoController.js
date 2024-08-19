import Diagnostico from "../models/DiagnosticoModel.js";
import ConsultaPs from "../models/ConsultaPsModel.js";
import Condicion from "../models/CondicionModel.js";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Diagnostico.findAll({
            attributes: ['ID_DIAGNOSTICO', 'ID_CONSULTA_PS', 'ID_CONDICION', 'DESCRIPCION'],
            include: [
                {
                    model: ConsultaPs,
                    attributes: ['FECHA_ATENCION', 'HORA_INICIO', 'HORA_FIN']
                },
                {
                    model: Condicion,
                    attributes: ['NOMBRE_CONDICION']
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
        const response = await Diagnostico.findOne({
            attributes: ['ID_DIAGNOSTICO', 'ID_CONSULTA_PS', 'ID_CONDICION', 'DESCRIPCION'],
            where: {
                ID_DIAGNOSTICO: req.params.id
            },
            include: [
                {
                    model: ConsultaPs,
                    attributes: ['FECHA_ATENCION', 'HORA_INICIO', 'HORA_FIN']
                },
                {
                    model: Condicion,
                    attributes: ['NOMBRE_CONDICION']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { ID_CONSULTA_PS, ID_CONDICION, DESCRIPCION } = req.body;

    try {
        await Diagnostico.create({
            ID_CONSULTA_PS,
            ID_CONDICION,
            DESCRIPCION
        });
        res.status(201).json({ msg: "Diagnóstico creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const diagnostico = await Diagnostico.findOne({
        where: {
            ID_DIAGNOSTICO: req.params.id
        }
    });
    if (!diagnostico) {
        return res.status(404).json({ msg: "Diagnóstico no encontrado" });
    }
    const { ID_CONSULTA_PS, ID_CONDICION, DESCRIPCION } = req.body;
    try {
        await Diagnostico.update({
            ID_CONSULTA_PS,
            ID_CONDICION,
            DESCRIPCION
        }, {
            where: {
                ID_DIAGNOSTICO: diagnostico.ID_DIAGNOSTICO
            }
        });

        res.status(200).json({ msg: "Diagnóstico actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const diagnostico = await Diagnostico.findOne({
        where: {
            ID_DIAGNOSTICO: req.params.id
        }
    });
    if (!diagnostico) {
        return res.status(404).json({ msg: "Diagnóstico no encontrado" });
    }
    try {
        await Diagnostico.destroy({
            where: {
                ID_DIAGNOSTICO: diagnostico.ID_DIAGNOSTICO
            }
        });
        res.status(200).json({ msg: "Diagnóstico eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
