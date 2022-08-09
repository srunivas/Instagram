const routerCommentsPage = require("express").Router();
const MongoClient = require("mongodb").MongoClient;

var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
var client = new MongoClient(url);

routerCommentsPage.post("/PostComments", async(request, response) => {
    if (response.statusCode === 200) {
        let result = await client.connect();
        let db = result.db("Instagram");
        db.collection("PostsData").updateOne({
            user_id: request.body.user_id,
            "Posts.Post": "http://localhost:5000/PostsImages/2022-01-25.png"
        }, {
            "$push": {
                "Posts.$.Comments": {
                    user_id: "",
                    Likes: false,
                    CommentDescription: ""
                }
            }
        })
        return response.send(200);
    } else {
        return response.send(500);
    }
});
module.exports = routerCommentsPage;