const routerCommentsReelsPage = require("express").Router();
const MongoClient = require("mongodb").MongoClient;

var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
var client = new MongoClient(url);


routerCommentsReelsPage.post("/CommentsReelPage", async(request, response) => {
    if (response.statusCode === 200) {
        let result = await client.connect();
        let db = result.db("Instagram");
        await db.collection("AddToReelsPage").findOne({ user_id: request.body.user_id }).then(async(res) => {
            if (res === null) {
                console.log("No user");
            } else {
                db.collection("AddToReelsPage").updateOne({
                    user_id: request.body.user_id,
                    "Reels.ReelsVideo": "2022-01-25 (1).png"
                }, {
                    "$push": {
                        "Reels.$.Comments": {
                            CmtUser_id: "",
                            UserName: "",
                            ProfileImage: "",
                            CommentDescription: ""
                        }
                    }
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log("Error");
                })
            }
        })
        return response.send(200);
    } else {
        return response.send(500);
    }
});
module.exports = routerCommentsReelsPage;