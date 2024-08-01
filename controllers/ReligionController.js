import Religion from "../models/ReligionModel.js";

export const obtenerTodos = async(req, res) => {
    try {
        const response = await Religion.findAll({
            attributes: ['ID_RELIGION', 'NOMBRE_RELIGION']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async(req, res) => {
    try {
        const response = await Religion.findOne({
            attributes: ['ID_RELIGION', 'NOMBRE_RELIGION'],
            where: {
                ID_RELIGION: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async(req, res) => {
    const { NOMBRE_RELIGION } = req.body;

    try {
        await Religion.create({
            NOMBRE_RELIGION: NOMBRE_RELIGION
        });
        res.status(201).json({ msg: "Religión creada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async(req, res) => {
    const religion = await Religion.findOne({
        where: {
            ID_RELIGION: req.params.id
        }
    });
    if (!religion) {
        return res.status(404).json({ msg: "Religión no encontrada" });
    }
    const { NOMBRE_RELIGION } = req.body;
    try {
        await Religion.update({
            NOMBRE_RELIGION: NOMBRE_RELIGION,
        }, {
            where: {
                ID_RELIGION: religion.ID_RELIGION
            }
        });

        res.status(200).json({ msg: "Religión actualizada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async(req, res) => {
    const religion = await Religion.findOne({
        where: {
            ID_RELIGION: req.params.id
        }
    });
    if (!religion) {
        return res.status(404).json({ msg: "Religión no encontrada" });
    }
    try {
        await Religion.destroy({
            where: {
                ID_RELIGION: religion.ID_RELIGION
            }
        });
        res.status(200).json({ msg: "Religión eliminada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
