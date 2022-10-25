const mongoose = require("mongoose")
const schema = mongoose.Schema
const mongoUser = require("./mongoUser")
module.exports = mongoose.model(

    "/mongomessage",
    new schema({

        messageInfo: String, //   信息
        messageDate: String, //时间

        about: { //表关联
            type: schema.Types.ObjectId,
            ref: mongoUser
        },
        messageSort: String,

    }, { versionKey: false })
)