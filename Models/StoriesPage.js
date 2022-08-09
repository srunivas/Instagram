const mongoose = require("mongoose");
const StoriesData = mongoose.Schema({
    user_id: { type: String, require: true, unique: true },
    myStories: {
        file: [{ Stories: { type: String }, Comments: [{ user_id: { type: String }, CommentDescription: { type: String, } }] }],
    }
});

module.exports = mongoose.model("AddToStoriesPage", StoriesData);