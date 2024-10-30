import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import EstadoCivil from "../mantenimiento/EstadoCivilModel.js";
import Religion from "../mantenimiento/ReligionModel.js";
import AreaPe from "../mantenimiento/AreaPeModel.js";

const { DataTypes } = Sequelize;

const Alumno = db.define('ALUMNO', {
    ID_ALUMNO: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NOMBRES: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    APELLIDOS: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    DNI: {
        type: DataTypes.CHAR(8),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    SEXO: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        validate: {
            isIn: [['M', 'F']] //M => Masculino, F => Femenino
        }
    },
    TELEFONO: {
        type: DataTypes.CHAR(9),
        allowNull: true
    },
    ID_EC: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: EstadoCivil,
            key: 'ID_EC'
        }
    },
    ID_RELIGION: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Religion,
            key: 'ID_RELIGION'
        }
    },
    ID_AREA_PE: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: AreaPe,
            key: 'ID_AREA_PE'
        }
    },
    CICLO: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            isIn: [[1, 2, 3, 4, 5, 6]]
        }
    },
    TURNO: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        validate: {
            isIn: [['M', 'T']] //M => Mañana, T => Tarde
        }
    },
    DIR_NAC: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    FECH_NAC: {
        type: DataTypes.DATE,
        allowNull: true
    },
    DOMICILIO: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ESTADO: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true
});

EstadoCivil.hasMany(Alumno, { foreignKey: 'ID_EC' });
Alumno.belongsTo(EstadoCivil, { foreignKey: 'ID_EC' });

Religion.hasMany(Alumno, { foreignKey: 'ID_RELIGION' });
Alumno.belongsTo(Religion, { foreignKey: 'ID_RELIGION' });

AreaPe.hasMany(Alumno, { foreignKey: 'ID_AREA_PE' });
Alumno.belongsTo(AreaPe, { foreignKey: 'ID_AREA_PE' });

export default Alumno;
