const routerPostsData = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const multer = require("multer");

var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
var client = new MongoClient(url);

const Storage = multer.diskStorage({
    destination: "PostsImages",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: Storage }).single("PostProfile");

routerPostsData.post("/api/postData", async(request, response) => {
    if (response.statusCode === 200) {
        let result = await client.connect();
        let db = result.db("Instagram");
        upload(request, response, async function(err) {
            if (err) {
                console.log("error");
            } else {
                await db.collection("PostsData").findOne({
                    user_id: request.body.user_id,
                }).then(async(res) => {
                    if (res === null) {
                        await db.collection("PostsData").insertOne({
                            user_id: request.body.user_id,
                            Posts: [{
                                Post: "http://localhost:5000/PostsImages/" + request.file.filename,
                                Comments: [
                                    { user_id: "", Likes: false, CommentDescription: "" }
                                ]
                            }],
                            CountLikes: 0
                        }).then((res) => {
                            console.log(res);
                        });
                    } else {
                        db.collection("PostsData").updateOne({ user_id: request.body.user_id }, {
                            "$push": {
                                "Posts": {
                                    "Post": "http://localhost:5000/PostsImages/" + request.file.filename,
                                    "Comments": [{ user_id: "", Likes: false, CommentDescription: "" }]
                                },
                            }
                        }).then((res) => {
                            console.log(res);
                        }).catch((err) => {
                            if (err) {
                                console.log("Error");
                            } else {
                                console.log("Success");
                            }
                        });
                    }
                    console.log("response = ", res);
                }).catch((err) => {
                    console.log("Error", err);
                })
            }
        })
        return response.send(200);
    } else {
        return response.send(500);
    }
});

module.exports = routerPostsData;