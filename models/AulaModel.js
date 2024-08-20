import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import AreaPe from "./AreaPeModel.js";
import Usuario from "./UsuarioModel.js";

const { DataTypes } = Sequelize

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
    validate: {
      notEmpty: true
    }
  },
  PERIODO: {
    type: DataTypes.INTEGER,
    validate: {
      isIn: [[1, 2]]
    }
  },
  CICLO: {
    type: DataTypes.INTEGER,
    validate: {
      isIn: [[1, 2, 3, 4, 5, 6]]
    }
  },
  ID_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'ID_USUARIO'
    }
  },
  ESTADO: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  freezeTableName: true
});


AreaPe.hasMany(Aula, { foreignKey: 'ID_AREA_PE' });
Aula.belongsTo(AreaPe, { foreignKey: 'ID_AREA_PE' });

Usuario.hasMany(Aula, { foreignKey: 'ID_USUARIO' });
Aula.belongsTo(Usuario, { foreignKey: 'ID_USUARIO' });

export default Aula;
