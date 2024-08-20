import { Sequelize } from "sequelize";
import db from "../config/Database";
import Religion from "./ReligionModel";
import EstadoCivil from "./EstadoCivilModel";
import Usuario from "./UsuarioModel";

const { DataTypes } = Sequelize;

const Persona = db.define('PERSONA', {
    ID_PERSONA: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NOMBRES: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    APELLIDOS: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    DNI: {
        type: DataTypes.CHAR(8),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    SEXO: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        validate: {
            isIn: [['M', 'F']]
        }
    },
    TELEFONO: {
        type: DataTypes.CHAR(9),
        allowNull: true,
    },
    ID_RELIGION: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Religion,
            key: 'ID_RELIGION'
        }
    },
    ID_EC: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: EstadoCivil,
            key: 'ID_EC'
        }
    },
    DIRECCION_NACIMIENTO: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    FECHA_NACIMIENTO: {
        type: DataTypes.DATE,
        allowNull: true
    },
    DOMICILIO: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ID_USUARIO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'ID_USUARIO'
        }
    },
    ESTADO: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true
});

Religion.hasMany(Persona, { foreignKey: 'ID_RELIGION' });
Persona.belongsTo(Religion, { foreignKey: 'ID_RELIGION' });

EstadoCivil.hasMany(Persona, { foreignKey: 'ID_EC' });
Persona.belongsTo(EstadoCivil, { foreignKey: 'ID_EC' });

Usuario.hasMany(Persona, { foreignKey: 'ID_USUARIO' });
Persona.belongsTo(Usuario, { foreignKey: 'ID_USUARIO' });

export default Persona;