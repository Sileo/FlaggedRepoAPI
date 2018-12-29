const Sequelize = require('sequelize');
const {
    Database
} = require("../config/config");
const sequelize = new Sequelize(Database.database, Database.username, Database.password, {
    host: Database.host,
    port: Database.port,
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
exports.init = () => {
    return sequelize.authenticate();
}

exports.sequelize = () => {
    return sequelize;
}