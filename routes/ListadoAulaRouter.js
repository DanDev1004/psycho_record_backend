import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,

    buscar
} from "../controllers/ListadoAulaController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const ListadoAulaRouter = express.Router();

ListadoAulaRouter.get('/listadoaula',verificarUsuarioLogeado,adminPermiso, obtenerTodos);
ListadoAulaRouter.get('/listadoaula/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
ListadoAulaRouter.post('/listadoaula',verificarUsuarioLogeado,adminPermiso, crear);
ListadoAulaRouter.patch('/listadoaula/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
ListadoAulaRouter.delete('/listadoaula/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

ListadoAulaRouter.post('/buscarListadoAula',verificarUsuarioLogeado,adminPermiso, buscar);

export default ListadoAulaRouter;