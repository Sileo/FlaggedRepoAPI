const Sequelize = require('sequelize');
const {
    getSequelize
} = require("../index");
const ApiRequest = getSequelize().define('ApiRequest', {
    isPiracy: {
        type: Sequelize.BOOLEAN
    }
});

exports.ApiRequest = ApiRequest;