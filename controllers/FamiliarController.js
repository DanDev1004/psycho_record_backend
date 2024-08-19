import Familiar from "../models/FamiliarModel.js";
import RegistroFamiliar from "../models/RegistroFamiliarModel.js";
import ListadoAula from "../models/ListadoAulaModel.js";
import Alumno from "../models/AlumnoModel.js";
import EstadoCivil from "../models/EstadoCivilModel.js";
import Religion from "../models/ReligionModel.js";
import Parentesco from "../models/ParentescoModel.js";
import Tutor from "../models/TutorModel.js";
import Instructor from "../models/InstructorModel.js";
import Aula from "../models/AulaModel.js";
import AreaPe from "../models/AreaPeModel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Familiar.findAll({
            attributes: ['ID_FAMILIAR', 'ID_RF', 'ID_LISTADO_AULA'],
            include: [
                {
                    model: RegistroFamiliar,
                    attributes: ['NOMBRE_RF', 'TELEFONO', 'ID_PARENTESCO'],
                    include: [
                        {
                            model: Parentesco,
                            attributes: ['NOMBRE_PARENTESCO']
                        }
                    ]
                },
                {
                    model: ListadoAula,
                    attributes: ['ID_LISTADO_AULA','ID_ALUMNO', 'ID_TUTOR'],
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
        const response = await Familiar.findOne({
            attributes: ['ID_FAMILIAR', 'ID_RF', 'ID_LISTADO_AULA'],
            where: {
                ID_FAMILIAR: req.params.id
            },
            include: [
                {
                    model: RegistroFamiliar,
                    attributes: ['NOMBRE_RF', 'TELEFONO', 'ID_PARENTESCO'],
                    include: [
                        {
                            model: Parentesco,
                            attributes: ['NOMBRE_PARENTESCO']
                        }
                    ]
                },
                {
                    model: ListadoAula,
                    attributes: ['ID_ALUMNO', 'ID_TUTOR'],
                    include: [
                        {
                            model: Alumno,
                            attributes: ['NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO', 'SEXO',  'TELEFONO', 'ID_RELIGION', 'ID_EC', 'DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'],
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

        const response = await Familiar.findAll({
            attributes: ['ID_FAMILIAR', 'ID_RF', 'ID_LISTADO_AULA'],
            include: [
                {
                    model: RegistroFamiliar,
                    attributes: ['NOMBRE_RF', 'TELEFONO', 'ID_PARENTESCO'],
                    include: [
                        {
                            model: Parentesco,
                            attributes: ['NOMBRE_PARENTESCO']
                        }
                    ]
                },
                {
                    model: ListadoAula,
                    attributes: ['ID_LISTADO_AULA', 'ID_ALUMNO', 'ID_TUTOR'],
                    include: [
                        {
                            model: Alumno,
                            attributes: ['NOMBRE_ALUMNO', 'APELLIDO_ALUMNO']
                        }
                    ]
                }
            ],
            where: {
                [Op.or]: [
                    { '$REGISTRO_FAMILIAR.NOMBRE_RF$': { [Op.like]: `%${searchText}%` } },
                    { '$LISTADO_AULA.ALUMNO.NOMBRE_ALUMNO$': { [Op.like]: `%${searchText}%` } },
                    { '$LISTADO_AULA.ALUMNO.APELLIDO_ALUMNO$': { [Op.like]: `%${searchText}%` } }
                ]
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const crear = async (req, res) => {
    const { ID_RF, ID_LISTADO_AULA } = req.body;

    try {
        await Familiar.create({
            ID_RF: ID_RF,
            ID_LISTADO_AULA: ID_LISTADO_AULA
        });
        res.status(201).json({ msg: "Familiar creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const familiar = await Familiar.findOne({
        where: {
            ID_FAMILIAR: req.params.id
        }
    });
    if (!familiar) {
        return res.status(404).json({ msg: "Familiar no encontrado" });
    }
    const { ID_RF, ID_LISTADO_AULA } = req.body;
    try {
        await Familiar.update({
            ID_RF: ID_RF,
            ID_LISTADO_AULA: ID_LISTADO_AULA
        }, {
            where: {
                ID_FAMILIAR: familiar.ID_FAMILIAR
            }
        });

        res.status(200).json({ msg: "Familiar actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const familiar = await Familiar.findOne({
        where: {
            ID_FAMILIAR: req.params.id
        }
    });
    if (!familiar) {
        return res.status(404).json({ msg: "Familiar no encontrado" });
    }
    try {
        await Familiar.destroy({
            where: {
                ID_FAMILIAR: familiar.ID_FAMILIAR
            }
        });
        res.status(200).json({ msg: "Familiar eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
