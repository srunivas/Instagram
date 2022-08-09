// const routerAddStories = require("express").Router();
// const multer = require("multer");

// const MongoClient = require('mongodb').MongoClient;

// var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
// var client = new MongoClient(url);


// const Storage = multer.diskStorage({
//     destination: "StoriesPage234",
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({
//     storage: Storage,
// }).single("StoryFile");


// routerAddStories.post("/addToStories", async(request, response) => {
//     if (response.statusCode === 200) {

//         upload(request, response, async function(err) {
//             if (err) {
//                 console.log("Error");
//             } else {
//                 let result = await client.connect();
//                 let db = result.db("Instagram");
//                 db.collection("AddToStoriesPage").updateOne({ user_id: "srinivas" }, {
//                     "$push": {
//                         "myStories.file": {
//                             "Stories": "http://localhost:5000/StoriesPage" + request.file.filename,
//                             "comments": [{}]
//                         }
//                     }
//                 });
//                 console.log(request.file.filename);
//             }
//         });


//         return response.send(200);
//     } else {
//         return response.send(500);
//     }
// });

// module.exports = routerAddStories;