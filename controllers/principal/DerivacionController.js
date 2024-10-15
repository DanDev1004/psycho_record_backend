import Derivacion from "../../models/principal/DerivacionModel.js";
import Usuario from "../../models/principal/UsuarioModel.js";
import Alumno from "../../models/principal/AlumnoModel.js";
import ConsultaPs from "../../models/principal/ConsultaPsModel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        let response;

        if (req.session.role === 3) {
            response = await Derivacion.findAll({
                attributes: ['ID_DERIVACION', 'ID_ALUMNO', 'MOTIVO', 'URGENCIA', 'RECIBIDO', 'ESTADO'],
                where: {
                    ESTADO: true,
                    ID_USUARIO: req.session.userId 
                },
                include: [
                    {
                        model: Usuario,
                        attributes: ['ID_USUARIO','NOMBRE_USUARIO', 'APELLIDO_USUARIO']
                    },
                    {
                        model: Alumno,
                        attributes: ['NOMBRES', 'APELLIDOS', 'DNI']
                    }
                ]
            });
        } else {
            response = await Derivacion.findAll({
                attributes: ['ID_DERIVACION', 'ID_ALUMNO', 'MOTIVO', 'URGENCIA', 'RECIBIDO', 'ESTADO'],
                where: { ESTADO: true },
                include: [
                    {
                        model: Usuario,
                        attributes: ['ID_USUARIO','NOMBRE_USUARIO', 'APELLIDO_USUARIO']
                    },
                    {
                        model: Alumno,
                        attributes: ['NOMBRES', 'APELLIDOS', 'DNI']
                    }
                ]
            });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
export const obtenerPorId = async (req, res) => {
    try {
        const response = await Derivacion.findOne({
            attributes: ['ID_DERIVACION', 'MOTIVO', 'URGENCIA', 'RECIBIDO', 'ESTADO'],
            where: {
                ID_DERIVACION: req.params.id,
                ESTADO: true
            },
            include: [
                {
                    model: Usuario,
                    attributes: ['ID_USUARIO','NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'EMAIL']
                },
                {
                    model: Alumno,
                    attributes: ['NOMBRES', 'APELLIDOS', 'DNI']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const crear = async (req, res) => {
    const { ID_USUARIO, ID_ALUMNO, MOTIVO, URGENCIA } = req.body;

    try {
        await Derivacion.create({
            ID_USUARIO,
            ID_ALUMNO,
            MOTIVO,
            URGENCIA
        });
        res.status(201).json({ msg: "Derivación creada exitosamente" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const actualizar = async (req, res) => {
    const derivacion = await Derivacion.findOne({
        where: {
            ID_DERIVACION: req.params.id,
            ESTADO: true
        }
    });

    if (!derivacion) {
        return res.status(404).json({ msg: "Derivación no encontrada" });
    }

    if (derivacion.RECIBIDO === true) {
        return res.status(400).json({ msg: "No se puede actualizar porque la derivación ya ha sido recibida" });
    }

    const { ID_USUARIO, ID_ALUMNO, MOTIVO, URGENCIA, RECIBIDO } = req.body;

    try {
        await Derivacion.update({
            ID_USUARIO,
            ID_ALUMNO,
            MOTIVO,
            URGENCIA,
            RECIBIDO
        }, {
            where: {
                ID_DERIVACION: derivacion.ID_DERIVACION
            }
        });
        res.status(200).json({ msg: "Derivación actualizada exitosamente" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const eliminar = async (req, res) => {
    const derivacion = await Derivacion.findOne({
        where: {
            ID_DERIVACION: req.params.id,
            ESTADO: true
        }
    });

    if (!derivacion) {
        return res.status(404).json({ msg: "Derivación no encontrada" });
    }

    

    try {
        await Derivacion.update({
            ESTADO: false
        }, {
            where: {
                ID_DERIVACION: derivacion.ID_DERIVACION
            }
        });
        res.status(200).json({ msg: "Derivación eliminada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const buscar = async (req, res) => {
    try {
        const { searchText } = req.body;

        let condicion = {
            ESTADO: true,
            [Op.or]: [
                { '$Alumno.NOMBRES$': { [Op.like]: `%${searchText}%` } },
                { '$Alumno.APELLIDOS$': { [Op.like]: `%${searchText}%` } },
                { '$Alumno.DNI$': { [Op.like]: `%${searchText}%` } }
            ]
        };

        if (req.session.role === 3) {
            condicion.ID_USUARIO = req.session.userId; 
        }

        const response = await Derivacion.findAll({
            attributes: ['ID_DERIVACION', 'MOTIVO', 'URGENCIA', 'RECIBIDO', 'ESTADO'],
            include: [
                {
                    model: Usuario,
                    attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'EMAIL']
                },
                {
                    model: Alumno,
                    attributes: ['NOMBRES', 'APELLIDOS', 'DNI']
                }
            ],
            where: condicion
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const obtenerConsultaPorDerivacion = async (req, res) => {
    try {
        const derivacion = await Derivacion.findOne({
            where: {
                ID_DERIVACION: req.params.id, 
                ESTADO: true
            }
        });

        if (!derivacion) {
            return res.status(404).json({ msg: "No se encontró la derivación" });
        }

        const consulta = await ConsultaPs.findOne({
            where: {
                ID_DERIVACION: derivacion.ID_DERIVACION,
                ESTADO: true
            },
            attributes: ['FECHA_ATENCION', 'HORA_INICIO', 'HORA_FIN']
        });

        if (!consulta) {
            return res.status(404).json({ msg: "No se encontró una consulta relacionada con la derivación" });
        }

        res.status(200).json({
            fecha_atencion: consulta.FECHA_ATENCION,
            hora_inicio: consulta.HORA_INICIO,
            hora_fin: consulta.HORA_FIN
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};