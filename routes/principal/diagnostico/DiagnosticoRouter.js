import express from "express";
import { 
    obtenerTodos, 
    obtenerPorId, 
    crear, 
    actualizar, 
    eliminar
} from "../../../controllers/principal/diagnostico/DiagnosticoController.js";

import { verificarUsuarioLogeado } from "../../../middleware/AuthUser.js";

const DiagnosticoRouter = express.Router();

DiagnosticoRouter.get('/diagnostico',verificarUsuarioLogeado, obtenerTodos);
DiagnosticoRouter.get('/diagnostico/:id',verificarUsuarioLogeado, obtenerPorId);
DiagnosticoRouter.post('/diagnostico',verificarUsuarioLogeado, crear);
DiagnosticoRouter.patch('/diagnostico/:id',verificarUsuarioLogeado, actualizar);
DiagnosticoRouter.delete('/diagnostico/:id',verificarUsuarioLogeado, eliminar);

export default DiagnosticoRouter;
