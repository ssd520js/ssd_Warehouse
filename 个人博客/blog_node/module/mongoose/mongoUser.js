const mongoose = require("mongoose")


module.exports = mongoose.model(

    "/userInfo",
    new mongoose.Schema({
        userName: String,
        userPass: String,
        userDate: {
            type: Date,
            default: Date.now() + 1000 * 60 * 60 * 8
        },
        userIcon: {
            type: String,
            default: "/vue_img/default avatar.jpg"
        }
    }, { versionKey: false })
)