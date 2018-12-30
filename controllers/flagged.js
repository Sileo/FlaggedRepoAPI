const { ApiRequest } = require("../database/entities/ApiRequest");
const repolist = require("../config/flagged-repos.json");
const flaggedRepos = repolist.flaggedRepoURLs;

exports.flaggedController = (req, res) => {
    if (!req.body.url) return res.status(400).end();
    const isPiracy = flaggedRepos.some((x) => req.body.url.includes(x));
    ApiRequest.sync().then(() => {
        ApiRequest.create({
            isPiracy
        });
    });
    return res.send(isPiracy);
};
