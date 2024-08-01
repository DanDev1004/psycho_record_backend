import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Categoria = db.define('CATEGORIA', {
  ID_CATEGORIA: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  NOMBRE_CATEGORIA: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate:{
        notEmpty: true
    }
  }
}, {
  freezeTableName: true
});

export default Categoria;
