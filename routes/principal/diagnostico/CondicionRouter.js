import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar,
    obtenerPorCategoria
}from "../../../controllers/principal/diagnostico/CondicionController.js";

import { verificarUsuarioLogeado, admin_psico_permiso } from "../../../middleware/AuthUser.js";

const CondicionRouter = express.Router();

CondicionRouter.get('/condiciones',verificarUsuarioLogeado,admin_psico_permiso, obtenerTodos);
CondicionRouter.get('/condiciones/:id',verificarUsuarioLogeado,admin_psico_permiso, obtenerPorId);
CondicionRouter.post('/condiciones',verificarUsuarioLogeado,admin_psico_permiso, crear);
CondicionRouter.patch('/condiciones/:id',verificarUsuarioLogeado,admin_psico_permiso, actualizar);
CondicionRouter.delete('/condiciones/:id',verificarUsuarioLogeado,admin_psico_permiso, eliminar);

CondicionRouter.get('/condiciones/categoria/:idCatCond', verificarUsuarioLogeado, admin_psico_permiso, obtenerPorCategoria);

export default CondicionRouter;
