const express = require("express")
const app = express()

// 配置静态
app.use(express.static("./public"))
    // 解析请求数据
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
    //设置session
app.use(require("./module/plugin_vue/session"))

//设置子路由
app.use("/blog", require("./router/blog_vue"))
    //设置 user路由
app.use("/user", require("./router/blog_user"))
    //设置root
app.use("/root", require("./router/blog_root"))
    //使用mongoose
require("./module/mongoose/mongoose")
app.listen("80", () => {
    console.log("80端口连接成功");
})