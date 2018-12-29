const Sequelize = require('sequelize');
const {
    sequelize
} = require("../index");
const ApiRequest = sequelize().define('ApiRequest', {
    isPiracy: {
        type: Sequelize.BOOLEAN
    }
});

exports.ApiRequest = ApiRequest;