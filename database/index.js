const Sequelize = require('sequelize');
const {
    Database
} = require("../config/config");
const sequelize = new Sequelize(Database.database, Database.username, Database.password, {
    host: Database.host,
    port: Database.port,
    dialect: Database.type,
    operatorsAliases: false,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
exports.initDatabase = () => {
    return sequelize.authenticate();
}

// A getter to access the object from other files.
exports.getSequelize = () => {
    return sequelize;
}