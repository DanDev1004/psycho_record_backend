import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
} from "../../controllers/mantenimiento/RolController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../../middleware/AuthUser.js";

const RolRouter = express.Router();

RolRouter.get('/rol',verificarUsuarioLogeado,adminPermiso, obtenerTodos);
RolRouter.get('/rol/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
RolRouter.post('/rol',verificarUsuarioLogeado,adminPermiso, crear);
RolRouter.patch('/rol/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
RolRouter.delete('/rol/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

export default RolRouter;