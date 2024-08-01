import Rol from "../models/RolModel.js";

export const obtenerTodos = async(req, res) => {
    try {
        const response = await Rol.findAll({
            attributes: ['ID_ROL','NOMBRE_ROL'] 
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const obtenerPorId = async(req, res) => {
    try {
        const response = await Rol.findOne({
            attributes: ['ID_ROL','NOMBRE_ROL'],
            where: {
                ID_ROL: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const crear = async(req, res) => {
    const {NOMBRE_ROL} = req.body;

    try {
        await Rol.create({
            NOMBRE_ROL: NOMBRE_ROL
        });
        res.status(201).json({ msg: "rol creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const actualizar = async(req, res) => {
    const rol = await Rol.findOne({
        where: {
            ID_ROL: req.params.id
        }
    });
    if (!rol){
     return res.status(404).json({ msg: "rol no encontrado" });
    }
    const {NOMBRE_ROL } = req.body;
    try {
        await Rol.update({
            NOMBRE_ROL: NOMBRE_ROL,
        },{
            where: {
                ID_ROL: rol.ID_ROL
            }
        });

        res.status(200).json({ msg: "rol actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const eliminar = async(req, res) => {
    const rol = await Rol.findOne({
        where: {
            ID_ROL: req.params.id
        }
    });
    if (!rol){
      return res.status(404).json({ msg: "rol no encontrado" });
    }   
    try {
        await Rol.destroy({
            where: {
                ID_ROL: rol.ID_ROL
            }
        });
        res.status(200).json({ msg: "rol eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
