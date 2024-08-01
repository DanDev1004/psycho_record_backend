import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import AreaPe from "./AreaPeModel.js";

const {DataTypes} = Sequelize

const Aula = db.define('AULA', {
  ID_AULA: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ID_AREA_PE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AreaPe,
      key: 'ID_AREA_PE'
    }
  },
  ANIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    len: [4, 4],
    validate:{
        notEmpty: true
    }
  },
  PERIODO: {
    type: DataTypes.CHAR(2),
    validate: {
      isIn: [['I', 'II']]
    }
  },
  CICLO: {
    type: DataTypes.CHAR(3),
    validate: {
      isIn: [['I', 'II', 'III', 'IV', 'V', 'VI']]
    }
  }
},  {
    freezeTableName: true
});


AreaPe.hasMany(Aula, { foreignKey: 'ID_AREA_PE' });
Aula.belongsTo(AreaPe, { foreignKey: 'ID_AREA_PE' });

export default Aula;
