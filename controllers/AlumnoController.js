import Alumno from "../models/AlumnoModel.js";
import Religion from "../models/ReligionModel.js";
import EstadoCivil from "../models/EstadoCivilModel.js";
import Aula from "../models/AulaModel.js";
import AreaPe from "../models/AreaPeModel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Alumno.findAll({
            attributes: [
                'ID_ALUMNO', 'NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO', 
                'SEXO', 'TELEFONO', 'ID_RELIGION', 'ID_EC', 'ID_AULA', 
                'DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'
            ],
            include: [
                {
                    model: Religion,
                    attributes: ['NOMBRE_RELIGION']
                },
                {
                    model: EstadoCivil,
                    attributes: ['NOMBRE_EC']
                },
                {
                    model: Aula,
                    attributes: ['ANIO', 'PERIODO', 'CICLO','ID_AREA_PE'],
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
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await Alumno.findOne({
            attributes: [
                'ID_ALUMNO', 'NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO', 
                'SEXO', 'TELEFONO', 'ID_RELIGION', 'ID_EC', 'ID_AULA', 
                'DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'
            ],
            where: {
                ID_ALUMNO: req.params.id
            },
            include: [
                {
                    model: Religion,
                    attributes: ['NOMBRE_RELIGION']
                },
                {
                    model: EstadoCivil,
                    attributes: ['NOMBRE_EC']
                },
                {
                    model: Aula,
                    attributes: ['ANIO', 'PERIODO', 'CICLO','ID_AREA_PE'],
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
}

export const buscar = async (req, res) => {
    try {
        const { searchText } = req.body;
        const response = await Alumno.findAll({
            attributes: [
                'ID_ALUMNO', 'NOMBRE_ALUMNO', 'APELLIDO_ALUMNO', 'DNI_ALUMNO',
                'SEXO', 'TELEFONO', 'ID_RELIGION', 'ID_EC', 'ID_AULA',
                'DIRECCION_NACIMIENTO', 'FECHA_NACIMIENTO', 'DOMICILIO'
            ],
            include: [
                {
                    model: Religion,
                    attributes: ['NOMBRE_RELIGION']
                },
                {
                    model: EstadoCivil,
                    attributes: ['NOMBRE_EC']
                },
                {
                    model: Aula,
                    attributes: ['ANIO', 'PERIODO', 'CICLO','ID_AREA_PE'],
                    include: [
                        {
                            model: AreaPe,
                            attributes: ['NOMBRE_AREA_PE']
                        }
                    ]
                }
            ],
            where: {
                [Op.or]: [
                    { NOMBRE_ALUMNO: { [Op.like]: `%${searchText}%` } },
                    { APELLIDO_ALUMNO: { [Op.like]: `%${searchText}%` } },
                    { DNI_ALUMNO: { [Op.like]: `%${searchText}%` } }
                ]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const crear = async (req, res) => {
    const { 
        NOMBRE_ALUMNO, APELLIDO_ALUMNO, DNI_ALUMNO, SEXO, EDAD, TELEFONO, 
        ID_RELIGION, ID_EC, ID_AULA, DIRECCION_NACIMIENTO, FECHA_NACIMIENTO, DOMICILIO 
    } = req.body;

    try {
        await Alumno.create({
            NOMBRE_ALUMNO: NOMBRE_ALUMNO.trim(),
            APELLIDO_ALUMNO: APELLIDO_ALUMNO.trim(),
            DNI_ALUMNO: DNI_ALUMNO.trim(),
            SEXO: SEXO,
            TELEFONO: TELEFONO || null,
            ID_RELIGION: ID_RELIGION || null,
            ID_EC: ID_EC || null,
            ID_AULA: ID_AULA || null,
            DIRECCION_NACIMIENTO: DIRECCION_NACIMIENTO || null,
            FECHA_NACIMIENTO: FECHA_NACIMIENTO,
            DOMICILIO: DOMICILIO || null
        });
        res.status(201).json({ msg: "Alumno creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const alumno = await Alumno.findOne({
        where: {
            ID_ALUMNO: req.params.id
        }
    });
    if (!alumno) {
        return res.status(404).json({ msg: "Alumno no encontrado" });
    }
    const { 
        NOMBRE_ALUMNO, APELLIDO_ALUMNO, DNI_ALUMNO, SEXO, TELEFONO, 
        ID_RELIGION, ID_EC, ID_AULA, DIRECCION_NACIMIENTO, FECHA_NACIMIENTO, DOMICILIO 
    } = req.body;
    try {
        await Alumno.update({
            NOMBRE_ALUMNO: NOMBRE_ALUMNO,
            APELLIDO_ALUMNO: APELLIDO_ALUMNO,
            DNI_ALUMNO: DNI_ALUMNO,
            SEXO: SEXO,
            TELEFONO: TELEFONO,
            ID_RELIGION: ID_RELIGION,
            ID_EC: ID_EC,
            ID_AULA: ID_AULA,
            DIRECCION_NACIMIENTO: DIRECCION_NACIMIENTO,
            FECHA_NACIMIENTO: FECHA_NACIMIENTO,
            DOMICILIO: DOMICILIO
        }, {
            where: {
                ID_ALUMNO: alumno.ID_ALUMNO
            }
        });

        res.status(200).json({ msg: "Alumno actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const alumno = await Alumno.findOne({
        where: {
            ID_ALUMNO: req.params.id
        }
    });
    if (!alumno) {
        return res.status(404).json({ msg: "Alumno no encontrado" });
    }
    try {
        await Alumno.destroy({
            where: {
                ID_ALUMNO: alumno.ID_ALUMNO
            }
        });
        res.status(200).json({ msg: "Alumno eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
