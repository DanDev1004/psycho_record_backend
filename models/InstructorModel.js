import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import AreaPe from "./AreaPeModel.js";

const {DataTypes} = Sequelize

const Instructor = db.define('INSTRUCTOR', {
  ID_INSTRUCTOR: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ID_AREA_PE: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: AreaPe,
      key: 'ID_AREA_PE'
    }
  },
  DNI_INSTRUCTOR: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    unique: true,
    validate:{
        notEmpty: true
    }
  },
  NOMBRE_INSTRUCTOR: {
    type: DataTypes.STRING(70),
    allowNull: false,
    validate:{
        notEmpty: true
    }
  },
  APELLIDO_INSTRUCTOR: {
    type: DataTypes.STRING(70),
    allowNull: false,
    validate:{
        notEmpty: true
    }
  }
},  {
    freezeTableName: true
});


AreaPe.hasMany(Instructor, { foreignKey: 'ID_AREA_PE' });
Instructor.belongsTo(AreaPe, { foreignKey: 'ID_AREA_PE' });

export default Instructor;
