import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;


const EstadoCivil = db.define('ESTADO_CIVIL', {
    ID_EC: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    NOMBRE_EC: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: true,
      validate:{
        notEmpty: true
    }
    }
  }, {
    freezeTableName: true
});
  
export default EstadoCivil;