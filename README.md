<img align="left" src="http://getsileo.app/img/icon.png" width="150" height="150"></img>

# Flagged Repo API

A simple API written in node to return if a Sileo repo is flagged. A production version of this API can be found at [flagged-repo-api.getsileo.app](https://flagged-repo-api.getsileo.app).

## Why is my repo flagged?

If you believe your repo is wrongly flagged, please contact [@SileoSupport](https://twitter.com/SileoSupport) on Twitter. Please do not make a PR to this repo attempting to remove it, as the flagged repo list is not published.

Additionally, if you wish to report a dangerous repo, please contact [@SileoSupport](https://twitter.com/SileoSupport) on Twitter where the claims will be investigated. Again, do not open a PR on this repo for that reason.

## Installation 

### Flagged Repo "database"

* For obvious reasons, we do not ship the JSON file containing flagged repos. Therefore, you will have to move `config/flagged-repos.example.json` to `config/flagged-repos.json` and add some sample repos for testing.
* The API normalises the URL, stripping the protocol (http/https), removing any trailing slashes.

### Setup 

1. `yarn install`
2. Move `config/flagged-repos.example.json` to `config/flagged-repos.json` and add some sample repos for testing
3. `node index.js`
4. :tada:

## Developers

Feel free to use our API. It has been optimised for speed, so your traffic should be fine. The two calls it supports are listed below.

### GET `/info`

Returns information about the database that the API is currently using, such as when it was last updated and how many repos are flagged.

**Example response:**

```json
{"version":1,"updated":"2018-12-27T14:36:35.828Z","flagged_count":44}
```

### POST `/flagged`

Returns `true` if the repo is flagged, `false` if it's not.

**Example request:**

**Content-Type:** `application/json`
```json
{"url": "https://pirates.com"}
```
