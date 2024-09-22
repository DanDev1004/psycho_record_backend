import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
} from "../../controllers/mantenimiento/AreaPeController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../../middleware/AuthUser.js";

const AreaPeRouter = express.Router();

AreaPeRouter.get('/areape',verificarUsuarioLogeado,adminPermiso,obtenerTodos);
AreaPeRouter.get('/areape/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
AreaPeRouter.post('/areape',verificarUsuarioLogeado,adminPermiso, crear);
AreaPeRouter.patch('/areape/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
AreaPeRouter.delete('/areape/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

export default AreaPeRouter;