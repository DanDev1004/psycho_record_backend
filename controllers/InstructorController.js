import Instructor from "../models/InstructorModel.js";
import AreaPe from "../models/AreaPeModel.js";
import { Op } from "sequelize";
import Tutor from "../models/TutorModel.js";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Instructor.findAll({
            attributes: ['ID_INSTRUCTOR', 'DNI_INSTRUCTOR', 'NOMBRE_INSTRUCTOR', 'APELLIDO_INSTRUCTOR', 'ID_AREA_PE', 'FECHA_INICIO', 'FECHA_FIN', 'ESTADO'],
            include: [
                {
                    model: AreaPe,
                    attributes: ['NOMBRE_AREA_PE']
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
        const response = await Instructor.findOne({
            attributes: ['ID_INSTRUCTOR', 'DNI_INSTRUCTOR', 'NOMBRE_INSTRUCTOR', 'APELLIDO_INSTRUCTOR', 'ID_AREA_PE', 'FECHA_INICIO', 'FECHA_FIN', 'ESTADO'],
            where: {
                ID_INSTRUCTOR: req.params.id
            },
            include: [
                {
                    model: AreaPe,
                    attributes: ['NOMBRE_AREA_PE']
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

        const response = await Instructor.findAll({
            attributes: ['ID_INSTRUCTOR', 'DNI_INSTRUCTOR', 'NOMBRE_INSTRUCTOR', 'APELLIDO_INSTRUCTOR', 'ID_AREA_PE', 'FECHA_INICIO', 'FECHA_FIN', 'ESTADO'],
            include: [
                {
                    model: AreaPe,
                    attributes: ['NOMBRE_AREA_PE'],
                }
            ],
            where: {
                [Op.or]: [
                    { DNI_INSTRUCTOR: { [Op.like]: `%${searchText}%` } },
                    { NOMBRE_INSTRUCTOR: { [Op.like]: `%${searchText}%` } },
                    { APELLIDO_INSTRUCTOR: { [Op.like]: `%${searchText}%` } }
                ]
            },
        });

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const crear = async (req, res) => {
    const { DNI_INSTRUCTOR, NOMBRE_INSTRUCTOR, APELLIDO_INSTRUCTOR, ID_AREA_PE, FECHA_INICIO, FECHA_FIN, ESTADO } = req.body;

    try {
        const newInstructor = await Instructor.create({
            DNI_INSTRUCTOR,
            NOMBRE_INSTRUCTOR,
            APELLIDO_INSTRUCTOR,
            ID_AREA_PE,
            FECHA_INICIO,
            FECHA_FIN,
            ESTADO
        });

        await Tutor.create({
            ID_INSTRUCTOR: newInstructor.ID_INSTRUCTOR
        });

        res.status(201).json({ msg: "Instructor y Tutor creados" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const instructor = await Instructor.findOne({
        where: {
            ID_INSTRUCTOR: req.params.id
        }
    });
    if (!instructor) {
        return res.status(404).json({ msg: "Instructor no encontrado" });
    }
    const { DNI_INSTRUCTOR, NOMBRE_INSTRUCTOR, APELLIDO_INSTRUCTOR, ID_AREA_PE, FECHA_INICIO, FECHA_FIN, ESTADO } = req.body;
    try {
        await Instructor.update({
            DNI_INSTRUCTOR,
            NOMBRE_INSTRUCTOR,
            APELLIDO_INSTRUCTOR,
            ID_AREA_PE,
            FECHA_INICIO,
            FECHA_FIN,
            ESTADO
        }, {
            where: {
                ID_INSTRUCTOR: instructor.ID_INSTRUCTOR
            }
        });

        res.status(200).json({ msg: "Instructor actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const instructor = await Instructor.findOne({
        where: {
            ID_INSTRUCTOR: req.params.id
        }
    });
    if (!instructor) {
        return res.status(404).json({ msg: "Instructor no encontrado" });
    }
    try {
        await Instructor.destroy({
            where: {
                ID_INSTRUCTOR: instructor.ID_INSTRUCTOR
            }
        });
        res.status(200).json({ msg: "Instructor eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
