const routerDeletePostStories = require("express").Router();
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
var filepath = 'E:/NodeProjects/Instagram/AddStoriesPages';

var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
var client = new MongoClient(url);

routerDeletePostStories.delete("/deleteStories", async(request, response) => {
    if (response.statusCode === 200) {
        console.log(request.body.id);
        let results = await client.connect();
        let db = results.db("Instagram");
        db.collection("AddToStoriesPage").deleteOne({
            user_id: request.body.id
        }).then((res) => {
            console.log(res.deletedCount);
            try {
                fs.unlinkSync(filepath, (err => {
                    if (err) {
                        console.log("error");
                    } else {
                        console.log("File removed successful");
                    }
                }))
            } catch (err) {
                console.log("No such file directory");
            }

        }).catch((err) => {
            console.log("Error = ", err);
        })
        return response.send(200);
    } else {
        return response.send(500);
    }
});

module.exports = routerDeletePostStories;