import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";

const { DataTypes } = Sequelize;

const CatCond = db.define('CAT_COND', {
    ID_CAT_COND: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NOMBRE_CAT_COND: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
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

export default CatCond;
