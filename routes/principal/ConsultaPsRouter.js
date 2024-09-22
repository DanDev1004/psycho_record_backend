import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar,
    buscar,
    filtrarPorFechaAnio
} from "../../controllers/principal/ConsultaPsController.js";

import { verificarUsuarioLogeado, admin_psico_permiso, admin_psico_tutor_permiso } from "../../middleware/AuthUser.js";

const ConsultaPsRouter = express.Router();

ConsultaPsRouter.get('/consulta',verificarUsuarioLogeado,admin_psico_tutor_permiso, obtenerTodos);
ConsultaPsRouter.get('/consulta/:id',verificarUsuarioLogeado,admin_psico_permiso, obtenerPorId);
ConsultaPsRouter.post('/consulta',verificarUsuarioLogeado,admin_psico_permiso, crear);
ConsultaPsRouter.patch('/consulta/:id',verificarUsuarioLogeado,admin_psico_permiso, actualizar);
ConsultaPsRouter.delete('/consulta/:id',verificarUsuarioLogeado,admin_psico_permiso, eliminar);
ConsultaPsRouter.post('/consulta/buscar',verificarUsuarioLogeado,admin_psico_permiso, buscar);
ConsultaPsRouter.post('/consulta/filtrarporfecha',verificarUsuarioLogeado,admin_psico_permiso, filtrarPorFechaAnio);
export default ConsultaPsRouter;
