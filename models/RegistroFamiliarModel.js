import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Parentesco from "./ParentescoModel.js";;

const {DataTypes} = Sequelize;

const RegistroFamiliar = db.define('REGISTRO_FAMILIAR', {
  ID_RF: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  NOMBRE_RF: {
    type: DataTypes.STRING(70),
    allowNull: false,
    validate:{
        notEmpty: true
    }
  },
  TELEFONO: {
    type: DataTypes.CHAR(9),
    allowNull: true
  },
  ID_PARENTESCO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Parentesco,
      key: 'ID_PARENTESCO'
    }
  }
}, {
  freezeTableName: true
});

Parentesco.hasMany(RegistroFamiliar, { foreignKey: 'ID_PARENTESCO' });
RegistroFamiliar.belongsTo(Parentesco, { foreignKey: 'ID_PARENTESCO' });


export default RegistroFamiliar;
