const mongomessage = require("../mongoose/mongomessage")


//存储留言
const handlerbook = async({ id, inputMessage }) => {
    let bol = await mongomessage.create({
        messageInfo: inputMessage, //   信息
        messageDate: new Date().toLocaleDateString().replace("/", "年").replace("/", "月") + "日", //时间
        messageSort: Date.now(),
        about: id
    })

    return mongomessage.findById(bol._id).populate("about", { userPass: 0 })
}

//获取留言
const handlergetbook = async({ skip }) => {
    return await mongomessage.find({}, {}, { skip, limit: 10, sort: { messageSort: -1 } }).populate("about", { userPass: 0 })
}



module.exports = {
    handlerbook,
    handlergetbook
}