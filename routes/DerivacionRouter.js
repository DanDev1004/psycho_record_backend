import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar
} from "../controllers/DerivacionController.js";

import { verificarUsuarioLogeado } from "../middleware/AuthUser.js";

const DerivacionRouter = express.Router();

DerivacionRouter.get('/derivacion',verificarUsuarioLogeado, obtenerTodos);
DerivacionRouter.get('/derivacion/:id',verificarUsuarioLogeado, obtenerPorId);
DerivacionRouter.post('/derivacion',verificarUsuarioLogeado, crear);
DerivacionRouter.patch('/derivacion/:id',verificarUsuarioLogeado, actualizar);
DerivacionRouter.delete('/derivacion/:id',verificarUsuarioLogeado, eliminar);

export default DerivacionRouter;
