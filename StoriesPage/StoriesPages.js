const routerPostStories = require("express").Router();
const multer = require("multer");
const MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
var client = new MongoClient(url);



routerPostStories.post("/StoriesPage", async(request, response) => {

    const Storage = multer.diskStorage({
        destination: "AddStoriesPages",
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });

    const upload = multer({
        storage: Storage,
    }).single("StoryFile");
    let results = await client.connect();
    let db = results.db("Instagram");
    if (response.statusCode === 200) {
        upload(request, response, async function(err) {
            if (err) {
                console.log("error")
            } else {
                console.log(request.file.filename);
                await db.collection("AddToStoriesPage").findOne({ "user_id": request.body.user_id }).then((res) => {
                    if (res !== null) {
                        console.log("Entered");
                        db.collection("AddToStoriesPage").updateOne({ user_id: request.body.user_id }, {
                            "$push": {
                                "myStories.file": {
                                    "Stories": "http://localhost:5000/AddStoriesPages/" + request.file.filename,
                                    "comments": [{ "user_id": "", "CommentDescription": "" }]
                                        //mention username profile
                                }
                            }
                        }).catch((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("Success");
                            }
                        });
                    } else {
                        console.log("Not entered");
                        db.collection("AddToStoriesPage").insertOne({
                                user_id: request.body.user_id,
                                myStories: {
                                    file: [{
                                        Stories: "http://localhost:5000/AddStoriesPages/" + request.file.filename,
                                        Comments: [
                                            { user_id: "", CommentDescription: "" }
                                        ]
                                    }]
                                }
                            },
                            function(err, res) {
                                if (err) {
                                    console.log("err = ", err);
                                    console.log("error");
                                } else {
                                    console.log("success");
                                }
                            })
                    }
                });
            }
        })


        return response.send(200)
    } else {
        return response.send(500);
    }
});





module.exports = routerPostStories;