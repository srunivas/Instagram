const routerRegisterPage = require("express").Router();
const jwt = require("jsonwebtoken");
const registerData = require("../Models/Authorization/RegisterPage");
const multer = require("multer");
const { request } = require("express");
const MongoClient = require("mongodb").MongoClient;

var url = "mongodb+srv://srinivas:sRinu%40123@cluster0.byyznzp.mongodb.net/Instagram?retryWrites=true&w=majority";
var client = new MongoClient(url);


const Storage = multer.diskStorage({
    destination: "UserProfiles",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: Storage,
}).single("ProfileImage");

routerRegisterPage.post("/RegisterPage", async function(req, res) {
    console.log("registerPage");
    if (res.statusCode === 200) {
        upload(req, res, async(err) => {
            if (err) {
                console.log("error");
                return res.send(err);
            } else {
                console.log("success");
                try {
                    const regData = await registerData.create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        EmailID: req.body.EmailID,
                        MobileNumber: req.body.MobileNumber,
                        TokenID: Authenticate(req.body.Username),
                        Image: "http://localhost:5000/UserProfiles/" + req.file.filename
                    });
                    await regData.save().then(async(res) => {
                        let result = await client.connect();
                        let db = result.db("Instagram");
                        if (res._id !== null) {
                            console.log("created");
                            db.collection("ProfileImage").insertOne({
                                user_id: res._id,
                                username: req.body.Username,
                                EmailID: req.body.EmailID,
                                MobileNumber: req.body.MobileNumber,
                                TokenID: Authenticate(req.body.Username),
                                ProfileImage: "http://localhost:5000/UserProfiles/" + req.file.filename,
                                followers: [],
                                following: []
                            });
                        } else {
                            console.log("Error");
                        }
                    }).catch((err) => {
                        console.log("error = ", err);
                    });

                } catch (error) {
                    console.log("error = ", error);
                    return res.json({ "index": error.index, "value": error.keyPattern });
                }
                return res.json({ "statusCode": "200" });
            }
        });

    } else {
        return res.json({ "statusCode": "500" });
    }
});


function Authenticate(username) {
    let token = process.env.JWT_TOKEN;
    let tokenID = jwt.sign(username, token);
    return tokenID;
}

module.exports = routerRegisterPage;