const routerFollowingPage = require("express").Router();
const MongoClient = require("mongodb").MongoClient;

var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
var client = new MongoClient(url);



routerFollowingPage.post("/FollowingPage", async(request, response) => {
    if (response.statusCode === 200) {
        let result = await client.connect();
        let db = result.db("Instagram");
        await db.collection("ProfileImage").findOne({
            user_id: request.body.user_id
        }).then(async(res) => {
            if (res !== null) {
                await db.collection("ProfileImage").updateOne({ user_id: request.body.user_id }, {
                    "$push": {
                        "Friends": {
                            user_id: "id",
                            Username: "",
                            ProfileImage: "",
                            UserFollow: false,
                            FriendFollow: true
                        }
                    }
                }).then((res) => {
                    console.log("response = ", res);
                }).catch((err) => {
                    console.log("Error");
                })
            } else {
                console.log("Not created");
            }
        }).catch((err) => {
            console.log("error");
        })
        return response.send(200);
    } else {
        return response.send(500);
    }
});

module.exports = routerFollowingPage;