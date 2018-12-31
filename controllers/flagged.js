const { parse } = require("url");
const { ApiRequest } = require("../database/entities/ApiRequest");
const repolist = require("../config/flagged-repos.json");
const flaggedRepos = repolist.flaggedRepoURLs;

let repoRegexes = [];

const createRegex = (url) => {
    // basically https://stackoverflow.com/a/39095107/9784092 but better
    const split = /([^\/]+)(\/.*)?/;

    const matches = url.match(split);
    if (!matches) return null;

    var preparedURL = "";
    preparedURL = `${matches[1]}`
        .replace(/[?()[\]\\.+^$|]/g, "\\$&")
        .replace(/\*\\./g, "(?:[^/]*\\.)*")
        .replace(/\*$/, "[^/]*");

    if (matches[2]) {
        preparedURL += matches[2]
            .replace(/[?()[\]\\.+^$|]/g, "\\$&")
            .replace(/\/\*(?=$|\/)/g, "(?:/[^]*)?");
    }
    return new RegExp(`^${preparedURL}$`, "i");
};

const regenerateRegex = () => {
    console.log("Generating regex array.");
    for (const repo of flaggedRepos) {
        const regex = createRegex(repo);
        if (!regex)
            return console.error(`Failed to generate regex for ${repo}.`);

        repoRegexes.push(regex);
    }
    console.log("Generated regex array.");
};

const flaggedController = (req, res) => {
    if (!req.body.url) return res.status(400).end();
    const parsed = parse(req.body.url);
    // prettier-ignore
    const normalised = `${parsed.hostname}${parsed.pathname == "/" ? "" : parsed.pathname}`
        .replace(/^www\./, "")
        .trim();

    const isPiracy = repoRegexes.some((regex) => {
        return normalised.match(regex) !== null;
    });
    ApiRequest.sync().then(() => {
        ApiRequest.create({
            isPiracy
        });
    });
    return res.send(isPiracy);
};

module.exports = { regenerateRegex, flaggedController };
