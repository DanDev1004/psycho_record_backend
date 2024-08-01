import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar 
} from "../controllers/RegistroFamiliarController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const RegistroFamiliarRouter = express.Router();

RegistroFamiliarRouter.get('/registrofamiliar',verificarUsuarioLogeado,adminPermiso, obtenerTodos);
RegistroFamiliarRouter.get('/registrofamiliar/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
RegistroFamiliarRouter.post('/registrofamiliar',verificarUsuarioLogeado,adminPermiso, crear);
RegistroFamiliarRouter.patch('/registrofamiliar/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
RegistroFamiliarRouter.delete('/registrofamiliar/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

export default RegistroFamiliarRouter;
