const root = require("../mongoose/mongoRoot")
const mongoArticle = require("../mongoose/mongoArticle")
const fs =require("fs")
const path = require("path")
//初始化账号
const handlerRootStart = async() => {
    let bol = await root.findOne({ rootName: "ssd520js" })
    if (bol) { return }
    await root.create({

        rootName: "ssd520js",
        rootPass: "ssd520js1314*+"

    })


}
const handlerRootLogin = async({ rootName, rootPass }) => {
    let bol = await root.findOne({ rootName, rootPass })
    if (!bol) {
        return {
            code: 0,
            value: "账号密码不存在"
        }
    } else {
        return {
            code: 1,
            value: "登陆成功",
            data: bol
        }
    }
}
//修改密码
const handlerRootPass = async({inputPass})=>{
  await  root.updateOne({ rootName: "ssd520js"},{rootPass:inputPass})

}
//存储文章信息
const handlerInfo = async ({form,mdUrl,mdImgUrl})=>{
  if(!fs.existsSync(mdUrl.path)) return {code:0,value:"文章不存在"}
let bol = await  mongoArticle.create({
    articleTitle: form.name, //标题
        articleDesc: form.desc, //描述
        articleMdUrl: mdUrl.url, // 
        articleImgUrl:mdImgUrl.url
})
 return {code:1,value:"文章创建完成"}
}
//获取所有文章信息
const handlerArticleAll = async()=>{
//     let bol =await mongoArticle.find({},{},{limit:10,sort:{articleDate:-1}})
//    let data= await mongoArticle.find({},{},{limit:10,sort:{articleDate:-1}})
    let bol = await mongoArticle.find()
    let data = bol.slice(0,10)
   return {bol:bol.length,data}
}
//修改信息
const handlerChangeinfo = async({articleDesc,articleTitle,id})=>{
 
  await  mongoArticle.updateOne({_id:id},{articleDesc,articleTitle})
}
//修改封面
const handlerChangeImg = async({articleImgUrl,id},url)=>{
    fs.unlinkSync(path.resolve(__dirname,"../../public"+articleImgUrl))
    await mongoArticle.updateOne({_id:id},{articleImgUrl:url})
}
//获取页码数据
const handlerGet = async({number})=>{
    return await mongoArticle.find({},{},{limit:10,skip:number})
}
//删除文件
const handlerDelete = async({id})=>{
    let bol = await mongoArticle.findById(id)
    
    fs.unlinkSync(path.resolve(__dirname,"../../public"+bol.articleMdUrl))
    fs.unlinkSync(path.resolve(__dirname,"../../public"+bol.articleImgUrl))
     await mongoArticle.deleteOne({_id:id})
}
//修改文章
const changearticleinfo= async({value,id})=>{
    let bol =await mongoArticle.findById(id)
    let url = path.resolve(__dirname,"../../public"+bol.articleMdUrl)
    fs.writeFile(url,value,()=>{})
}
module.exports = {
    handlerRootStart,
    handlerRootLogin,
    handlerRootPass,
    handlerInfo,
    handlerArticleAll,
    handlerChangeinfo, 
    handlerChangeImg,
    handlerDelete,
    handlerGet,
    changearticleinfo
}