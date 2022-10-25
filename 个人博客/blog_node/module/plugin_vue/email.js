// const nodemailer = require("nodemailer");

// module.exports = () => {
//         //创建邮件程序
//         let transporter = nodemailer.createTransport({
//             host: "smtp.qq.com", //

//             port: 587,

//             auth: {
//                 user: "2633273689@qq.com", // 发送邮件的账号
//                 pass: "fibtstudupbndiaa", // 授权码
//             },
//         });
//         //邮件发送程序
//         transporter.sendMail({
//             from: '"sunShao"<2633273689@qq.com>', //  邮件发送人名称加地址
//             to: "3080116322@qq.com,2633273689@qq.com", // 收件人
//             subject: "姜硕", // 主题
//             text: "Hello world?", // 内容

//         }, (err, info) => {
//             console.log(err, info);
//         });
//     }
const nodemailer = require("nodemailer");

module.exports = ({ userName, email, theme, emailInfo }, callback) => {
    console.log(userName, email, theme, emailInfo);
    // 创建邮件程序
    let transporter = nodemailer.createTransport({
        // 设置qq发送
        host: "smtp.qq.com",
        auth: {
            user: "2633273689@qq.com", // 发送邮件账号
            pass: "fibtstudupbndiaa", // 邮件账号授权码
        },
    });
    //配置信息对象
    let info = [{ // 发送给自己看
            from: '"ssd"<2633273689@qq.com>', //  邮件发送人名称加地址
            to: "3080116322@qq.com,2633273689@qq.com", // 发送给谁
            subject: theme, //  主题
            text: userName + "先生(女士):" + emailInfo, // 正文
        },
        { // 发送给申请人看
            from: '"ssd"<2633273689@qq.com>', //  邮件发送人名称加地址
            to: email, // 发送给谁
            subject: "自动回复邮件", //  主题
            text: "已经接收你发送的邮件,我会在看到邮件事件立即联系你", // 正文
        }
    ]

    // 邮件发送
    info.forEach((item, index) => {
        transporter.sendMail(item, (err, info) => {
            if (err) {
                return callback({
                    code: 0,
                    value: '发送邮件失败'
                })
            }
            if (index == 1) {
                return callback({
                    code: 1,
                    value: '发送邮件成功'
                })
            }
        });
    })

}