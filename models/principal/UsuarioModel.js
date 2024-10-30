import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Rol from "../mantenimiento/RolMoldel.js";

const { DataTypes } = Sequelize;

const Usuario = db.define('USUARIO', {
    ID_USUARIO: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    DNI_USUARIO: {
        type: DataTypes.CHAR(8),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    NOMBRE_USUARIO: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    APELLIDO_USUARIO: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    USERNAME: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    TELEFONO: {
        type: DataTypes.CHAR(9),
        allowNull: true
    },
    EMAIL: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    PASSWORD_USER: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    GENERO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[1, 2]] 
        },
        comment: "1 = Masculino, 2 = Femenino"
    },
    ID_ROL: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rol,
            key: 'ID_ROL'
        }
    },
    ESTADO: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
});

Rol.hasMany(Usuario, { foreignKey: 'ID_ROL' });
Usuario.belongsTo(Rol, { foreignKey: 'ID_ROL' });

export default Usuario;
