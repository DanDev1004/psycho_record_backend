import { Sequelize } from "sequelize";
import db from "../../../config/Database.js";
import Condicion from "./CondicionModel.js";
import ConsultaPs from "../ConsultaPsModel.js";

const { DataTypes } = Sequelize;

const Diagnostico = db.define('DIAGNOSTICO', {
    ID_DIAGNOSTICO: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ID_CONSULTA_PS: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ConsultaPs,
            key: 'ID_CONSULTA_PS'
        }
    },
    ID_CONDICION: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Condicion,
            key: 'ID_CONDICION'
        }
    },
    DESCRIPCION: {
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

Condicion.hasMany(Diagnostico, { foreignKey: 'ID_CONDICION' });
Diagnostico.belongsTo(Condicion, { foreignKey: 'ID_CONDICION' });

ConsultaPs.hasMany(Diagnostico, { foreignKey: 'ID_CONSULTA_PS' });
Diagnostico.belongsTo(ConsultaPs, { foreignKey: 'ID_CONSULTA_PS' });

export default Diagnostico;
