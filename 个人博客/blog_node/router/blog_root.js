const express = require("express")
const router = express.Router()
const { handlerRootStart, handlerRootLogin ,handlerRootPass,handlerInfo,handlerArticleAll,handlerChangeinfo,handlerChangeImg,handlerDelete,handlerGet,changearticleinfo} = require("../module/blog_user/handlerRoot")
const upload = require("../module/plugin_vue/multer")
const multer = require('multer')
const fs =require("fs")
//设置root初始账号
router.get("/", (req, res) => {
        handlerRootStart()
        res.send("初始化成功")
    })
//修改root密码
router.post("/changeroot",(req,res)=>{
    handlerRootPass(req.body)
    res.send("修改成功")
})
    //设置root登录
router.post("/rootLogin", async(req, res) => {
    let result = await handlerRootLogin(req.body)

    res.send(result)
})
//root md文档上传
router.post("/articleMd",async(req,res)=>{
    upload(req, res, async function(err) {
        if (err instanceof multer.MulterError) { // 上传错误
            return res.send({code:0,value:"上传错误"})
        } else if (err) {
            // 发生错误 位置错误
            return res.send({code:0,value:"未知错误"})
        }
        let path = req.file.path
        let url = "/file/"+req.file.filename
        res.send({code:1,data:{path,url},value:"上传成功"})
    })
})
//删除md文档
router.post("/deleteMd",(req,res)=> {
    if(req.body.mdUrl.path)return res.send("")
   fs.unlinkSync(req.body.mdUrl)
    res.send("删除成功")
})
//处理封面
router.post("/articleImg",(req,res)=>{
    upload(req, res, async function(err) {
        if (err instanceof multer.MulterError) { // 上传错误
            return res.send({code:0,value:"上传错误"})
        } else if (err) {
            // 发生错误 位置错误
            return res.send({code:0,value:"未知错误"})
        }
        let path = req.file.path
        let url = "/userimg/"+req.file.filename
        res.send({code:1,data:{path,url},value:"上传成功"})
    })
})
//存储文章信息
router.post("/handlermdInfo",async(req,res)=>{
   let result=await handlerInfo(req.body)

    res.send(result)

})
//文章管理

//获取所有的文章信息
router.get("/getall",async(req,res)=>{
  let result=await handlerArticleAll()
    res.send(result)
})
//修改标题和描述
router.post("/changeinfo",async(req,res)=>{
    handlerChangeinfo(req.body)
    res.send("修改成功")
})
//修改封面
router.post("/changeImg",(req,res)=>{
    upload(req, res, async function(err) {
        if (err instanceof multer.MulterError) { // 上传错误
            return res.send({code:0,value:"上传错误"})
        } else if (err) {
            // 发生错误 位置错误
            return res.send({code:0,value:"未知错误"})
        }
        let url = "/userimg/"+req.file.filename
        handlerChangeImg(req.body,url)
        res.send(url)
    })
})
//获取文档数据处理页码
router.post("/getarticle",async(req,res)=>{
    let result =  await handlerGet(req.body)
    res.send(result)
})
//删除文件
router.post("/deletearticle",(req,res)=>{
    handlerDelete(req.body)
    res.send("删除成功")
})
//修改文档
router.post("/changearticleinfo",(req,res)=>{
    let result = changearticleinfo(req.body)
    res.send("修改成功")
})
module.exports = router