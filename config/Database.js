import { Sequelize } from "sequelize";

const db = new Sequelize('IESTP','root','admin',
    {
        host: "localhost",
        dialect: "mysql"
    }
);

export default db;