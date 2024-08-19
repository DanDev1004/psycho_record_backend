import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar,

    buscar
} from "../controllers/FamiliarController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const FamiliarRouter = express.Router();

FamiliarRouter.get('/familiar',verificarUsuarioLogeado,adminPermiso, obtenerTodos);
FamiliarRouter.get('/familiar/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
FamiliarRouter.post('/familiar',verificarUsuarioLogeado,adminPermiso, crear);
FamiliarRouter.patch('/familiar/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
FamiliarRouter.delete('/familiar/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

FamiliarRouter.post('/buscarFamiliar',verificarUsuarioLogeado,adminPermiso, buscar);

export default FamiliarRouter;
