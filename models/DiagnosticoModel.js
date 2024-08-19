import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import ConsultaPs from "./ConsultaPsModel.js";
import Condicion from "./CondicionModel.js";

const {DataTypes} = Sequelize;

const Diagnostico = db.define('Diagnostico', {
  ID_DIAGNOSTICO: {
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
  ID_CONDICION: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Condicion,
      key: 'ID_CONDICION'
    }
  },
  DESCRIPCION: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
        notEmpty: true
    }
  }
}, {
  freezeTableName: true
});

ConsultaPs.hasMany(Diagnostico, { foreignKey: 'ID_CONSULTA_PS' });
Diagnostico.belongsTo(ConsultaPs, { foreignKey: 'ID_CONSULTA_PS' });


export default Diagnostico;
