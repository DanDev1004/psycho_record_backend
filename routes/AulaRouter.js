import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
} from "../controllers/AulaController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const AulaRouter = express.Router();

AulaRouter.get('/aula',verificarUsuarioLogeado,adminPermiso,obtenerTodos);
AulaRouter.get('/aula/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
AulaRouter.post('/aula',verificarUsuarioLogeado,adminPermiso, crear);
AulaRouter.patch('/aula/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
AulaRouter.delete('/aula/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

export default AulaRouter;