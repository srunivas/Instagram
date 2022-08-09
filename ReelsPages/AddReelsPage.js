const routerAddReelsPage = require("express").Router();
const ReelsDataModel = require("../Models/ReelsPages/ReelsPageModel");
const MongoClient = require("mongodb").MongoClient;
const multer = require("multer");



var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
var client = new MongoClient(url);

const Storage = multer.diskStorage({
    destination: "ReelsVideos",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: Storage }).single("ReelsVideo");

routerAddReelsPage.post("/addReels", async(request, response) => {
    if (response.statusCode === 200) {
        let result = await client.connect();
        let db = result.db("Instagram");
        upload(request, response, async function(err) {
            if (err) {
                console.log("Error = ");
            } else {
                await db.collection("AddToReelsPage").findOne({ user_id: request.body.user_id }).then(async(res) => {
                    if (res === null) {
                        await db.collection("AddToReelsPage").insertOne({
                            user_id: request.body.user_id,
                            Reels: [{ ReelsVideo: request.file.filename, Comments: [{ CmtUSer_id: "", UserName: "", ProfileImage: "", CommentDescription: "" }], CountLikes: 0 }]
                        }).then((res) => {
                            console.log(res);
                        }).catch((err) => {
                            console.log("Error:", err);
                        });
                    } else {
                        console.log("updated");
                        await db.collection("AddToReelsPage").updateOne({ user_id: request.body.user_id }, {
                            "$push": {
                                Reels: [{ ReelsVideo: request.file.filename, Comments: [{ CmtUSer_id: "", UserName: "", ProfileImage: "", CommentDescription: "" }], CountLikes: 0 }]
                            }
                        }).then((res) => {
                            console.log(res);
                        }).catch((err) => {
                            console.log("Error:", err);
                        });
                    }

                }).catch((err) => {
                    console.log("Error = ", err);
                })
            }
        });
        return response.send(200);
    } else {
        return response.send(500);
    }
});

module.exports = routerAddReelsPage;