import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
} from "../controllers/AlumnoController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const AlumnoRouter = express.Router();

AlumnoRouter.get('/alumno',verificarUsuarioLogeado,adminPermiso, obtenerTodos);
AlumnoRouter.get('/alumno/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
AlumnoRouter.post('/alumno',verificarUsuarioLogeado,adminPermiso, crear);
AlumnoRouter.patch('/alumno/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
AlumnoRouter.delete('/alumno/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

export default AlumnoRouter;