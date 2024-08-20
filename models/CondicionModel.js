import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Categoria from "./CategoriaModel.js";
import Usuario from "./UsuarioModel.js";

const { DataTypes } = Sequelize;


const Condicion = db.define('Condicion', {
  ID_CONDICION: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  NOMBRE_CONDICION: {
    type: DataTypes.STRING(255)
  },
  ID_CATEGORIA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categoria,
      key: 'ID_CATEGORIA'
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

Categoria.hasMany(Condicion, { foreignKey: 'ID_CATEGORIA' });
Condicion.belongsTo(Categoria, { foreignKey: 'ID_CATEGORIA' });


Usuario.hasMany(Condicion, { foreignKey: 'ID_USUARIO' });
Condicion.belongsTo(Usuario, { foreignKey: 'ID_USUARIO' });

export default Condicion;
