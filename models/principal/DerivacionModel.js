import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Usuario from "../principal/UsuarioModel.js";
import Alumno from "../principal/AlumnoModel.js";

const { DataTypes } = Sequelize;

const Derivacion = db.define('DERIVACION', {
    ID_DERIVACION: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ID_USUARIO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'ID_USUARIO'
        }
    },
    ID_ALUMNO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Alumno,
            key: 'ID_ALUMNO'
        }
    },
    MOTIVO: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    URGENCIA: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            isIn: [[1, 2, 3]]  // 1 => Baja, 2 => Media, 3 => Alta
        }
    },
    RECIBIDO: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ESTADO: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Usuario.hasMany(Derivacion, { foreignKey: 'ID_USUARIO' });
Derivacion.belongsTo(Usuario, { foreignKey: 'ID_USUARIO' });

Alumno.hasMany(Derivacion, { foreignKey: 'ID_ALUMNO' });
Derivacion.belongsTo(Alumno, { foreignKey: 'ID_ALUMNO' });

export default Derivacion;
