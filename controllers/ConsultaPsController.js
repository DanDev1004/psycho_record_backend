import ConsultaPs from "../models/ConsultaPsModel.js";
import Usuario from "../models/UsuarioModel.js";
import ListadoAula from "../models/ListadoAulaModel.js";
import Familiar from "../models/FamiliarModel.js";
import RegistroFamiliar from "../models/RegistroFamiliarModel.js";
import Parentesco from "../models/ParentescoModel.js";
import Derivacion from "../models/DerivacionModel.js";
import Alumno from "../models/AlumnoModel.js";
import Tutor from "../models/TutorModel.js";
import Instructor from "../models/InstructorModel.js";
import AreaPe from "../models/AreaPeModel.js";
import Aula from "../models/AulaModel.js";
import Religion from "../models/ReligionModel.js";
import EstadoCivil from "../models/EstadoCivilModel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await ConsultaPs.findAll({
            attributes: [
                'ID_CONSULTA_PS', 'ID_USUARIO', 'TIPO_DERIVACION', 'ID_LISTADO_AULA', 'ID_FAMILIAR', 'ID_DERIVACION',
                'FECHA_ATENCION', 'HORA_INICIO', 'HORA_FIN', 'ASISTENCIA', 'MOTIVO', 'PROBLEMA',
                'RECOMENDACION', 'ASPECTO_FISICO', 'ASEO_PERSONAL', 'CONDUCTA'
            ],
            include: [
                {
                    model: Usuario,
                    attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'DNI_USUARIO']
                },
                {
                    model: ListadoAula,
                    attributes: ['ID_ALUMNO', 'ID_TUTOR'],
                    include: [
                        {
                            model: Alumno,
                            attributes: ['NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO']
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
                },
                {
                    model: Familiar,
                    attributes: ['ID_RF', 'ID_LISTADO_AULA'],
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
                                    attributes: ['NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO']
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
                },
                {
                    model: Derivacion,
                    attributes: ['ID_DERIVACION', 'ID_USUARIO', 'ID_LISTADO_AULA', 'MOTIVO'],
                    include: [
                        {
                            model: Usuario,
                            attributes: ['DNI_USUARIO', 'NOMBRE_USUARIO', 'APELLIDO_USUARIO']
                        },
                        {
                            model: ListadoAula,
                            attributes: ['ID_ALUMNO', 'ID_TUTOR'],
                            include: [
                                {
                                    model: Alumno,
                                    attributes: ['ID_ALUMNO', 'NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO', 'SEXO', 'TELEFONO', 'ID_RELIGION', 'ID_EC', 'DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'],
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
        const response = await ConsultaPs.findOne({
            attributes: [
                'ID_CONSULTA_PS', 'ID_USUARIO', 'TIPO_DERIVACION', 'ID_LISTADO_AULA', 'ID_FAMILIAR', 'ID_DERIVACION',
                'FECHA_ATENCION', 'HORA_INICIO', 'HORA_FIN', 'ASISTENCIA', 'MOTIVO', 'PROBLEMA',
                'RECOMENDACION', 'ASPECTO_FISICO', 'ASEO_PERSONAL', 'CONDUCTA'
            ],
            where: {
                ID_CONSULTA_PS: req.params.id
            },
            include: [
                {
                    model: Usuario,
                    attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'DNI_USUARIO']
                },
                {
                    model: ListadoAula,
                    attributes: ['ID_ALUMNO', 'ID_TUTOR'],
                    include: [
                        {
                            model: Alumno,
                            attributes: ['NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO']
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
                },
                {
                    model: Familiar,
                    attributes: ['ID_RF', 'ID_LISTADO_AULA'],
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
                                    attributes: ['NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO']
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
                },
                {
                    model: Derivacion,
                    attributes: ['ID_DERIVACION', 'ID_USUARIO', 'ID_LISTADO_AULA', 'MOTIVO'],
                    include: [
                        {
                            model: Usuario,
                            attributes: ['DNI_USUARIO', 'NOMBRE_USUARIO', 'APELLIDO_USUARIO']
                        },
                        {
                            model: ListadoAula,
                            attributes: ['ID_ALUMNO', 'ID_TUTOR'],
                            include: [
                                {
                                    model: Alumno,
                                    attributes: ['ID_ALUMNO', 'NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO', 'SEXO', 'TELEFONO', 'ID_RELIGION', 'ID_EC', 'DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'],
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
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const buscar = async (req, res) => {
    const { searchText = '' } = req.body;

    try {
        const response = await ConsultaPs.findAll({
            attributes: [
                'ID_CONSULTA_PS', 'ID_USUARIO', 'TIPO_DERIVACION', 'ID_LISTADO_AULA', 'ID_FAMILIAR', 'ID_DERIVACION',
                'FECHA_ATENCION', 'HORA_INICIO', 'HORA_FIN', 'ASISTENCIA', 'MOTIVO', 'PROBLEMA',
                'RECOMENDACION', 'ASPECTO_FISICO', 'ASEO_PERSONAL', 'CONDUCTA'
            ],
            include: [
                {
                    model: Usuario,
                    attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'DNI_USUARIO']
                },
                {
                    model: ListadoAula,
                    attributes: ['ID_ALUMNO', 'ID_TUTOR'],
                    include: [
                        {
                            model: Alumno,
                            attributes: ['NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO'],
                            where: {
                                DNI_ALUMNO: {
                                    [Op.like]: `%${searchText}%`
                                }
                            }
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
                },
                {
                    model: Familiar,
                    attributes: ['ID_RF', 'ID_LISTADO_AULA'],
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
                                    attributes: ['NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO'],
                                    where: {
                                        DNI_ALUMNO: {
                                            [Op.like]: `%${searchText}%`
                                        }
                                    }
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
                },
                {
                    model: Derivacion,
                    attributes: ['ID_DERIVACION', 'ID_USUARIO', 'ID_LISTADO_AULA', 'MOTIVO'],
                    include: [
                        {
                            model: Usuario,
                            attributes: ['DNI_USUARIO', 'NOMBRE_USUARIO', 'APELLIDO_USUARIO']
                        },
                        {
                            model: ListadoAula,
                            attributes: ['ID_ALUMNO', 'ID_TUTOR'],
                            include: [
                                {
                                    model: Alumno,
                                    attributes: ['ID_ALUMNO', 'NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO', 'SEXO', 'TELEFONO', 'ID_RELIGION', 'ID_EC', 'DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'],
                                    include: [
                                        {
                                            model: Religion,
                                            attributes: ['NOMBRE_RELIGION']
                                        },
                                        {
                                            model: EstadoCivil,
                                            attributes: ['NOMBRE_EC']
                                        }
                                    ],
                                    where: {
                                        DNI_ALUMNO: {
                                            [Op.like]: `%${searchText}%`
                                        }
                                    }
                                },
                                {
                                    model: Tutor,
                                    attributes: ['ID_TUTOR', 'ID_INSTRUCTOR', 'ID_AULA'],
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
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};




export const crear = async (req, res) => {
    const {
        ID_USUARIO, TIPO_DERIVACION, ID_LISTADO_AULA, ID_FAMILIAR, ID_DERIVACION, FECHA_ATENCION,
        HORA_INICIO, HORA_FIN, ASISTENCIA, MOTIVO, PROBLEMA, RECOMENDACION,
        ASPECTO_FISICO, ASEO_PERSONAL, CONDUCTA
    } = req.body;

    try {
        await ConsultaPs.create({
            ID_USUARIO, TIPO_DERIVACION, ID_LISTADO_AULA, ID_FAMILIAR, ID_DERIVACION, FECHA_ATENCION,
            HORA_INICIO, HORA_FIN, ASISTENCIA, MOTIVO, PROBLEMA, RECOMENDACION,
            ASPECTO_FISICO, ASEO_PERSONAL, CONDUCTA
        });


        if (TIPO_DERIVACION === 3 && ID_DERIVACION) {
            await Derivacion.update(
                { ESTADO: true },
                { where: { ID_DERIVACION } }
            );
        }

        res.status(201).json({ msg: "Consulta creada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const actualizar = async (req, res) => {
    const consulta = await ConsultaPs.findOne({
        where: {
            ID_CONSULTA_PS: req.params.id
        }
    });
    if (!consulta) {
        return res.status(404).json({ msg: "Consulta no encontrada" });
    }
    const {
        ID_USUARIO, TIPO_DERIVACION, ID_LISTADO_AULA, ID_FAMILIAR, ID_DERIVACION, FECHA_ATENCION,
        HORA_INICIO, HORA_FIN, ASISTENCIA, MOTIVO, PROBLEMA, RECOMENDACION,
        ASPECTO_FISICO, ASEO_PERSONAL, CONDUCTA
    } = req.body;
    try {
        await ConsultaPs.update({
            ID_USUARIO, TIPO_DERIVACION, ID_LISTADO_AULA, ID_FAMILIAR, ID_DERIVACION, FECHA_ATENCION,
            HORA_INICIO, HORA_FIN, ASISTENCIA, MOTIVO, PROBLEMA, RECOMENDACION,
            ASPECTO_FISICO, ASEO_PERSONAL, CONDUCTA
        }, {
            where: {
                ID_CONSULTA_PS: consulta.ID_CONSULTA_PS
            }
        });

        res.status(200).json({ msg: "Consulta actualizada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const eliminar = async (req, res) => {
    const consulta = await ConsultaPs.findOne({
        where: {
            ID_CONSULTA_PS: req.params.id
        }
    });
    if (!consulta) {
        return res.status(404).json({ msg: "Consulta no encontrada" });
    }
    try {
        await ConsultaPs.destroy({
            where: {
                ID_CONSULTA_PS: consulta.ID_CONSULTA_PS
            }
        });
        res.status(200).json({ msg: "Consulta eliminada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


