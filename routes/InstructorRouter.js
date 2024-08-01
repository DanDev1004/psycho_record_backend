import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
} from "../controllers/InstructorController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const instructorRouter = express.Router();

instructorRouter.get('/instructor',verificarUsuarioLogeado,adminPermiso,obtenerTodos);
instructorRouter.get('/instructor/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
instructorRouter.post('/instructor',verificarUsuarioLogeado,adminPermiso, crear);
instructorRouter.patch('/instructor/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
instructorRouter.delete('/instructor/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

export default instructorRouter;