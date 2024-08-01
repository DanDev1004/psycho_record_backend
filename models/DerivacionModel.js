import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Usuario from "./UsuarioModel.js";
import ListadoAula from "./ListadoAulaModel.js";

const {DataTypes} = Sequelize;

const Derivacion = db.define('DERIVACION', {
  ID_DERIVACION: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ID_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'ID_USUARIO'
    }
  },
  ID_LISTADO_AULA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ListadoAula,
      key: 'ID_LISTADO_AULA'
    }
  },
  FECHA_DERIVACION: {
    type: DataTypes.DATE,
    allowNull: false,
    validate:{
        notEmpty: true
    }
  },
  MOTIVO: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
        notEmpty: true
    }
  },
  SEVERIDAD: {
    type: DataTypes.SMALLINT,
    validate: {
      min: 1,
      max: 3
    }
  },
  ESTADO: {
    type: DataTypes.BOOLEAN
  }
}, {
  freezeTableName: true
});

Usuario.belongsToMany(ListadoAula, { through: Derivacion, foreignKey: 'ID_USUARIO' });
ListadoAula.belongsToMany(Usuario, { through: Derivacion, foreignKey: 'ID_LISTADO_AULA' });

Derivacion.belongsTo(Usuario, { foreignKey: 'ID_USUARIO' });
Derivacion.belongsTo(ListadoAula, { foreignKey: 'ID_LISTADO_AULA' });

export default Derivacion;
