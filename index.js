const { parse } = require("url");
const express = require("express");
const { initDatabase } = require("./database/index");
const { infoController } = require("./controllers/info");
const { flaggedController, regenerateRegex } = require("./controllers/flagged");
const { homepageController } = require("./controllers/homepageController");
const app = express();

app.use(express.json());

app.get("/", homepageController);
app.get("/info", infoController);
app.post("/flagged", flaggedController);

initDatabase().then(() => console.log("Database connected."));

regenerateRegex();
const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Flagged Repo API listening on http://localhost:${port}.`)
);
