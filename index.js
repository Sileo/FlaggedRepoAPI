const { parse } = require("url");
const express = require("express");
const { initDatabase } = require("./database/index");
const { ApiRequest } = require("./database/entities/ApiRequest");
const { infoController } = require("./controllers/info");
const { flaggedController } = require("./controllers/flagged");
const { homepageController } = require("./controllers/homepageController");
const app = express();

const repolist = require("./config/flagged-repos.json");
const flaggedRepos = repolist.flaggedRepoURLs;

app.use(express.json());

app.get("/", homepageController);
app.get("/info", infoController);
app.post("/flagged", flaggedController);

initDatabase().then(() => console.log("Database connected."));

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Flagged Repo API listening on http://localhost:${port}.`)
);
