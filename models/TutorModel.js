import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Instructor from "./InstructorModel.js";
import Aula from "./AulaModel.js";


const { DataTypes } = Sequelize

const Tutor = db.define('TUTOR', {
  ID_TUTOR: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ID_INSTRUCTOR: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Instructor,
      key: 'ID_INSTRUCTOR'
    }
  },
  ID_AULA: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Aula,
      key: 'ID_AULA'
    }
  },

}, {
  freezeTableName: true
});

Instructor.belongsToMany(Aula, { through: Tutor, foreignKey: 'ID_INSTRUCTOR' });
Aula.belongsToMany(Instructor, { through: Tutor, foreignKey: 'ID_AULA' });

Tutor.belongsTo(Instructor, { foreignKey: 'ID_INSTRUCTOR' });
Tutor.belongsTo(Aula, { foreignKey: 'ID_AULA' });


export default Tutor;
