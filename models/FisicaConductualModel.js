import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import ConsultaPs from "./consultaPsModel.js";

const {DataTypes} = Sequelize;

const FisicaConductual = db.define('FISICA_CONDUCTUAL', {
  ID_FC: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ID_CONSULTA_PS: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ConsultaPs,
      key: 'ID_CONSULTA_PS'
    }
  },
  ASPECTO_FISICO: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
        notEmpty: true
    }
  },
  ASEO_PERSONAL: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
        notEmpty: true
    }
  },
  CONDUCTA: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
        notEmpty: true
    }
  }
}, {
  freezeTableName: true
});

ConsultaPs.hasOne(FisicaConductual, { foreignKey: 'ID_CONSULTA_PS' });
FisicaConductual.belongsTo(ConsultaPs, { foreignKey: 'ID_CONSULTA_PS' });

export default FisicaConductual;
