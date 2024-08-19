import ListadoAula from "../models/ListadoAulaModel.js";
import Alumno from "../models/AlumnoModel.js";
import Tutor from "../models/TutorModel.js";
import Instructor from "../models/InstructorModel.js";
import Aula from "../models/AulaModel.js";
import Religion from "../models/ReligionModel.js";
import EstadoCivil from "../models/EstadoCivilModel.js";
import AreaPe from "../models/AreaPeModel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await ListadoAula.findAll({
            attributes: ['ID_LISTADO_AULA', 'ID_ALUMNO', 'ID_TUTOR'],
            include: [
                {
                    model: Alumno,
                    attributes: ['NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO','SEXO','TELEFONO','ID_RELIGION','ID_EC','DIRECCION_NACIMIENTO','FECHA_NACIMIENTO','DOMICILIO','ID_AULA'],
                    include: [
                        {
                            model: EstadoCivil,
                            attributes:['NOMBRE_EC']
                        },
                        {
                            model: Religion,
                            attributes:['NOMBRE_RELIGION']
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
                },
                {
                    model: Tutor,
                    attributes:['ID_INSTRUCTOR','ID_AULA'],
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
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await ListadoAula.findOne({
            attributes: ['ID_LISTADO_AULA', 'ID_ALUMNO', 'ID_TUTOR'],
            where: {
                ID_LISTADO_AULA: req.params.id
            },
            include: [
                {
                    model: Alumno,
                    attributes: ['NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO','SEXO','TELEFONO','ID_RELIGION','ID_EC','DIRECCION_NACIMIENTO','FECHA_NACIMIENTO','DOMICILIO','ID_AULA'],
                    include: [
                        {
                            model: EstadoCivil,
                            attributes:['NOMBRE_EC']
                        },
                        {
                            model: Religion,
                            attributes:['NOMBRE_RELIGION']
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
                },
                {
                    model: Tutor,
                    attributes:['ID_INSTRUCTOR','ID_AULA'],
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
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const buscar = async (req, res) => {
    try {
        const { searchText } = req.body;

        const response = await ListadoAula.findAll({
            attributes: ['ID_LISTADO_AULA', 'ID_ALUMNO', 'ID_TUTOR'],
            include: [
                {
                    model: Alumno,
                    attributes: ['NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO', 'SEXO', 'TELEFONO', 'ID_RELIGION', 'ID_EC', 'DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'],
                    include: [
                        {
                            model: EstadoCivil,
                            attributes: ['NOMBRE_EC']
                        },
                        {
                            model: Religion,
                            attributes: ['NOMBRE_RELIGION']
                        }
                    ]
                },
                {
                    model: Tutor,
                    attributes: ['ID_INSTRUCTOR', 'ID_AULA'],
                    include: [
                        {
                            model: Instructor,
                            attributes: ['DNI_INSTRUCTOR', 'NOMBRE_INSTRUCTOR', 'APELLIDO_INSTRUCTOR', 'ID_AREA_PE'],
                            include: [
                                {
                                    model: AreaPe,
                                    attributes: ['NOMBRE_AREA_PE']
                                }
                            ]
                        },
                        {
                            model: Aula,
                            attributes: ['ANIO', 'PERIODO', 'CICLO', 'ID_AREA_PE'],
                            include: [
                                {
                                    model: AreaPe,
                                    attributes: ['NOMBRE_AREA_PE']
                                }
                            ]
                        }
                    ],
                }
            ],
            where: {
                [Op.or]: [
                    { '$ALUMNO.NOMBRE_ALUMNO$': { [Op.like]: `%${searchText}%` } },
                    { '$ALUMNO.APELLIDO_ALUMNO$': { [Op.like]: `%${searchText}%` } },
                    { '$TUTOR.INSTRUCTOR.NOMBRE_INSTRUCTOR$': { [Op.like]: `%${searchText}%` } },
                    { '$TUTOR.INSTRUCTOR.APELLIDO_INSTRUCTOR$': { [Op.like]: `%${searchText}%` } }
                ]
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const crear = async (req, res) => {
    const { ID_ALUMNO, ID_TUTOR } = req.body;

    try {
        await ListadoAula.create({
            ID_ALUMNO: ID_ALUMNO,
            ID_TUTOR: ID_TUTOR
        });
        res.status(201).json({ msg: "Listado de aula creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const listadoAula = await ListadoAula.findOne({
        where: {
            ID_LISTADO_AULA: req.params.id
        }
    });
    if (!listadoAula) {
        return res.status(404).json({ msg: "Listado de aula no encontrado" });
    }
    const { ID_ALUMNO, ID_TUTOR } = req.body;
    try {
        await ListadoAula.update({
            ID_ALUMNO: ID_ALUMNO,
            ID_TUTOR: ID_TUTOR
        }, {
            where: {
                ID_LISTADO_AULA: listadoAula.ID_LISTADO_AULA
            }
        });

        res.status(200).json({ msg: "Listado de aula actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const listadoAula = await ListadoAula.findOne({
        where: {
            ID_LISTADO_AULA: req.params.id
        }
    });
    if (!listadoAula) {
        return res.status(404).json({ msg: "Listado de aula no encontrado" });
    }
    try {
        await ListadoAula.destroy({
            where: {
                ID_LISTADO_AULA: listadoAula.ID_LISTADO_AULA
            }
        });
        res.status(200).json({ msg: "Listado de aula eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
