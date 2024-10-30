import Alumno from "../../models/principal/AlumnoModel.js";
import EstadoCivil from "../../models/mantenimiento/EstadoCivilModel.js";
import Religion from "../../models/mantenimiento/ReligionModel.js";
import AreaPe from "../../models/mantenimiento/AreaPeModel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Alumno.findAll({
            attributes: ['ID_ALUMNO', 'NOMBRES', 'APELLIDOS', 'DNI', 'SEXO', 'TELEFONO', 'CICLO', 'TURNO', 'DIR_NAC', 'FECH_NAC', 'DOMICILIO', 'ESTADO'],
            where: { ESTADO: true },
            include: [
                {
                    model: EstadoCivil,
                    attributes: ['NOMBRE_EC']
                },
                {
                    model: Religion,
                    attributes: ['NOMBRE_RELIGION']
                },
                {
                    model: AreaPe,
                    attributes: ['ID_AREA_PE','NOMBRE_AREA_PE']
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
        const response = await Alumno.findOne({
            attributes: ['ID_ALUMNO', 'NOMBRES', 'APELLIDOS', 'DNI', 'SEXO', 'TELEFONO', 'CICLO', 'TURNO', 'DIR_NAC', 'FECH_NAC', 'DOMICILIO', 'ESTADO'],
            where: {
                ID_ALUMNO: req.params.id,
                ESTADO: true
            },
            include: [
                {
                    model: EstadoCivil,
                    attributes: ['NOMBRE_EC']
                },
                {
                    model: Religion,
                    attributes: ['NOMBRE_RELIGION']
                },
                {
                    model: AreaPe,
                    attributes: ['ID_AREA_PE','NOMBRE_AREA_PE']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const crear = async (req, res) => {
    const { NOMBRES, APELLIDOS, DNI, SEXO, TELEFONO, CICLO, TURNO, DIR_NAC, FECH_NAC, DOMICILIO, ID_EC, ID_RELIGION, ID_AREA_PE } = req.body;

    try {
        const existeAlumno = await Alumno.findOne({
            where: {
                [Op.or]: [
                    { DNI: DNI }
                ],
                ESTADO: true
            }
        });

        if (existeAlumno) {
            return res.status(400).json({ msg: "DNI ya está en uso" });
        }

        await Alumno.create({
            NOMBRES,
            APELLIDOS,
            DNI,
            SEXO,
            TELEFONO,
            CICLO,
            TURNO,
            DIR_NAC,
            FECH_NAC,
            DOMICILIO,
            ID_EC,
            ID_RELIGION,
            ID_AREA_PE
        });
        res.status(201).json({ msg: "Alumno creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const actualizar = async (req, res) => {
    const alumno = await Alumno.findOne({
        where: {
            ID_ALUMNO: req.params.id,
            ESTADO: true
        }
    });
    if (!alumno) {
        return res.status(404).json({ msg: "Alumno no encontrado" });
    }

    const { NOMBRES, APELLIDOS, DNI, SEXO, TELEFONO, CICLO, TURNO, DIR_NAC, FECH_NAC, DOMICILIO, ID_EC, ID_RELIGION, ID_AREA_PE } = req.body;

    try {
        const existeAlumno = await Alumno.findOne({
            where: {
                [Op.or]: [
                    { DNI: DNI, ESTADO: true, ID_ALUMNO: { [Op.ne]: req.params.id } }
                ]
            }
        });

        if (existeAlumno) {
            return res.status(400).json({ msg: "DNI ya está en uso" });
        }

        await Alumno.update({
            NOMBRES,
            APELLIDOS,
            DNI,
            SEXO,
            TELEFONO,
            CICLO,
            TURNO,
            DIR_NAC,
            FECH_NAC,
            DOMICILIO,
            ID_EC,
            ID_RELIGION,
            ID_AREA_PE
        }, {
            where: {
                ID_ALUMNO: alumno.ID_ALUMNO
            }
        });
        res.status(200).json({ msg: "Alumno actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const eliminar = async (req, res) => {
    const alumno = await Alumno.findOne({
        where: {
            ID_ALUMNO: req.params.id,
            ESTADO: true
        }
    });

    if (!alumno) {
        return res.status(404).json({ msg: "Alumno no encontrado" });
    }

    try {
        await Alumno.update({
            ESTADO: false
        }, {
            where: {
                ID_ALUMNO: alumno.ID_ALUMNO
            }
        });
        res.status(200).json({ msg: "Alumno desactivado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const buscar = async (req, res) => {
    try {
        const { searchText } = req.body;
        const response = await Alumno.findAll({
            attributes: ['ID_ALUMNO', 'NOMBRES', 'APELLIDOS', 'DNI', 'SEXO', 'TELEFONO', 'CICLO', 'TURNO', 'DIR_NAC', 'FECH_NAC', 'DOMICILIO', 'ESTADO'],
            include: [
                {
                    model: EstadoCivil,
                    attributes: ['NOMBRE_EC']
                },
                {
                    model: Religion,
                    attributes: ['NOMBRE_RELIGION']
                },
                {
                    model: AreaPe,
                    attributes: ['ID_AREA_PE','NOMBRE_AREA_PE']
                }
            ],
            where: {
                ESTADO: true,
                [Op.or]: [
                    { DNI: { [Op.like]: `%${searchText}%` } },
                    { NOMBRES: { [Op.like]: `%${searchText}%` } },
                    { APELLIDOS: { [Op.like]: `%${searchText}%` } },
                    { '$AREA_PE.NOMBRE_AREA_PE$': { [Op.like]: `%${searchText}%` } }
                ]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
