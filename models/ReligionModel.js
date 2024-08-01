import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Religion = db.define('RELIGION', {
    ID_RELIGION: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    NOMBRE_RELIGION: {
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
  
  export default Religion;