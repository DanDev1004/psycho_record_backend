import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    buscar
} from "../../controllers/principal/UsuarioController.js";
import { verificarUsuarioLogeado, adminPermiso,admin_psico_permiso, admin_psico_tutor_permiso } from "../../middleware/AuthUser.js";

const UsuarioRouter = express.Router();

UsuarioRouter.get('/usuario', verificarUsuarioLogeado, admin_psico_tutor_permiso, obtenerTodos);
UsuarioRouter.get('/usuario/:id', verificarUsuarioLogeado, admin_psico_tutor_permiso, obtenerPorId);
UsuarioRouter.post('/usuario', verificarUsuarioLogeado, adminPermiso, crear);
UsuarioRouter.patch('/usuario/:id', verificarUsuarioLogeado, admin_psico_tutor_permiso, actualizar);
UsuarioRouter.delete('/usuario/:id', verificarUsuarioLogeado, adminPermiso, eliminar);
UsuarioRouter.post('/usuario/buscar', verificarUsuarioLogeado, adminPermiso, buscar);

export default UsuarioRouter;
