import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Alumno from "./AlumnoModel.js";
import Tutor from "./TutorModel.js";

const {DataTypes} = Sequelize

const ListadoAula = db.define('LISTADO_AULA', {
  ID_LISTADO_AULA: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ID_ALUMNO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Alumno,
      key: 'ID_ALUMNO'
    }
  },
  ID_TUTOR: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tutor,
      key: 'ID_TUTOR'
    }
  }
}, {
    freezeTableName: true
});


Alumno.belongsToMany(Tutor, { through: ListadoAula, foreignKey: 'ID_ALUMNO' });
Tutor.belongsToMany(Alumno, { through: ListadoAula, foreignKey: 'ID_TUTOR' });

ListadoAula.belongsTo(Alumno, { foreignKey: 'ID_ALUMNO' });
ListadoAula.belongsTo(Tutor, { foreignKey: 'ID_TUTOR' });


export default ListadoAula;
