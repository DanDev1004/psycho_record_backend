import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar
}from "../../../controllers/principal/diagnostico/CondicionController.js";

import { verificarUsuarioLogeado, admin_psico_permiso } from "../../../middleware/AuthUser.js";

const CondicionRouter = express.Router();

CondicionRouter.get('/consulta',verificarUsuarioLogeado,admin_psico_permiso, obtenerTodos);
CondicionRouter.get('/consulta/:id',verificarUsuarioLogeado,admin_psico_permiso, obtenerPorId);
CondicionRouter.post('/consulta',verificarUsuarioLogeado,admin_psico_permiso, crear);
CondicionRouter.patch('/consulta/:id',verificarUsuarioLogeado,admin_psico_permiso, actualizar);
CondicionRouter.delete('/consulta/:id',verificarUsuarioLogeado,admin_psico_permiso, eliminar);

export default CondicionRouter;
