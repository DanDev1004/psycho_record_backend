import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Usuario from "../principal/UsuarioModel.js";
import Derivacion from "./DerivacionModel.js";
import Alumno from "./AlumnoModel.js";  

const { DataTypes } = Sequelize;

const ConsultaPs = db.define('CONSULTA_PS', {
    ID_CONSULTA_PS: {
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
    TIPO_DERIVACION: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            isIn: [[1, 2, 3]]  // 1 => AUTONOMO, 2 => PARIENTE, 3 => INSTRUCTOR
        }
    },
    ID_ALUMNO: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Alumno,
            key: 'ID_ALUMNO'
        }
    },
    ID_DERIVACION: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Derivacion,
            key: 'ID_DERIVACION'
        }
    },
    FAMILIAR: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    TELEFONO_FAMILIAR: {
        type: DataTypes.CHAR(9),
        allowNull: true
    },
    FECHA_ATENCION: {
        type: DataTypes.DATE,
        allowNull: false
    },
    HORA_INICIO: {
        type: DataTypes.TIME,
        allowNull: false
    },
    HORA_FIN: {
        type: DataTypes.TIME,
        allowNull: false
    },
    ASISTENCIA: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            isIn: [[1, 2, 3]]  // 1 => pendiente, 2 => asistido, 3 => no asistido
        }
    },
    MOTIVO: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    PROBLEMA: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    RECOMENDACION: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ASPECTO_FISICO: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ASEO_PERSONAL: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    CONDUCTA: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ESTADO: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true
});

Usuario.hasMany(ConsultaPs, { foreignKey: 'ID_USUARIO' });
ConsultaPs.belongsTo(Usuario, { foreignKey: 'ID_USUARIO' });

Alumno.hasMany(ConsultaPs, { foreignKey: 'ID_ALUMNO' });
ConsultaPs.belongsTo(Alumno, { foreignKey: 'ID_ALUMNO' });

Derivacion.hasMany(ConsultaPs, { foreignKey: 'ID_DERIVACION' });
ConsultaPs.belongsTo(Derivacion, { foreignKey: 'ID_DERIVACION' });

export default ConsultaPs;
