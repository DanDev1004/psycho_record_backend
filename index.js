import express from "express";
import cors from "cors";
import session, { Cookie } from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UsuarioRouter from "./routes/UsuarioRouter.js";
import RolRouter from "./routes/RolRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import ReligionRouter from "./routes/ReligionRouter.js";
import EstadoCivilRouter from "./routes/EstadoCivilRouter.js";
import AreaPeRouter from "./routes/AreaPeRouter.js";
import instructorRouter from "./routes/InstructorRouter.js";
import AulaRouter from "./routes/AulaRouter.js";
import TutorRouter from "./routes/TutorRouter.js";
import AlumnoRouter from "./routes/AlumnoRouter.js";
import ListadoAulaRouter from "./routes/ListadoAulaRouter.js";
import DerivacionRouter from "./routes/DerivacionRouter.js";
import ParentescoRouter from "./routes/ParentescoRouter.js";
import RegistroFamiliarRouter from "./routes/RegistroFamiliarRouter.js";


dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db: db });

 (async()=>{  
    await db.sync();
  })();


app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: store,
        Cookie: {
            secure: 'auto'  //Si se usa http automaticamente será false, si es https será true
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
app.use(RolRouter);
app.use(UsuarioRouter);
app.use(AuthRouter);
app.use(ReligionRouter);
app.use(EstadoCivilRouter);
app.use(AreaPeRouter);
app.use(instructorRouter);
app.use(AulaRouter);
app.use(TutorRouter);
app.use(AlumnoRouter);
app.use(ListadoAulaRouter);
app.use(DerivacionRouter);
app.use(ParentescoRouter);
app.use(RegistroFamiliarRouter);

store.sync(); //creando tabla sessions para almacenar las sesiones en la db y no perderlas al reiniciar servidor

app.listen(process.env.APP_PORT , ()=>{
    console.log("server corriendo")
});