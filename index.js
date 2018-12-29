const {
    parse
} = require("url");
const express = require("express");
const {
    initDatabase
} = require("./database/index");
const {
    ApiRequest
} = require("./database/entities/ApiRequest");
const app = express();

const repolist = require("./config/flagged-repos.json");
const flaggedRepos = repolist.flaggedRepoURLs;

app.use(express.json());

app.get("/", (_, res) => {
    return res.redirect("https://github.com/SileoApp/FlaggedRepoAPI");
});

app.get("/info", (_, res) => {
    return res.json({
        version: repolist.version,
        updated: repolist.updated,
        flagged_count: repolist.flaggedRepoURLs.length
    });
});

app.post("/flagged", (req, res) => {
    if (!req.body.url) return res.status(400).end();
    const isPiracy = flaggedRepos.some(x => req.body.url.includes(x));
    ApiRequest.sync().then(() => {
        ApiRequest.create({
            isPiracy
        });
    });
    return res.send(isPiracy);
});

initDatabase();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Flagged Repo API listening on http://localhost:${port}.`));