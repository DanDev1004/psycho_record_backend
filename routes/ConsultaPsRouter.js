import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar,

    buscar
    
} from "../controllers/ConsultaPsController.js";

import { verificarUsuarioLogeado } from "../middleware/AuthUser.js";

const ConsultaPsRouter = express.Router();

ConsultaPsRouter.get('/consulta',verificarUsuarioLogeado, obtenerTodos);
ConsultaPsRouter.get('/consulta/:id',verificarUsuarioLogeado, obtenerPorId);
ConsultaPsRouter.post('/consulta',verificarUsuarioLogeado, crear);
ConsultaPsRouter.patch('/consulta/:id',verificarUsuarioLogeado, actualizar);
ConsultaPsRouter.delete('/consulta/:id',verificarUsuarioLogeado, eliminar);

ConsultaPsRouter.post('/buscarConsulta',verificarUsuarioLogeado, buscar);
export default ConsultaPsRouter;
