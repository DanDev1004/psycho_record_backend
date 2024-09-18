import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";
import CatCond from "./CatCondModel.js";

const { DataTypes } = Sequelize;

const Condicion = db.define('CONDICION', {
    ID_CONDICION: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NOMBRE_CONDICION: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    },
    ID_CAT_COND: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CatCond,
            key: 'ID_CAT_COND'
        }
    },
    ESTADO: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true
});

CatCond.hasMany(Condicion, { foreignKey: 'ID_CAT_COND' });
Condicion.belongsTo(CatCond, { foreignKey: 'ID_CAT_COND' });

export default Condicion;
