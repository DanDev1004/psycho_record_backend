import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Religion from "./ReligionModel.js";
import EstadoCivil from "./EstadoCivilModel.js";
import Aula from "./AulaModel.js";


const {DataTypes} = Sequelize;

const Alumno = db.define('ALUMNO', {
    ID_ALUMNO: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    NOMBRE_ALUMNO: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate:{
        notEmpty: true
    }
    },
    APELLIDO_ALUMNO: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate:{
        notEmpty: true
    }
    },
    DNI_ALUMNO: {
      type: DataTypes.CHAR(8),
      unique: true,
      allowNull: false,
      validate:{
        notEmpty: true
    }
    },
    SEXO: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      validate: {
        isIn: [['M', 'F']]
      }
    },
    TELEFONO: {
      type: DataTypes.CHAR(9),
      allowNull: true,
    },
    ID_RELIGION: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Religion,
        key: 'ID_RELIGION'
      }
    },
    ID_EC: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: EstadoCivil,
        key: 'ID_EC'
      }
    },
    ID_AULA: {
      type: DataTypes.INTEGER,
      references: {
        model: Aula,
        key: 'ID_AULA'
      }
    },
    DIRECCION_NACIMIENTO: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    FECHA_NACIMIENTO: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DOMICILIO: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },  {
    freezeTableName: true
});


Religion.hasMany(Alumno, { foreignKey: 'ID_RELIGION' });
Alumno.belongsTo(Religion, { foreignKey: 'ID_RELIGION' });

EstadoCivil.hasMany(Alumno, { foreignKey: 'ID_EC' });
Alumno.belongsTo(EstadoCivil, { foreignKey: 'ID_EC' });

Aula.hasMany(Alumno, { foreignKey: 'ID_AULA' });
Alumno.belongsTo(Aula, { foreignKey: 'ID_AULA' });

  export default Alumno;