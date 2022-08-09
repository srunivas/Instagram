const mongoose = require("mongoose");
const registerData = mongoose.Schema({
    Username: { type: String, unique: true, require: true },
    EmailID: { type: String, unique: true, require: true },
    MobileNumber: { type: String, unique: true, require: true },
    Password: { type: String, require: true },
    TokenID: { type: String, unique: true },
    Image: { type: String, require: true }
});
module.exports = mongoose.model("RegisterPage", registerData);