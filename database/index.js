const Sequelize = require("sequelize");
const { Database } = require("../config/config");
const sequelize = new Sequelize(Database.database, null, null, {
    dialect: "sqlite",
    operatorsAliases: false,
    logging: false,
    storage: Database.storage,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
exports.initDatabase = () => {
    return sequelize.authenticate();
};

// A getter to access the object from other files.
exports.getSequelize = () => {
    return sequelize;
};
