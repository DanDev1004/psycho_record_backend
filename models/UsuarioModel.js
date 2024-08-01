import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Rol from "./RolModel.js";

const {DataTypes} = Sequelize;

const Usuario  = db.define('USUARIO',{
    ID_USUARIO: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      DNI_USUARIO: {
        type: DataTypes.CHAR(8),
        allowNull: false,
        unique: true,
        validate:{
          notEmpty: true
      }
      },
      NOMBRE_USUARIO: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate:{
          notEmpty: true
      }
      },
      APELLIDO_USUARIO: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate:{
          notEmpty: true
      }
      },
      USERNAME: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate:{
          notEmpty: true
      }
      },
      EMAIL: {
        type: DataTypes.STRING(70),
        allowNull: false,
        unique: true,
        validate:{
          notEmpty: true
      }
      },
      USER_PASSWORD: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
          notEmpty: true
      }
      },
      ID_ROL: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Rol,
          key: 'ID_ROL'
        }
      }
    },{
    freezeTableName: true
});

Rol.hasMany(Usuario, { foreignKey: 'ID_ROL' });
Usuario.belongsTo(Rol, { foreignKey: 'ID_ROL' });


export default Usuario ;