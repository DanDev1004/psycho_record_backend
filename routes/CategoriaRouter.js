import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar
} from "../controllers/CategoriaController.js";

import { verificarUsuarioLogeado } from "../middleware/AuthUser.js";

const CategoriaRouter = express.Router();

CategoriaRouter.get('/consulta',verificarUsuarioLogeado, obtenerTodos);
CategoriaRouter.get('/consulta/:id',verificarUsuarioLogeado, obtenerPorId);
CategoriaRouter.post('/consulta',verificarUsuarioLogeado, crear);
CategoriaRouter.patch('/consulta/:id',verificarUsuarioLogeado, actualizar);
CategoriaRouter.delete('/consulta/:id',verificarUsuarioLogeado, eliminar);

export default CategoriaRouter;
