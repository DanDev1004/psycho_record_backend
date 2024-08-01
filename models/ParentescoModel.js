import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Parentesco = db.define('PARENTESCO', {
  ID_PARENTESCO: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  NOMBRE_PARENTESCO: {
    type: DataTypes.STRING(50),
    allowNull:false,
    unique: true,
    validate:{
        notEmpty: true
    }
  }
}, {
  freezeTableName: true
});

export default Parentesco;
