import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar
} from "../../../controllers/principal/diagnostico/CatCondController.js";

import { verificarUsuarioLogeado, admin_psico_permiso } from "../../../middleware/AuthUser.js";

const CatCondRouter = express.Router();

CatCondRouter.get('/catcond',verificarUsuarioLogeado,admin_psico_permiso, obtenerTodos);
CatCondRouter.get('/catcond/:id',verificarUsuarioLogeado,admin_psico_permiso, obtenerPorId);
CatCondRouter.post('/catcond',verificarUsuarioLogeado,admin_psico_permiso, crear);
CatCondRouter.patch('/catcond/:id',verificarUsuarioLogeado,admin_psico_permiso, actualizar);
CatCondRouter.delete('/catcond/:id',verificarUsuarioLogeado,admin_psico_permiso, eliminar);

export default CatCondRouter;
