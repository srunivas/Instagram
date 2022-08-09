const routerDeleteReelsPage = require("express").Router();
const fs = require("fs");

var filePath = "E:/NodeProjects/Instagram/ReelsVideos/";

routerDeleteReelsPage.post("/DeleteReelsPage", (request, response) => {
    if (response.statusCode === 200) {
        try {
            fs.unlinkSync(filePath + request.body.imageName, (err) => {
                if (err) {
                    console.log("error");
                } else {
                    console.log("File deleted successfully");
                }
            });
        } catch (err) {
            console.log(err);
        }
        return response.send(200);
    } else {
        return response.send(500);
    }
});

module.exports = routerDeleteReelsPage;