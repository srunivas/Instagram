const routerDeletePostPages = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");

var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
var client = new MongoClient(url);
var filePath = "E:/NodeProjects/Instagram/PostsImages";

routerDeletePostPages.post("/deletePostPages", async(request, response) => {
    if (response.statusCode === 200) {
        let result = await client.connect();
        let db = result.db("Instagram");
        await db.collection("PostsData").deleteOne({ user_id: request.body.user_id }, ).then((res) => {
            console.log(res);
            try {
                fs.unlinkSync(filePath + "/Picture1.jpg", function(err) {
                    if (err) {
                        console.log("error");
                    } else {
                        console.log("File removed successfully");
                    }
                })
            } catch (err) {
                console.log(err);
            }
        })
        return response.send(200);
    } else {
        return response.send(500);
    }
});

module.exports = routerDeletePostPages;