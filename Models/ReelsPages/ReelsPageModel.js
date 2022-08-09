const mongoose = require("mongoose");
var ReelsDataModel = mongoose.Schema({
    user_id: { type: String, require: true, unique: true },
    Reels: [{ ReelsVideo: "", Comments: [{ CmtUSer_id: { type: String }, UserName: { type: String }, ProfileImage: { type: String }, CommentDescription: { type: String } }], CountLikes: 0 }],
});
module.exports = mongoose.model("AddToReelsPage", ReelsDataModel);