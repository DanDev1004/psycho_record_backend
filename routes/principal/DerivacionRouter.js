import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar,
    buscar
} from "../../controllers/principal/DerivacionController.js";

import { verificarUsuarioLogeado, admin_psico_tutor_permiso } from "../../middleware/AuthUser.js";

const DerivacionRouter = express.Router();

DerivacionRouter.get('/derivacion', verificarUsuarioLogeado,admin_psico_tutor_permiso, obtenerTodos);
DerivacionRouter.get('/derivacion/:id', verificarUsuarioLogeado,admin_psico_tutor_permiso, obtenerPorId);
DerivacionRouter.post('/derivacion', verificarUsuarioLogeado,admin_psico_tutor_permiso, crear);
DerivacionRouter.patch('/derivacion/:id', verificarUsuarioLogeado,admin_psico_tutor_permiso, actualizar);
DerivacionRouter.delete('/derivacion/:id', verificarUsuarioLogeado,admin_psico_tutor_permiso, eliminar);
DerivacionRouter.post('/derivacion/buscar', verificarUsuarioLogeado,admin_psico_tutor_permiso, buscar);

export default DerivacionRouter;
