import { Sequelize } from "sequelize";
import db from "../config/Database.js";

import Usuario from "./UsuarioModel.js";
import Alumno from "./AlumnoModel.js";
import RegistroFamiliar from "./RegistroFamiliarModel.js";
import Derivacion from "./DerivacionModel.js";

const {DataTypes} = Sequelize;

const ConsultaPs = db.define('CONSULTA_PS', {
  ID_CONSULTA_PS: {
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
  TIPO_DERIVACION: {
    type: DataTypes.STRING(10),
    validate: {
      isIn: [['AUTÓNOMO', 'PARIENTE', 'INSTRUCTOR']]
    }
  },
  ID_ALUMNO: {
    type: DataTypes.INTEGER,
    references: {
      model: Alumno,
      key: 'ID_ALUMNO'
    } // AUTONOMO
  },
  ID_RF: {
    type: DataTypes.INTEGER,
    references: {
      model: RegistroFamiliar,
      key: 'ID_RF'
    } // PARIENTE
  },
  ID_DERIVACION: {
    type: DataTypes.INTEGER,
    references: {
      model: Derivacion,
      key: 'ID_DERIVACION'
    } // TUTOR
  },
  FECHA_ATENCION: {
    type: DataTypes.DATE,
    allowNull: false
  },
  HORA_INICIO: {
    type: DataTypes.TIME,
    allowNull: false
  },
  HORA_FIN: {
    type: DataTypes.TIME,
    allowNull: false
  },
  ASISTENCIA: {
    type: DataTypes.SMALLINT,
    validate: {
      min: 1,
      max: 3 
    } //  1=>pendiente ; 2=>asistido ; 3=> no asistido
  },
  MOTIVO: {
    type: DataTypes.TEXT
  },
  PROBLEMA: {
    type: DataTypes.TEXT
  },
  RECOMENDACION: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true
});

Usuario.hasMany(ConsultaPs, { foreignKey: 'ID_USUARIO' });
ConsultaPs.belongsTo(Usuario, { foreignKey: 'ID_USUARIO' });

Alumno.hasMany(ConsultaPs, { foreignKey: 'ID_ALUMNO' });
ConsultaPs.belongsTo(Alumno, { foreignKey: 'ID_ALUMNO' });

RegistroFamiliar.hasMany(ConsultaPs, { foreignKey: 'ID_RF' });
ConsultaPs.belongsTo(RegistroFamiliar, { foreignKey: 'ID_RF' });

Derivacion.hasMany(ConsultaPs, { foreignKey: 'ID_DERIVACION' });
ConsultaPs.belongsTo(Derivacion, { foreignKey: 'ID_DERIVACION' });

export default ConsultaPs;
