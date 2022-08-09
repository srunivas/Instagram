const mongoose = require("mongoose");
var PostData = mongoose.Schema({
    user_id: { type: String, require: true, unique: true },
    Posts: [{
        posts: { type: String, require: true },
        Comments: [
            { user_id: { type: String, require: true }, Likes: { type: Boolean }, CommentDescription: { type: String } }
        ]
    }],
    CountLikes: { type: String }
});
module.exports = mongoose.model("PostData", PostData);