import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Usuario from "./UsuarioModel";

const { DataTypes } = Sequelize

const AreaPe = db.define('AREA_PE', {
  ID_AREA_PE: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  NOMBRE_AREA_PE: {
    type: DataTypes.STRING(70),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
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


Usuario.hasMany(AreaPe, { foreignKey: 'ID_USUARIO' });
AreaPe.belongsTo(Usuario, { foreignKey: 'ID_USUARIO' });

export default AreaPe;
