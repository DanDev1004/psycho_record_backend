import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import RegistroFamiliar from "./RegistroFamiliarModel.js"; 
import ListadoAula from "./ListadoAulaModel.js"; 

const {DataTypes} = Sequelize

const Familiar = db.define('FAMILIAR', {
  ID_FAMILIAR: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ID_RF: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RegistroFamiliar,
      key: 'ID_RF'
    }
  },
  ID_LISTADO_AULA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ListadoAula,
      key: 'ID_LISTADO_AULA'
    }
  }
}, {
    freezeTableName: true
});


RegistroFamiliar.belongsToMany(ListadoAula, { through: Familiar, foreignKey: 'ID_RF' });
ListadoAula.belongsToMany(RegistroFamiliar, { through: Familiar, foreignKey: 'ID_LISTADO_AULA' });

Familiar.belongsTo(RegistroFamiliar, { foreignKey: 'ID_RF' });
Familiar.belongsTo(ListadoAula, { foreignKey: 'ID_LISTADO_AULA' });


export default Familiar;
