import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar
} from "../controllers/CondicionController.js";

import { verificarUsuarioLogeado } from "../middleware/AuthUser.js";

const CondicionRouter = express.Router();

CondicionRouter.get('/consulta',verificarUsuarioLogeado, obtenerTodos);
CondicionRouter.get('/consulta/:id',verificarUsuarioLogeado, obtenerPorId);
CondicionRouter.post('/consulta',verificarUsuarioLogeado, crear);
CondicionRouter.patch('/consulta/:id',verificarUsuarioLogeado, actualizar);
CondicionRouter.delete('/consulta/:id',verificarUsuarioLogeado, eliminar);

export default CondicionRouter;
