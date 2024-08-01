import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
} from "../controllers/TutorController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const TutorRouter = express.Router();

TutorRouter.get('/tutor',verificarUsuarioLogeado,adminPermiso, obtenerTodos);
TutorRouter.get('/tutor/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
TutorRouter.post('/tutor',verificarUsuarioLogeado,adminPermiso, crear);
TutorRouter.patch('/tutor/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
TutorRouter.delete('/tutor/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

export default TutorRouter;