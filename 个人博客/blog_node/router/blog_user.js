const express = require("express")
const router = express.Router()
const { hanlderLink ,handlerHotlists} = require("../module/blog_user/handlerInfo")
const userLink = require("../module/mongoose/mongodLink")
const { handlerbook, handlergetbook } = require("../module/blog_user/handlerMessage")
    //设置友链路由
router.post("/userLink", async(req, res) => {

        let reuslt = await hanlderLink(req.body, req.session.userSession.data._id)

        res.send({
            reuslt
        })
    })
    //设置获取友链

router.get("/getLinks", async(req, res) => {
    let result = await userLink.find()
    res.send(result)
})
//设置友链推荐
router.post("/sethotlists",(req,res)=>{
    handlerHotlists(req.body)
res.send("修改成功")
})

//设置留言
router.post("/setmessage", async(req, res) => {
        let result = await handlerbook(req.body)

        res.send(result)
    })
    //获取留言
router.post("/getmessage", async(req, res) => {

    let reuslt = await handlergetbook(req.body)

    res.send(reuslt)
})

module.exports = router