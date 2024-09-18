import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
} from "../../controllers/mantenimiento/ReligionController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../../middleware/AuthUser.js";

const ReligionRouter = express.Router();

ReligionRouter.get('/religion',verificarUsuarioLogeado,adminPermiso, obtenerTodos);
ReligionRouter.get('/religion/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
ReligionRouter.post('/religion',verificarUsuarioLogeado,adminPermiso, crear);
ReligionRouter.patch('/religion/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
ReligionRouter.delete('/religion/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

export default ReligionRouter;