const routerIncrementCountLikes = require("express").Router();
const MongoClient = require("mongodb").MongoClient;

var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
var client = new MongoClient(url);

routerIncrementCountLikes.post("/CountLikes", async(request, response) => {
    console.log(request.body.user_id);
    if (response.statusCode === 200) {
        let result = await client.connect();
        let db = result.db("Instagram");
        db.collection("PostsData").updateOne({ user_id: request.body.user_id }, {
            "$inc": {
                CountLikes: request.body.count
            }
        }).then((res) => {
            console.log(res);
        });
        return response.send(200);
    } else {
        return response.send(500);
    }
});

module.exports = routerIncrementCountLikes;