const { parse } = require("url");
const express = require("express");
const app = express();

const repolist = require("./config/flagged-repos.json");
const flaggedRepos = repolist.flaggedRepoURLs;

var repoRegexes = []; 

const createRegex = (url) => {
    // basically https://stackoverflow.com/a/39095107/9784092 but better
    const split = /([^\/]+)(\/.*)?/;
    
    const matches = url.match(split);
    if (!matches) return null;

    var preparedURL = "";
    preparedURL = `${matches[1]}`.replace(/[?()[\]\\.+^$|]/g, "\\$&").replace(/\*\\./g,'(?:[^/]*\\.)*').replace(/\*$/,'[^/]*');

    if (matches[2]) {
        preparedURL += matches[2].replace(/[?()[\]\\.+^$|]/g, "\\$&").replace(/\/\*(?=$|\/)/g, '(?:/[^]*)?');
    }
    return new RegExp(`^${preparedURL}$`, "i");
}

const regenerateRegex = () => {
    console.log("Generating regex array.");
    for (const repo of flaggedRepos) {
        const regex = createRegex(repo);
        if (!regex) return console.error(`Failed to generate regex for ${repo}.`);
    
        repoRegexes.push(regex);
    }
    console.log("Generated regex array.");
}

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
    if (!req.body.url) return res.sendStatus(400);

    const parsed = parse(req.body.url);
    const normalised = `${parsed.hostname}${parsed.pathname == "/" ? "" : parsed.pathname}`.replace(/^www\./,'').trim();

    const hasFlagged = repoRegexes.some(regex => {
        return normalised.match(regex) !== null;
    });

    return res.send(hasFlagged);
});

regenerateRegex();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Flagged Repo API listening on http://localhost:${port}.`));