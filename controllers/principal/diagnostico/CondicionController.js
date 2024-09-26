import Condicion from "../../../models/principal/diagnostico/CondicionModel.js";
import CatCond from "../../../models/principal/diagnostico/CatCondModel.js";
import db from "../../../config/Database.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Condicion.findAll({
            attributes: ['ID_CONDICION', 'NOMBRE_CONDICION', 'ESTADO'],
            where: { ESTADO: true },
            include: [
                {
                    model: CatCond,
                    attributes: ['NOMBRE_CAT_COND']
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
        const response = await Condicion.findOne({
            attributes: ['ID_CONDICION', 'NOMBRE_CONDICION', 'ESTADO'],
            where: {
                ID_CONDICION: req.params.id,
                ESTADO: true
            },
            include: [
                {
                    model: CatCond,
                    attributes: ['NOMBRE_CAT_COND']
                }
            ]
        });
        if (!response) {
            return res.status(404).json({ msg: "Condición no encontrada" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const crear = async (req, res) => {
    const { NOMBRE_CONDICION, ID_CAT_COND } = req.body;
    const transaction = await db.transaction();

    try {
        const existeCondicion = await Condicion.findOne({
            where: {
                NOMBRE_CONDICION: NOMBRE_CONDICION.trim(),
                ESTADO: true
            },
            transaction
        });

        if (existeCondicion) {
            await transaction.rollback();
            return res.status(400).json({ msg: "El nombre de la condición ya existe" });
        }

        await Condicion.create({
            NOMBRE_CONDICION: NOMBRE_CONDICION.trim(),
            ID_CAT_COND
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ msg: "Condición creada" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};

export const actualizar = async (req, res) => {
    const { NOMBRE_CONDICION, ID_CAT_COND } = req.body;
    const transaction = await db.transaction();

    try {
        const condicion = await Condicion.findOne({
            where: {
                ID_CONDICION: req.params.id,
                ESTADO: true
            },
            transaction
        });

        if (!condicion) {
            await transaction.rollback();
            return res.status(404).json({ msg: "Condición no encontrada" });
        }

        if (condicion.NOMBRE_CONDICION !== NOMBRE_CONDICION.trim()) {
            const existeCondicion = await Condicion.findOne({
                where: {
                    NOMBRE_CONDICION: NOMBRE_CONDICION.trim(),
                    ESTADO: true,
                    ID_CONDICION: { [Op.ne]: condicion.ID_CONDICION }
                },
                transaction
            });
            if (existeCondicion) {
                await transaction.rollback();
                return res.status(400).json({ msg: "El nombre de la condición ya existe" });
            }
        }

        await Condicion.update({
            NOMBRE_CONDICION: NOMBRE_CONDICION.trim(),
            ID_CAT_COND
        }, {
            where: { ID_CONDICION: condicion.ID_CONDICION },
            transaction
        });

        await transaction.commit();
        res.status(200).json({ msg: "Condición actualizada" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};

export const eliminar = async (req, res) => {
    const transaction = await db.transaction();

    try {
        const condicion = await Condicion.findOne({
            where: {
                ID_CONDICION: req.params.id,
                ESTADO: true
            },
            transaction
        });

        if (!condicion) {
            await transaction.rollback();
            return res.status(404).json({ msg: "Condición no encontrada" });
        }

        await Condicion.update({ ESTADO: false }, {
            where: { ID_CONDICION: condicion.ID_CONDICION },
            transaction
        });

        await transaction.commit();
        res.status(200).json({ msg: "Condición eliminada" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};


export const obtenerPorCategoria = async (req, res) => {
    try {
        const { idCatCond } = req.params;
        const response = await Condicion.findAll({
            attributes: ['ID_CONDICION', 'NOMBRE_CONDICION'],
            where: {
                ID_CAT_COND: idCatCond,
                ESTADO: true
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Condiciones no encontradas para esta categoría" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

