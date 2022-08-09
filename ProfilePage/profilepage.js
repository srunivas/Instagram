const routerProfilePage = require("express").Router();


routerProfilePage.post("/ProfilePage", (request, response) => {
    if (response.statusCode === 200) {
        return response.send(200);
    } else {
        return response.send(500);
    }
});
module.exports = routerProfilePage;