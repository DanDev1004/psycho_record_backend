import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
} from "../controllers/UsuarioController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const UsuarioRouter = express.Router();

UsuarioRouter.get('/usuario',verificarUsuarioLogeado,adminPermiso,obtenerTodos);
UsuarioRouter.get('/usuario/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
UsuarioRouter.post('/usuario',verificarUsuarioLogeado,adminPermiso, crear);
UsuarioRouter.patch('/usuario/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
UsuarioRouter.delete('/usuario/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

export default UsuarioRouter;