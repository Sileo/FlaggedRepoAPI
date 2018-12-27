const { parse } = require("url");
const express = require("express");
const app = express();

const repolist = require("./config/flagged-repos.json");
const flaggedRepos = repolist.flaggedRepoURLs;

app.use(express.json());

app.get("/info", (req, res) => {
    return res.json({
        version: repolist.version,
        updated: repolist.updated,
        flagged_count: repolist.flaggedRepoURLs.length
    });
});

app.post("/flagged", (req, res) => { 
    if (!req.body.url) return res.sendStatus(400);

    const parsed = parse(req.body.url);
    const normalised = `${parsed.hostname}${parsed.pathname == "/" ? "" : parsed.pathname}`.replace(/^www\./,'').trim();
    return res.send(flaggedRepos.indexOf(normalised) > -1);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Flagged Repo API listening on http://localhost:${port}.`));