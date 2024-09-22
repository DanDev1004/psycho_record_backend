import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const AreaPe = db.define('AREA_PE', {
    ID_AREA_PE: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NOMBRE_AREA_PE: {
        type: DataTypes.STRING(70),
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
export default AreaPe;