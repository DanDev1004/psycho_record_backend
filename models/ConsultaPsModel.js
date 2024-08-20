import { Sequelize } from "sequelize";
import db from "../config/Database.js";

import Usuario from "./UsuarioModel.js";
import Alumno from "./AlumnoModel.js";
import Familiar from "./FamiliarModel.js";
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
    type: DataTypes.INTEGER,
    validate: {
      isIn: [[1,2,3]] // 1=>AUTONOMO 2=> PARIENTE 3=> TUTOR
    }
  },
  ID_ALUMNO: {
    type: DataTypes.INTEGER,
    references: {
      model: Alumno,
      key: 'ID_ALUMNO'
    } // AUTONOMO
  },
  ID_FAMILIAR: {
    type: DataTypes.INTEGER,
    references: {
      model: Familiar,
      key: 'ID_FAMILIAR'
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
      isIn: [[1,2,3]]
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
  },
  ASPECTO_FISICO: {
    type: DataTypes.TEXT
  },
  ASEO_PERSONAL: {
    type: DataTypes.TEXT
  },
  CONDUCTA: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true
});

Usuario.hasMany(ConsultaPs, { foreignKey: 'ID_USUARIO' });
ConsultaPs.belongsTo(Usuario, { foreignKey: 'ID_USUARIO' });

Alumno.hasMany(ConsultaPs, { foreignKey: 'ID_ALUMNO' });
ConsultaPs.belongsTo(Alumno, { foreignKey: 'ID_ALUMNO' });

Familiar.hasMany(ConsultaPs, { foreignKey: 'ID_FAMILIAR' });
ConsultaPs.belongsTo(Familiar, { foreignKey: 'ID_FAMILIAR' });

Derivacion.hasMany(ConsultaPs, { foreignKey: 'ID_DERIVACION' });
ConsultaPs.belongsTo(Derivacion, { foreignKey: 'ID_DERIVACION' });

export default ConsultaPs;
