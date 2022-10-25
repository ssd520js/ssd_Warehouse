const mongoose = require("mongoose")
const schema = mongoose.Schema

module.exports = mongoose.model(

    "/mongoArticle",
    new schema({
        articleTitle: String, //标题
        articleDesc: String, //描述
        articleMdUrl: String, // 
        articleImgUrl: {
            type:"String",
            default:"/userimg/16651278059741.jpeg"
        }, // 封面
        articleDate: {
            type:Date,
            default:Date.now()
        }, //博客时间
       
        articleBol: {
            type: Boolean,
            default: true,
        }, //推荐友链
    }, { versionKey: false })
)