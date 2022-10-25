const multer = require('multer')
const path = require("path")
const storage = multer.diskStorage({
    destination: function(req, file, cb) { //上传文件存储位置
        if(file.originalname.endsWith(".md")){
            cb(null, path.resolve(__dirname, "../../public/file"))
        }else{
            cb(null, path.resolve(__dirname, "../../public/userimg"))
        }
        
    },
    filename: function(req, file, cb) { //上传文件名称
        cb(null, Date.now() + file.originalname) //file.fieldname+ '-' + Date.now()    Date.now() + file.originainame
    }
})

module.exports = multer({ storage: storage }).single("file")