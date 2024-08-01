import Derivacion from "../models/DerivacionModel.js";
import Usuario from "../models/UsuarioModel.js";
import ListadoAula from "../models/ListadoAulaModel.js";
import Alumno from "../models/AlumnoModel.js";
import Tutor from "../models/TutorModel.js";
import Instructor from "../models/InstructorModel.js";
import Aula from "../models/AulaModel.js";
import AreaPe from "../models/AreaPeModel.js";
import Religion from "../models/ReligionModel.js";
import EstadoCivil from "../models/EstadoCivilModel.js";
import {Op} from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        let response;
       if(req.session.role===1){
         response = await Derivacion.findAll({
            attributes: ['ID_DERIVACION', 'ID_USUARIO', 'ID_LISTADO_AULA', 'MOTIVO', 'SEVERIDAD', 'ESTADO','createdAt'],
            include: [
                {
                    model: Usuario,
                    attributes: ['DNI_USUARIO']
                },
                {
                    model: ListadoAula,
                    attributes: ['ID_ALUMNO', 'ID_TUTOR'],
                    include: [
                        {
                            model: Alumno,
                            attributes: ['ID_ALUMNO', 'NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO','SEXO', 'EDAD', 'TELEFONO', 'ID_RELIGION', 'ID_EC','DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'],
                            include: [
                                {
                                    model: Religion,
                                    attributes: ['NOMBRE_RELIGION']
                                },
                                {
                                    model: EstadoCivil,
                                    attributes: ['NOMBRE_EC']
                                }
                            ]
                        },
                        {
                            model: Tutor,
                            attributes: ['ID_TUTOR', 'ID_INSTRUCTOR', 'ID_AULA'],
                            include:[
                                {
                                    model: Instructor,
                                    attributes: ['DNI_INSTRUCTOR','NOMBRE_INSTRUCTOR', 'APELLIDO_INSTRUCTOR','ID_AREA_PE'],
                                    include:[
                                        {
                                            model: AreaPe,
                                            attributes:['NOMBRE_AREA_PE']
                                        }
                                    ]
                                },
                                {
                                    model: Aula,
                                    attributes: ['ANIO', 'PERIODO', 'CICLO','ID_AREA_PE'],
                                    include:[
                                        {
                                            model: AreaPe,
                                            attributes:['NOMBRE_AREA_PE']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.status(200).json(response);
    }else{
        response = await Derivacion.findAll({
            attributes: ['ID_DERIVACION', 'ID_USUARIO', 'ID_LISTADO_AULA', 'FECHA_DERIVACION', 'MOTIVO', 'SEVERIDAD', 'ESTADO'],
            where:{
                ID_USUARIO: req.session.userId
            },
            include: [
                {
                    model: Usuario,
                    attributes: ['DNI_USUARIO']
                },
                {
                    model: ListadoAula,
                    attributes: ['ID_ALUMNO', 'ID_TUTOR'],
                    include: [
                        {
                            model: Alumno,
                            attributes: ['ID_ALUMNO', 'NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO','SEXO', 'EDAD', 'TELEFONO', 'ID_RELIGION', 'ID_EC','DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'],
                            include: [
                                {
                                    model: Religion,
                                    attributes: ['NOMBRE_RELIGION']
                                },
                                {
                                    model: EstadoCivil,
                                    attributes: ['NOMBRE_EC']
                                }
                            ]
                        },
                        {
                            model: Tutor,
                            attributes: ['ID_TUTOR', 'ID_INSTRUCTOR', 'ID_AULA'],
                            include:[
                                {
                                    model: Instructor,
                                    attributes: ['DNI_INSTRUCTOR','NOMBRE_INSTRUCTOR', 'APELLIDO_INSTRUCTOR','ID_AREA_PE'],
                                    include:[
                                        {
                                            model: AreaPe,
                                            attributes:['NOMBRE_AREA_PE']
                                        }
                                    ]
                                },
                                {
                                    model: Aula,
                                    attributes: ['ANIO', 'PERIODO', 'CICLO','ID_AREA_PE'],
                                    include:[
                                        {
                                            model: AreaPe,
                                            attributes:['NOMBRE_AREA_PE']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.status(200).json(response);
    }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
       const derivacion = await Derivacion.findOne({
        where: {
            ID_DERIVACION: req.params.id
        }
       });

       if(!derivacion){
        return res.status(404).json({msg: "Derivacion no encontrada"});
       }
        let response;
        if(req.session.role===1){
        response = await Derivacion.findOne({
            attributes: ['ID_DERIVACION', 'ID_USUARIO', 'ID_LISTADO_AULA', 'FECHA_DERIVACION', 'MOTIVO', 'SEVERIDAD', 'ESTADO'],
            where: {
                ID_DERIVACION: req.params.id
            },
            include: [
                {
                    model: Usuario,
                    attributes: ['DNI_USUARIO']
                },
                {
                    model: ListadoAula,
                    attributes: ['ID_ALUMNO', 'ID_TUTOR'],
                    include: [
                        {
                            model: Alumno,
                            attributes: ['ID_ALUMNO', 'NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO','SEXO', 'EDAD', 'TELEFONO', 'ID_RELIGION', 'ID_EC','DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'],
                            include: [
                                {
                                    model: Religion,
                                    attributes: ['NOMBRE_RELIGION']
                                },
                                {
                                    model: EstadoCivil,
                                    attributes: ['NOMBRE_EC']
                                }
                            ]
                        },
                        {
                            model: Tutor,
                            attributes: ['ID_TUTOR', 'ID_INSTRUCTOR', 'ID_AULA'],
                            include:[
                                {
                                    model: Instructor,
                                    attributes: ['DNI_INSTRUCTOR','NOMBRE_INSTRUCTOR', 'APELLIDO_INSTRUCTOR','ID_AREA_PE'],
                                    include:[
                                        {
                                            model: AreaPe,
                                            attributes:['NOMBRE_AREA_PE']
                                        }
                                    ]
                                },
                                {
                                    model: Aula,
                                    attributes: ['ANIO', 'PERIODO', 'CICLO','ID_AREA_PE'],
                                    include:[
                                        {
                                            model: AreaPe,
                                            attributes:['NOMBRE_AREA_PE']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }else{
        response = await Derivacion.findOne({
            attributes: ['ID_DERIVACION', 'ID_USUARIO', 'ID_LISTADO_AULA', 'FECHA_DERIVACION', 'MOTIVO', 'SEVERIDAD', 'ESTADO'],
            where: {
                [Op.and]:[
                    {
                        ID_DERIVACION: req.params.id
                    },
                    {
                        ID_USUARIO: req.session.userId
                    }
                ]
            },
            include: [
                {
                    model: Usuario,
                    attributes: ['DNI_USUARIO']
                },
                {
                    model: ListadoAula,
                    attributes: ['ID_ALUMNO', 'ID_TUTOR'],
                    include: [
                        {
                            model: Alumno,
                            attributes: ['ID_ALUMNO', 'NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO','SEXO', 'EDAD', 'TELEFONO', 'ID_RELIGION', 'ID_EC','DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'],
                            include: [
                                {
                                    model: Religion,
                                    attributes: ['NOMBRE_RELIGION']
                                },
                                {
                                    model: EstadoCivil,
                                    attributes: ['NOMBRE_EC']
                                }
                            ]
                        },
                        {
                            model: Tutor,
                            attributes: ['ID_TUTOR', 'ID_INSTRUCTOR', 'ID_AULA'],
                            include:[
                                {
                                    model: Instructor,
                                    attributes: ['DNI_INSTRUCTOR','NOMBRE_INSTRUCTOR', 'APELLIDO_INSTRUCTOR','ID_AREA_PE'],
                                    include:[
                                        {
                                            model: AreaPe,
                                            attributes:['NOMBRE_AREA_PE']
                                        }
                                    ]
                                },
                                {
                                    model: Aula,
                                    attributes: ['ANIO', 'PERIODO', 'CICLO','ID_AREA_PE'],
                                    include:[
                                        {
                                            model: AreaPe,
                                            attributes:['NOMBRE_AREA_PE']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { ID_LISTADO_AULA, FECHA_DERIVACION, MOTIVO,SEVERIDAD } = req.body;
    try {
        await Derivacion.create({
            ID_USUARIO: req.session.userId,
            ID_LISTADO_AULA: ID_LISTADO_AULA,
            FECHA_DERIVACION: FECHA_DERIVACION,
            MOTIVO: MOTIVO,
            SEVERIDAD: SEVERIDAD,
            ESTADO: 0
        });
        res.status(201).json({ msg: "Derivación creada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    try {
    const derivacion = await Derivacion.findOne({
        where: {
            ID_DERIVACION: req.params.id
        }
    });
    if (!derivacion) {
        return res.status(404).json({ msg: "Derivación no encontrada" });
    }

    const { ID_LISTADO_AULA, FECHA_DERIVACION, MOTIVO, SEVERIDAD, ESTADO } = req.body;
   
    if(req.session.role===1){
        await Derivacion.update({
            ID_LISTADO_AULA: ID_LISTADO_AULA,
            FECHA_DERIVACION: FECHA_DERIVACION,
            MOTIVO: MOTIVO,
            SEVERIDAD: SEVERIDAD,
            ESTADO: ESTADO
        }, {
            where: {
                ID_DERIVACION: derivacion.ID_DERIVACION
            }
        });
    }else{

        if(derivacion.ID_USUARIO !== req.session.userId){
            return res.status(403).json({ msg:"Acceso prohibido" });
        }

        await Derivacion.update({
            ID_LISTADO_AULA: ID_LISTADO_AULA,
            FECHA_DERIVACION: FECHA_DERIVACION,
            MOTIVO: MOTIVO,
            SEVERIDAD: SEVERIDAD
        }, {
            where: {
                [Op.and]:[
                    {
                        ID_DERIVACION: req.params.id
                    },
                    {
                        ID_USUARIO: req.session.userId
                    }
                ]
            }
        });
    }

        res.status(200).json({ msg: "Derivación actualizada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const eliminar = async (req, res) => {
    try {
    const derivacion = await Derivacion.findOne({
        where: {
            ID_DERIVACION: req.params.id
        }
    });
    if (!derivacion) {
        return res.status(404).json({ msg: "Derivación no encontrada" });
    }

    if(req.session.role===1){
        await Derivacion.destroy({
            where: {
                ID_DERIVACION: derivacion.ID_DERIVACION
            }
        });
    }else{
        if(derivacion.ID_USUARIO !== req.session.userId){
            return res.status(403).json({ msg:"Acceso prohibido" });
        }
            await Derivacion.destroy({
                where: {
                    [Op.and]:[
                        {
                            ID_DERIVACION: derivacion.ID_DERIVACION
                        },
                        {
                            ID_USUARIO: req.session.userId
                        }
                    ]
                }
            });
        res.status(200).json({ msg: "Derivación eliminada" });
    }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
