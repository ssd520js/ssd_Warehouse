const express = require("express")
const router = express.Router()
const email = require("../module/plugin_vue/email")
const svg = require("../module/plugin_vue/svgcaptcha")
const { handleruser, change, changeImg } = require("../module/blog_user/handlerUser")
const upload = require("../module/plugin_vue/multer")
const multer = require('multer')
    //设置邮件
router.post("/setEmail", (req, res) => {

        let { ruleForm } = req.body;
        email(ruleForm, callFun)

        function callFun(value) {
            res.send(value)
        }


    })
    //设置svg图片
router.get("/getsvg", (req, res) => {

        let { text, data } = svg()
        res.send({ code: 1, text, data })

        //设置用户注册登录
        router.post("/userInfo", async(req, res) => {

            let { ruleForm } = req.body;
            let result = await handleruser(ruleForm)
                //设置session
            if (result.code) {
                req.session.userSession = result
            }
            res.send(result)



        })
    })
    //获取用户session
router.get("/getcookie", (req, res) => {
            let data = req.session.userSession
            if (data) {
                res.send(data)
            } else {
                data = {
                    code: 0,
                }
                res.send(data)
            }

        }

    )
    //设置退出
router.post("/destory", (req, res) => {
            req.session.userSession = ""
            let data = {
                userDate: "",
                userIcon: "/vue_img/avatar.jpg",
                userName: "",
                userPass: "",
                _id: ""
            }
            res.send(data)
        }

    )
    //设置修改用户名
router.post("/changeuser", async(req, res) => {

        let result = await change(req.body)
        if (result.code) {
            req.session.userSession = result
        }

        res.send(result)

    })
    //设置修改密码
router.post("/changepass", async(req, res) => {

        let result = await change(req.body)
        if (result.code) {
            req.session.userSession = result
        }
        res.send(result)

    })
    // 设置头像
router.post("/changeimg", (req, res) => {
    upload(req, res, async function(err) {
        if (err instanceof multer.MulterError) { // 上传错误
            console.log("上传错误");
        } else if (err) {
            // 发生错误 位置错误
            console.log("位置错误");
        }
        // 一切都好
        let { id } = req.body
        let path = '/userimg/' + req.file.filename //获取图片地址
        let origin = req.session.userSession.data.userIcon
        let result = await changeImg(id, path, origin) //改用户头像地址链接
        req.session.userSession = { code: 1, value: "修改成功", data: result }; //设置session
        res.send({ code: 1, value: "修改成功", data: result })
    })
})
module.exports = router