const routerPostLoginPage = require("express").Router();
const registerData = require("../Models/Authorization/RegisterPage");
routerPostLoginPage.post("/LoginPage",
    async function(request, response) {
        if (response.statusCode === 200) {
            try {
                console.log(request.body.verify);
                var res = await registerData.findOne({ "Username": request.body.verify });
                console.log("res = ", res);
                if (await registerData.findOne({ "Username": request.body.verify }) !== null) {
                    let userData = await registerData.findOne({ "Username": request.body.verify });
                    if (userData.Password === request.body.Password) {
                        return response.json({ "statusCode": "400", "_id": userData._id });
                    } else {
                        return response.json({ "statusCode": "401" });
                    }

                } else if (await registerData.findOne({ "EmailID": request.body.verify }) !== null) {

                    let userData = await registerData.findOne({ "EmailID": request.body.verify });
                    if (userData.Password === request.body.Password) {
                        return response.json({ "statusCode": "400", "_id": userData._id });
                    } else {
                        return response.json({ "statusCode": "401" });
                    }
                } else if (await registerData.findOne({ "MobileNumber": request.body.verify }) !== null) {

                    let userData = await registerData.findOne({ "MobileNumber": request.body.verify });
                    if (userData.Password === request.body.Password) {
                        return response.json({ "statusCode": "400", "_id": userData._id, "TokenID": userData.TokenID });
                    } else {
                        return response.json({ "statusCode": "401" });
                    }
                } else {
                    console.log("User not Authorized");
                    return response.json({ "statusCode": "404" });
                }
            } catch (error) {
                return response.json({ "statusCode": error.code });
            }

        } else {
            return response.json({ "statusCode": response.statusCode });
        }
    });




module.exports = routerPostLoginPage;