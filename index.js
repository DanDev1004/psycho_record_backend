import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";


import ReligionRouter from "./routes/mantenimiento/ReligionRouter.js"
import RolRouter from "./routes/mantenimiento/RolRouter.js";
import EstadoCivilRouter from "./routes/mantenimiento/EstadoCivilRouter.js";
import AreaPeRouter from "./routes/mantenimiento/AreaPeRouter.js";

import UsuarioRouter from "./routes/principal/UsuarioRouter.js";
import AlumnoRouter from "./routes/principal/AlumnoRouter.js";

import DerivacionRouter from "./routes/principal/DerivacionRouter.js";
import ConsultaPsRouter from "./routes/principal/ConsultaPsRouter.js";

import CatCondRouter from "./routes/principal/diagnostico/CatCondRouter.js";
import CondicionRouter from "./routes/principal/diagnostico/CondicionRouter.js";
import DiagnosticoRouter from "./routes/principal/diagnostico/DiagnosticoRouter.js";

//import insertInitialData from "./insertInitialData.js";

import AuthRouter from "./routes/AuthRouter.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db: db });

(async () => {
    try {
        await db.sync(); //Sincronizar los modelos con la base de datos
       //await insertInitialData();
        console.log("Base de datos sincronizada y datos iniciales insertados");
    } catch (error) {
        console.error("Error durante la sincronización de la base de datos:", error);
        process.exit(1);
    }
})();


app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: {
            secure: false,  
            httpOnly: true,
            sameSite: 'lax',
        }

    }
));


app.use(cors(
    {
        credentials: true,
        origin: process.env.CLIENT_URL
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