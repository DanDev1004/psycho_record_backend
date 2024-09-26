import Diagnostico from "../../../models/principal/diagnostico/DiagnosticoModel.js";
import Condicion from "../../../models/principal/diagnostico/CondicionModel.js";
import ConsultaPs from "../../../models/principal/ConsultaPsModel.js";
import db from "../../../config/Database.js";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Diagnostico.findAll({
            attributes: ['ID_DIAGNOSTICO', 'DESCRIPCION', 'ESTADO'],
            where: { ESTADO: true },
            include: [
                {
                    model: Condicion,
                    attributes: ['NOMBRE_CONDICION']
                },
                {
                    model: ConsultaPs,
                    attributes: ['TIPO_DERIVACION', 'FECHA_ATENCION', 'ASISTENCIA']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const obtenerPorId = async (req, res) => {
    try {
        const response = await Diagnostico.findOne({
            attributes: ['ID_DIAGNOSTICO', 'DESCRIPCION', 'ESTADO'],
            where: {
                ID_DIAGNOSTICO: req.params.id,
                ESTADO: true
            },
            include: [
                {
                    model: Condicion,
                    attributes: ['NOMBRE_CONDICION']
                },
                {
                    model: ConsultaPs,
                    attributes: ['TIPO_DERIVACION', 'FECHA_ATENCION', 'ASISTENCIA']
                }
            ]
        });
        if (!response) {
            return res.status(404).json({ msg: "Diagnóstico no encontrado" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const crear = async (req, res) => {
    const { ID_CONSULTA_PS, ID_CONDICION, DESCRIPCION } = req.body;
    const transaction = await db.transaction();

    try {
        await Diagnostico.create({
            ID_CONSULTA_PS,
            ID_CONDICION: ID_CONDICION || null,
            DESCRIPCION: DESCRIPCION || null
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ msg: "Diagnóstico creado" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};

export const actualizar = async (req, res) => {
    const { ID_CONSULTA_PS, ID_CONDICION, DESCRIPCION } = req.body;
    const transaction = await db.transaction();

    try {
        const diagnostico = await Diagnostico.findOne({
            where: {
                ID_DIAGNOSTICO: req.params.id,
                ESTADO: true
            },
            transaction
        });

        if (!diagnostico) {
            await transaction.rollback();
            return res.status(404).json({ msg: "Diagnóstico no encontrado" });
        }

        await Diagnostico.update({
            ID_CONSULTA_PS,
            ID_CONDICION: ID_CONDICION || null,
            DESCRIPCION: DESCRIPCION || null
        }, {
            where: { ID_DIAGNOSTICO: diagnostico.ID_DIAGNOSTICO },
            transaction
        });

        await transaction.commit();
        res.status(200).json({ msg: "Diagnóstico actualizado" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};

export const eliminar = async (req, res) => {
    const transaction = await db.transaction();

    try {
        const diagnostico = await Diagnostico.findOne({
            where: {
                ID_DIAGNOSTICO: req.params.id,
                ESTADO: true
            },
            transaction
        });

        if (!diagnostico) {
            await transaction.rollback();
            return res.status(404).json({ msg: "Diagnóstico no encontrado" });
        }

        await Diagnostico.update({ ESTADO: false }, {
            where: { ID_DIAGNOSTICO: diagnostico.ID_DIAGNOSTICO },
            transaction
        });

        await transaction.commit();
        res.status(200).json({ msg: "Diagnóstico eliminado" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};

export const obtenerDiagnosticosPorConsulta = async (req, res) => {
    try {
        const { id } = req.params;  

        const response = await Diagnostico.findAll({
            where: {
                ID_CONSULTA_PS: id,  
                ESTADO: true  
            },
            include: [
                {
                    model: Condicion,  
                    attributes: ['NOMBRE_CONDICION']
                },
                {
                    model: ConsultaPs, 
                    attributes: ['FECHA_ATENCION', 'TIPO_DERIVACION']
                }
            ]
        });

        if (!response || response.length === 0) {
            return res.status(404).json({ msg: "No se encontraron diagnósticos para esta consulta psicológica" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};