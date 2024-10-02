import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    buscar
} from "../../controllers/principal/AlumnoController.js";
import { verificarUsuarioLogeado, adminPermiso, admin_psico_tutor_permiso } from "../../middleware/AuthUser.js";

const AlumnoRouter = express.Router();

AlumnoRouter.get('/alumno', verificarUsuarioLogeado, admin_psico_tutor_permiso, obtenerTodos);
AlumnoRouter.get('/alumno/:id', verificarUsuarioLogeado, admin_psico_tutor_permiso, obtenerPorId);
AlumnoRouter.post('/alumno', verificarUsuarioLogeado, adminPermiso, crear);
AlumnoRouter.patch('/alumno/:id', verificarUsuarioLogeado, adminPermiso, actualizar);
AlumnoRouter.delete('/alumno/:id', verificarUsuarioLogeado, adminPermiso, eliminar);
AlumnoRouter.post('/alumno/buscar', verificarUsuarioLogeado, admin_psico_tutor_permiso, buscar);

export default AlumnoRouter;
