import Tutor from "../models/TutorModel.js";
import Instructor from "../models/InstructorModel.js";
import Aula from "../models/AulaModel.js";
import AreaPe from "../models/AreaPeModel.js";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Tutor.findAll({
            attributes: ['ID_TUTOR', 'ID_INSTRUCTOR', 'ID_AULA', 'FECHA_INICIO', 'FECHA_FIN', 'ESTADO'],
            include: [
                {
                    model: Instructor,
                    attributes: ['NOMBRE_INSTRUCTOR', 'APELLIDO_INSTRUCTOR','ID_AREA_PE'],
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
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async (req, res) => {
    try {
        const response = await Tutor.findOne({
            attributes: ['ID_TUTOR', 'ID_INSTRUCTOR', 'ID_AULA', 'FECHA_INICIO', 'FECHA_FIN', 'ESTADO'],
            where: {
                ID_TUTOR: req.params.id
            },
            include:[
                {
                    model: Instructor,
                    attributes: ['NOMBRE_INSTRUCTOR', 'APELLIDO_INSTRUCTOR','ID_AREA_PE'],
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
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async (req, res) => {
    const { ID_INSTRUCTOR, ID_AULA, FECHA_INICIO, FECHA_FIN, ESTADO } = req.body;

    try {
        await Tutor.create({
            ID_INSTRUCTOR: ID_INSTRUCTOR,
            ID_AULA: ID_AULA,
            FECHA_INICIO: FECHA_INICIO,
            FECHA_FIN: FECHA_FIN,
            ESTADO: ESTADO
        });
        res.status(201).json({ msg: "Tutor creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async (req, res) => {
    const tutor = await Tutor.findOne({
        where: {
            ID_TUTOR: req.params.id
        }
    });
    if (!tutor) {
        return res.status(404).json({ msg: "Tutor no encontrado" });
    }
    const { ID_INSTRUCTOR, ID_AULA, FECHA_INICIO, FECHA_FIN, ESTADO } = req.body;
    try {
        await Tutor.update({
            ID_INSTRUCTOR: ID_INSTRUCTOR,
            ID_AULA: ID_AULA,
            FECHA_INICIO: FECHA_INICIO,
            FECHA_FIN: FECHA_FIN,
            ESTADO: ESTADO
        }, {
            where: {
                ID_TUTOR: tutor.ID_TUTOR
            }
        });

        res.status(200).json({ msg: "Tutor actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async (req, res) => {
    const tutor = await Tutor.findOne({
        where: {
            ID_TUTOR: req.params.id
        }
    });
    if (!tutor) {
        return res.status(404).json({ msg: "Tutor no encontrado" });
    }
    try {
        await Tutor.destroy({
            where: {
                ID_TUTOR: tutor.ID_TUTOR
            }
        });
        res.status(200).json({ msg: "Tutor eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
