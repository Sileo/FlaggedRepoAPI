const { Misc } = require("../config/config");
const { ApiRequest } = require("../database/entities/ApiRequest");
const repolist = require("../config/flagged-repos.json");
exports.infoController = async (req, res) => {
    const piracyReq = await ApiRequest.findAll({
        where: {
            isPiracy: true
        }
    });
    const totalReq = await ApiRequest.findAll();
    return res.json({
        piracy_req_count: piracyReq.length,
        total_req_count: totalReq.length,
        version: Misc.version,
        updated: Misc.updated,
        flagged_count: repolist.flaggedRepoURLs.length
    });
};
