import CatCond from "../../../models/principal/diagnostico/CatCondModel.js"
import db from "../../../config/Database.js";


export const obtenerTodos = async (req, res) => {
    try {
        const response = await CatCond.findAll({
            attributes: ['ID_CAT_COND', 'NOMBRE_CAT_COND', 'ESTADO'],
            where: { ESTADO: true }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const obtenerPorId = async (req, res) => {
    try {
        const response = await CatCond.findOne({
            attributes: ['ID_CAT_COND', 'NOMBRE_CAT_COND', 'ESTADO'],
            where: {
                ID_CAT_COND: req.params.id,
                ESTADO: true
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Categoría de condición no encontrada" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const crear = async (req, res) => {
    const { NOMBRE_CAT_COND } = req.body;
    const transaction = await db.transaction();

    try {
      
        const existeCatCond = await CatCond.findOne({
            where: { NOMBRE_CAT_COND: NOMBRE_CAT_COND.trim() },
            transaction
        });

        if (existeCatCond) {
            await transaction.rollback();
            return res.status(400).json({ msg: "El nombre de la categoría de condición ya existe" });
        }

        await CatCond.create({
            NOMBRE_CAT_COND: NOMBRE_CAT_COND.trim()
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ msg: "Categoría de condición creada" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};


export const actualizar = async (req, res) => {
    const { NOMBRE_CAT_COND } = req.body;
    const transaction = await db.transaction();

    try {
        const catCond = await CatCond.findOne({
            where: {
                ID_CAT_COND: req.params.id,
                ESTADO: true
            },
            transaction
        });

        if (!catCond) {
            await transaction.rollback();
            return res.status(404).json({ msg: "Categoría de condición no encontrada" });
        }

        if (catCond.NOMBRE_CAT_COND !== NOMBRE_CAT_COND.trim()) {
            const existeCatCond = await CatCond.findOne({
                where: {
                    NOMBRE_CAT_COND: NOMBRE_CAT_COND.trim(),
                    ID_CAT_COND: { [Op.ne]: catCond.ID_CAT_COND }
                },
                transaction
            });
            if (existeCatCond) {
                await transaction.rollback();
                return res.status(400).json({ msg: "El nombre de la categoría de condición ya existe" });
            }
        }

        await CatCond.update({
            NOMBRE_CAT_COND: NOMBRE_CAT_COND.trim()
        }, {
            where: { ID_CAT_COND: catCond.ID_CAT_COND },
            transaction
        });

        await transaction.commit();
        res.status(200).json({ msg: "Categoría de condición actualizada" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};


export const eliminar = async (req, res) => {
    const transaction = await db.transaction();

    try {
        const catCond = await CatCond.findOne({
            where: {
                ID_CAT_COND: req.params.id,
                ESTADO: true
            },
            transaction
        });

        if (!catCond) {
            await transaction.rollback();
            return res.status(404).json({ msg: "Categoría de condición no encontrada" });
        }

        await CatCond.update({ ESTADO: false }, {
            where: { ID_CAT_COND: catCond.ID_CAT_COND },
            transaction
        });

        await transaction.commit();
        res.status(200).json({ msg: "Categoría de condición eliminada" });
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ msg: error.message });
    }
};
