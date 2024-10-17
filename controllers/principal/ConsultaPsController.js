import ConsultaPs from "../../models/principal/ConsultaPsModel.js";
import Usuario from "../../models/principal/UsuarioModel.js";
import Alumno from "../../models/principal/AlumnoModel.js";
import Derivacion from "../../models/principal/DerivacionModel.js";
import AreaPe from "../../models/mantenimiento/AreaPeModel.js";
import db from "../../config/Database.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        let response;
        
        if (req.session.role === 1) { 
            response = await ConsultaPs.findAll({
                attributes: ['ID_CONSULTA_PS', 'TIPO_DERIVACION',  'FAMILIAR', 'FECHA_ATENCION', 'HORA_INICIO', 'HORA_FIN', 'ASISTENCIA', 'MOTIVO', 'PROBLEMA', 'RECOMENDACION', 'ASPECTO_FISICO', 'ASEO_PERSONAL', 'CONDUCTA', 'ESTADO'],
                where: { ESTADO: true },
                include: [
                    {
                        model: Usuario,
                        attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'EMAIL'],
                    },
                    {
                        model: Alumno,
                        attributes: ['ID_ALUMNO','NOMBRES', 'APELLIDOS', 'DNI']
                    },
                    {
                        model: Derivacion,
                        attributes: ['ID_DERIVACION', 'MOTIVO', 'URGENCIA'],
                        include: [
                            {
                                model: Usuario,
                                attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'DNI_USUARIO', 'TELEFONO']
                            },
                            {
                                model: Alumno,
                                attributes: ['NOMBRES', 'APELLIDOS', 'DNI']
                            },
                        ]
                    }
                ]
            });
        } else if (req.session.role === 3) { 
            response = await ConsultaPs.findAll({
                attributes: ['ID_CONSULTA_PS', 'ID_DERIVACION', 'FECHA_ATENCION', 'TIPO_DERIVACION', 'HORA_INICIO', 'HORA_FIN'],
                where: { ESTADO: true },
                include: [
                    {
                        model: Derivacion,
                        attributes: ['ID_DERIVACION'],
                    }
                ]
            });
        } else { 
            response = await ConsultaPs.findAll({
                attributes: ['ID_CONSULTA_PS', 'TIPO_DERIVACION', 'FAMILIAR', 'FECHA_ATENCION', 'HORA_INICIO', 'HORA_FIN', 'ASISTENCIA', 'MOTIVO', 'PROBLEMA', 'RECOMENDACION', 'ASPECTO_FISICO', 'ASEO_PERSONAL', 'CONDUCTA', 'ESTADO'],
                where: {
                    ESTADO: true,
                    ID_USUARIO: req.session.userId 
                },
                include: [
                    {
                        model: Usuario,
                        attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'EMAIL'],
                    },
                    {
                        model: Alumno,
                        attributes: ['ID_ALUMNO','NOMBRES', 'APELLIDOS', 'DNI']
                    },
                    {
                        model: Derivacion,
                        attributes: ['ID_DERIVACION', 'MOTIVO', 'URGENCIA'],
                        include: [
                            {
                                model: Usuario,
                                attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'DNI_USUARIO', 'TELEFONO']
                            },
                            {
                                model: Alumno,
                                attributes: ['NOMBRES', 'APELLIDOS', 'DNI']
                            },
                        ]
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
        const condicion = req.session.role === 1 ? { ID_CONSULTA_PS: req.params.id, ESTADO: true } : {
            ID_CONSULTA_PS: req.params.id,
            ESTADO: true,
            ID_USUARIO: req.session.userId 
        };

        const response = await ConsultaPs.findOne({
            attributes: ['ID_CONSULTA_PS', 'TIPO_DERIVACION', 'FECHA_ATENCION', 'FAMILIAR', 'HORA_INICIO', 'HORA_FIN', 'ASISTENCIA', 'MOTIVO', 'PROBLEMA', 'RECOMENDACION', 'ASPECTO_FISICO', 'ASEO_PERSONAL', 'CONDUCTA', 'ESTADO'],
            where: condicion,
            include: [
                {
                    model: Usuario,
                    attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'EMAIL'],
                },
                {
                    model: Alumno,
                    attributes: ['NOMBRES', 'APELLIDOS', 'DNI']
                },
                {
                    model: Derivacion,
                    attributes: ['ID_DERIVACION', 'MOTIVO', 'URGENCIA'],
                    include: [
                        {
                            model: Usuario,
                            attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'DNI_USUARIO', 'TELEFONO']
                        }
                    ]
                }
            ]
        });

        if (!response) return res.status(404).json({ msg: "Consulta no encontrada" });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const crear = async (req, res) => {
    const { ID_USUARIO, TIPO_DERIVACION, ID_ALUMNO, ID_DERIVACION, FAMILIAR, TELEFONO_FAMILIAR, FECHA_ATENCION, HORA_INICIO, HORA_FIN, ASISTENCIA, MOTIVO, PROBLEMA, RECOMENDACION, ASPECTO_FISICO, ASEO_PERSONAL, CONDUCTA } = req.body;

    const transaction = await db.transaction();

    try {
        await ConsultaPs.create({
            ID_USUARIO,
            TIPO_DERIVACION,
            ID_ALUMNO,
            ID_DERIVACION,
            FAMILIAR,
            TELEFONO_FAMILIAR,
            FECHA_ATENCION,
            HORA_INICIO,
            HORA_FIN,
            ASISTENCIA,
            MOTIVO,
            PROBLEMA,
            RECOMENDACION,
            ASPECTO_FISICO,
            ASEO_PERSONAL,
            CONDUCTA
        }, { transaction });

        if (TIPO_DERIVACION === 3 && ID_DERIVACION) {
            const derivacion = await Derivacion.findOne({
                where: { ID_DERIVACION },
                transaction
            });

            if (derivacion) {
                await Derivacion.update(
                    { RECIBIDO: true },
                    { where: { ID_DERIVACION }, transaction }
                );
            }
        }

        await transaction.commit();
        res.status(201).json({ msg: "Consulta psicológica creada exitosamente" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};

export const actualizar = async (req, res) => {
    const { ID_USUARIO, TIPO_DERIVACION, ID_ALUMNO, ID_DERIVACION, FAMILIAR, TELEFONO_FAMILIAR, FECHA_ATENCION, HORA_INICIO, HORA_FIN, ASISTENCIA, MOTIVO, PROBLEMA, RECOMENDACION, ASPECTO_FISICO, ASEO_PERSONAL, CONDUCTA } = req.body;

    const transaction = await db.transaction();

    try {
        const consulta = await ConsultaPs.findOne({
            where: {
                ID_CONSULTA_PS: req.params.id,
                ESTADO: true
            },
            transaction
        });

        if (!consulta) {
            await transaction.rollback();
            return res.status(404).json({ msg: "Consulta psicológica no encontrada" });
        }

        await ConsultaPs.update({
            ID_USUARIO,
            TIPO_DERIVACION,
            ID_ALUMNO,
            ID_DERIVACION,
            FAMILIAR,
            TELEFONO_FAMILIAR,
            FECHA_ATENCION,
            HORA_INICIO,
            HORA_FIN,
            ASISTENCIA,
            MOTIVO,
            PROBLEMA,
            RECOMENDACION,
            ASPECTO_FISICO,
            ASEO_PERSONAL,
            CONDUCTA
        }, {
            where: {
                ID_CONSULTA_PS: consulta.ID_CONSULTA_PS
            },
            transaction
        });

        await transaction.commit();
        res.status(200).json({ msg: "Consulta psicológica actualizada exitosamente" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};

export const eliminar = async (req, res) => {
    const transaction = await db.transaction();

    try {
        const consulta = await ConsultaPs.findOne({
            where: {
                ID_CONSULTA_PS: req.params.id,
                ESTADO: true
            },
            transaction
        });

        if (!consulta) {
            await transaction.rollback();
            return res.status(404).json({ msg: "Consulta psicológica no encontrada" });
        }

        await ConsultaPs.update({ ESTADO: false }, {
            where: {
                ID_CONSULTA_PS: consulta.ID_CONSULTA_PS
            },
            transaction
        });

        await transaction.commit();
        res.status(200).json({ msg: "Consulta psicológica eliminada" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};

export const buscar = async (req, res) => {
    try {
        const { searchText } = req.body;

        const condicion = {
            ESTADO: true,
            [Op.or]: [
                { '$ALUMNO.NOMBRES$': { [Op.like]: `%${searchText}%` } },
                { '$ALUMNO.APELLIDOS$': { [Op.like]: `%${searchText}%` } },
                { '$ALUMNO.DNI$': { [Op.like]: `%${searchText}%` } }
            ]
        };

        if (req.session.role !== 1) {
            condicion.ID_USUARIO = req.session.userId; 
        }

        const response = await ConsultaPs.findAll({
            attributes: ['ID_CONSULTA_PS', 'TIPO_DERIVACION', 'FAMILIAR', 'FECHA_ATENCION', 'HORA_INICIO', 'HORA_FIN', 'ASISTENCIA', 'MOTIVO', 'PROBLEMA', 'RECOMENDACION', 'ASPECTO_FISICO', 'ASEO_PERSONAL', 'CONDUCTA', 'ESTADO'],
            where: condicion,
            include: [
                {
                    model: Usuario,
                    attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'EMAIL'],
                },
                {
                    model: Alumno,
                    attributes: ['NOMBRES', 'APELLIDOS', 'DNI']
                },
                {
                    model: Derivacion,
                    attributes: ['MOTIVO', 'URGENCIA'],
                    include: [
                        {
                            model: Usuario,
                            attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'DNI_USUARIO', 'TELEFONO']
                        },
                        {
                            model: Alumno,
                            attributes: ['NOMBRES', 'APELLIDOS', 'DNI']
                        }
                    ]
                }
            ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const filtrarPorFechaAnio = async (req, res) => {
    const { mes, anio } = req.body;
    if (!mes || !anio) {
        return res.status(400).json({ msg: "Mes y año son requeridos" });
    }

    const primerDia = new Date(Date.UTC(anio, mes - 1, 1));
    const ultimoDia = new Date(Date.UTC(anio, mes, 0));

    try {
        const condicion = {
            ESTADO: true,
            FECHA_ATENCION: {
                [Op.gte]: primerDia.toISOString(),
                [Op.lte]: ultimoDia.toISOString()
            }
        };

        if (req.session.role !== 1) {
            condicion.ID_USUARIO = req.session.userId;
        }

        const response = await ConsultaPs.findAll({
            attributes: ['ID_CONSULTA_PS', 'FECHA_ATENCION', 'HORA_INICIO', 'HORA_FIN', 'ASISTENCIA', 'MOTIVO', 'PROBLEMA', 'RECOMENDACION', 'ESTADO'],
            where: condicion,
            include: [
                {
                    model: Alumno,
                    attributes: ['NOMBRES', 'APELLIDOS', 'CICLO', 'FECH_NAC'],
                    include: [
                        {
                            model: AreaPe,
                            attributes: ['NOMBRE_AREA_PE']
                        }
                    ]
                }
            ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
