const mongoose = require("mongoose")
const schema = mongoose.Schema
const mongoUser = require("./mongoUser")
module.exports = mongoose.model(

    "/userLink",
    new schema({
        blogName: String, //博客名
        blogOrigin: String, //博客地址
        blogLogin: String, // logo地址
        blogMessage: String, // 博客描述
        blogDate: Date, //博客时间
        about: { //表关联
            type: schema.Types.ObjectId,
            ref: mongoUser
        },
        blogLinkHot: {
            type: Boolean,
            default: true,
        }, //推荐友链
    }, { versionKey: false })
)