const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routerRegisterPage = require("./Authorization/PostRegisterPage");
const routerPostLoginPage = require("./Authorization/PostLoginPages");
const routerPostStories = require("./StoriesPage/StoriesPages");
const routerAddStories = require("./StoriesPage/AddStories")
const routerDeletePostStories = require("./StoriesPage/DeleteStories");
const routerPostsData = require("./PostsPages/PostsPage");
const routerCommentsPage = require("./PostsPages/Comments");
const routerAddReelsPage = require("./ReelsPages/AddReelsPage");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
// const formidable = require('formidable');
// const multipart = require("multipart");
// const multipart = multipart();
const registerData = require("./Models/Authorization/RegisterPage");
const routerIncrementCountLikes = require("./PostsPages/PostIncrementCountLikes");
const routerDeletePostPages = require("./PostsPages/DeletePostPage");
const routerCommentsReelsPage = require("./ReelsPages/CommentsReelPage");
const routerDeleteReelsPage = require("./ReelsPages/DeleteReelsPage");
const routerProfilePage = require("./ProfilePage/profilepage");
const routerFollowersPage = require("./ProfilePage/followersPage");
const routerFollowingPage = require("./ProfilePage/FollowingPage");


mongoose.connect("mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority").then(() => {
    console.log("Mongo DB connected");
}).catch((error) => {
    console.log(error);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(multipart());

// app.post("/", async function(request, response) {
//     if (response.statusCode === 200) {
//         var form = new formidable.IncomingForm();
//         form.parse(request, function(err, fields) {
//             console.log(fields.user_id);
//         })

//         return response.json({ "code": "200" });
//     } else {
//         return response.json({ "code": "401" });
//     }
// });


const MongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
var client = new MongoClient(url);

app.get("/", async(request, response) => {
    if (response.statusCode === 200) {
        let result = await client.connect();
        let db = result.db("Instagram");

        console.log(request.body.name);
        var listOfId = request.body.name;
        var lis = [];
        for (let i = 0; i < listOfId.length; i++) {
            lis.push(
                await db.collection("AddToStoriesPage").findOne({ user_id: listOfId[i] }));
        }

        return response.send({ "name": lis });
    } else {
        return response.send(500);
    }
})




app.use("/UserProfiles", express.static("UserProfiles"));
app.use("/AddStoriesPages", express.static("AddStoriesPages"));
app.use("/PostsImages", express.static("PostsImages"));
//storage
// const Storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// })



// const upload = multer({
//     storage: Storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype === "image/png") {
//             cb(null, true);
//             return 200;
//         } else {
//             return 500;
//         }
//     }
// }).single("testImage")


// app.post("/upload/image", async function(req, res) {
//     if (res.statusCode === 200) {

//         upload(req, res, async(err) => {
//             if (err) {
//                 console.log("error");
//             } else {
//                 var data = await uploadImageData.create({
//                     Name: req.body.name,
//                     Image: {
//                         data: req.file.filename,
//                         contentType: 'image/png'
//                     }
//                 })
//             }
//             const imgUrl = "http://localhost:5000/testImage/" + req.file.filename;
//             await data.save().then(() => { res.send(imgUrl) });
//             return res.send(200);
//         })

//     } else {
//         return res.send("Error");
//     }
// })

// app.use('/uploads', express.static('uploads'));







function verification(token) {
    let verify = jwt.verify(token, process.env.JWT_TOKEN);
    if (verify) {
        console.log("true");
    } else {
        console.log("false");
    }

}



// app.get("/update", async(request, response) => {
//     let results = await client.connect();
//     let db = results.db("Instagram");

//     if (response.statusCode === 200) {
//         await db.collection("storiespages").updateOne({
//             user_id: "srinivas"
//         }, {
//             "$pull": {
//                 "myStories.file": {
//                     "stories": "urls",
//                     "comments": [{ "user_id": "12", "CommentDescription": "keka" }]

//                 }
//             }
//         })
//         db.collection("storiespages").removeOne({
//             user_id:"srinivas"
//         })
//         return response.send(200);
//     } else {
//         return response.send(500);
//     }
// })



app.use("/", routerRegisterPage);
app.use("/", routerPostLoginPage);
app.use("/", routerPostStories);
app.use("/", routerDeletePostStories);
app.use("/", routerPostsData);
app.use("/", routerCommentsPage);
app.use("/", routerIncrementCountLikes);
app.use("/", routerDeletePostPages);
app.use("/", routerAddReelsPage);
app.use("/", routerCommentsReelsPage);
app.use("/", routerDeleteReelsPage);
app.use("/", routerProfilePage);
app.use("/", routerFollowersPage);
app.use("/", routerFollowingPage);
// app.use("/", routerAddStories);

app.listen("5000", () => { console.log("Server Started") });