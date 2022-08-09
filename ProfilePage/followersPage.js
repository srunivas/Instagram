const routerFollowersPage = require("express").Router();

routerFollowersPage.post("/followersPage", (request, response) => {
    if (response.statusCode === 200) {
        return response.send(200);
    } else {
        return response.send(500);
    }
});

module.exports = routerFollowersPage;