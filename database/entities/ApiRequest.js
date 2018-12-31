const Sequelize = require("sequelize");
const { getSequelize } = require("../index");

exports.ApiRequest = getSequelize().define("ApiRequest", {
    isPiracy: {
        type: Sequelize.BOOLEAN
    }
});
