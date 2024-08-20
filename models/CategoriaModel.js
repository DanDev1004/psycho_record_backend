import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Usuario from "./UsuarioModel";

const { DataTypes } = Sequelize;

const Categoria = db.define('CATEGORIA', {
  ID_CATEGORIA: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  NOMBRE_CATEGORIA: {
    type: DataTypes.STRING(255),
    allowNull: false,
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


Usuario.hasMany(Categoria, { foreignKey: 'ID_USUARIO' });
Categoria.belongsTo(Usuario, { foreignKey: 'ID_USUARIO' });


export default Categoria;
