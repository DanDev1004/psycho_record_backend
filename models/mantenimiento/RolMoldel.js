import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Rol = db.define('ROL', {
    ID_ROL: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NOMBRE_ROL: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    ESTADO: {
        type: DataTypes.BOOLEAN,
        defaultValue: true 
    }
}, {
    freezeTableName: true
});


export default Rol;