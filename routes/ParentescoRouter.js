import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear,
    actualizar, 
    eliminar 
} from "../controllers/ParentescoController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const ParentescoRouter = express.Router();

ParentescoRouter.get('/parentesco',verificarUsuarioLogeado,adminPermiso, obtenerTodos);
ParentescoRouter.get('/parentesco/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
ParentescoRouter.post('/parentesco',verificarUsuarioLogeado,adminPermiso, crear);
ParentescoRouter.patch('/parentesco/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
ParentescoRouter.delete('/parentesco/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

export default ParentescoRouter;
