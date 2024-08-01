import express from "express";
import {
    obtenerTodos, 
    obtenerPorId,
    crear, 
    actualizar, 
    eliminar
 } from "../controllers/EstadoCivilController.js";

 
import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";


const EstadoCivilRouter = express.Router();

EstadoCivilRouter.get('/estadoCivil',verificarUsuarioLogeado,adminPermiso, obtenerTodos);
EstadoCivilRouter.get('/estadoCivil/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
EstadoCivilRouter.post('/estadoCivil',verificarUsuarioLogeado,adminPermiso, crear);
EstadoCivilRouter.patch('/estadoCivil/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
EstadoCivilRouter.delete('/estadoCivil/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

export default EstadoCivilRouter;
