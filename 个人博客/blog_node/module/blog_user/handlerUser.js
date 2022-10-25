const mongoUser = require("../mongoose/mongoUser")
const fs = require("fs")
const paths = require("path")
    //处理用户
const handleruser = async({ userName, userPass }) => {
        let result = await mongoUser.findOne({ userName })
        if (!result) {
            let data = await mongoUser.create({ userName, userPass })
                // console.log("注册", data);
            return { code: 1, value: "注册成功", data }
        }
        if (result.userPass == userPass) {
            // console.log("登陆成功");
            return { code: 1, value: "登陆成功", data: result }
        }
        // console.log("密码不正确");
        return { code: 0, value: "密码不正确", data: "" }

    }
    //###处理用户修改名称
    // const changeUser = async({ userName, id }) => {

//         let bol = await mongoUser.findById(id)

//         if (!bol) {
//             return {
//                 code: 0,
//                 value: "不存在"
//             }
//         } else {
//             await mongoUser.updateOne({ _id: id }, { userName })
//             bol.userName = userName
//             return {
//                 code: 1,
//                 data: bol
//             }
//         }
//     }


//修改密码 用户名
const change = async({ userPass, id, userName }) => {

        let bol = await mongoUser.findById(id)
        console.log(bol)
        if (!bol) {
            return {
                code: 0,
                value: "不存在"
            }
        } else {
            userPass ? await mongoUser.updateOne({ _id: id }, { userPass }) : await mongoUser.updateOne({ _id: id }, { userName })
            userPass ? bol.userPass = userPass : bol.userName = userName
            return {
                code: 1,
                data: bol
            }
        }
    }
    //修改用户头像
const changeImg = async(id, path, origin) => {
    let bol = origin.startsWith("/userimg")
    if (bol) { //删除文件

        fs.unlink(paths.resolve(__dirname, "../../public/" + origin), () => {})

    }
    await mongoUser.updateOne({ _id: id }, { userIcon: path })
    return await mongoUser.findById(id)
}
module.exports = {
    handleruser,
    change,
    changeImg
}