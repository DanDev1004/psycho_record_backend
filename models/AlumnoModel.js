import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Persona from "./PersonaModel.js";


const {DataTypes} = Sequelize;

const Alumno = db.define('ALUMNO', {
    ID_ALUMNO: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    COD_ALUMNO: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    ID_PERSONA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Persona,
        key: 'ID_PERSONA'
      }
    },
    ESTADO: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
  }
  },  {
    freezeTableName: true
});


Persona.hasMany(Alumno, { foreignKey: 'ID_PERSONA' });
Alumno.belongsTo(Persona, { foreignKey: 'ID_PERSONA' });

  export default Alumno;