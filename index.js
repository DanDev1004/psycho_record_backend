import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";


import ReligionRouter from "./routers/mantenimiento/ReligionRouter.js";
import RolRouter from "./routers/mantenimiento/RolRouter.js";
import EstadoCivilRouter from "./routers/mantenimiento/EstadoCivilRouter.js";
import AreaPeRouter from "./routers/mantenimiento/AreaPeRouter.js";

import UsuarioRouter from "./routers/principal/UsuarioRouter.js";
import AlumnoRouter from "./routers/principal/AlumnoRouter.js";

import DerivacionRouter from "./routers/principal/DerivacionRouter.js";
import ConsultaPsRouter from "./routers/principal/ConsultaPsRouter.js";

import CatCondRouter from "./routers/principal/diagnostico/CatCondRouter.js";
import CondicionRouter from "./routers/principal/diagnostico/CondicionRouter.js";
import DiagnosticoRouter from "./routers/principal/diagnostico/DiagnosticoRouter.js";

import insertInitialData from "./insertInitialData.js";

import AuthRouter from "./routers/AuthRouter.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db: db });

(async () => {
    try {
        await db.sync(); // Sincronizar los modelos con la base de datos
        await insertInitialData();
        console.log("Base de datos sincronizada y datos iniciales insertados");
    } catch (error) {
        console.error("Error durante la sincronización de la base de datos:", error);
    }
})();


app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: {
            secure: 'auto', //Si se usa http automaticamente será false, si es https será true
        }
    }
));

app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000'
    }
));


app.use(express.json());

app.use(ReligionRouter);
app.use(RolRouter);
app.use(EstadoCivilRouter);
app.use(AreaPeRouter);

app.use(UsuarioRouter);
app.use(AlumnoRouter);

app.use(DerivacionRouter);
app.use(ConsultaPsRouter);

app.use(CatCondRouter);
app.use(CondicionRouter);
app.use(CondicionRouter);
app.use(DiagnosticoRouter);

app.use(AuthRouter);



store.sync(); //creando tabla sessions para almacenar las sesiones en la db y no perderlas al reiniciar servidor

app.listen(process.env.APP_PORT, () => {
    console.log("server corriendo")
});