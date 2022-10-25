const userLink = require("../mongoose/mongodLink")



//处理友链
const hanlderLink = async({ ruleForm }, id) => {
    // 查找到就修改
    let bol = await userLink.findOne({ about: id })

    //没有查找到创建新的
    if (!bol) {

        await userLink.create({
            blogName: ruleForm.blogName, //博客名
            blogOrigin: ruleForm.blogOrigin, //博客地址
            blogLogin: ruleForm.blogLogin, // logo地址
            blogMessage: ruleForm.blogMessage, // 博客描述
            blogDate: Date.now() + 1000 * 60 * 60 * 8,
            about: id

        })

    } else {
        await userLink.updateOne({ about: id }, {
            blogName: ruleForm.blogName, //博客名
            blogOrigin: ruleForm.blogOrigin, //博客地址
            blogLogin: ruleForm.blogLogin, // logo地址
            blogMessage: ruleForm.blogMessage, // 博客描述
        })

    }

    return {
        code: bol ? 0 : 1,
        data: await userLink.findOne({ about: id }),
        value: bol ? "修改成功" : "新增成功"
    }

}
//设置推荐
const handlerHotlists =async ({id,blogLinkHot})=>{
    await userLink.updateOne({ _id: id },{blogLinkHot})
}

module.exports = {
    hanlderLink,
    handlerHotlists
}