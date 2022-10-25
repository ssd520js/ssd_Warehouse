const svgCaptcha = require('svg-captcha');

module.exports = () => {
    //创建svg
    let captcha = svgCaptcha.create({
        size: 4,
        ignoreChars: '0o1i',
        noise: 1,
        background: '#cc9966',
        width: 100,
        height: 40
    });
    return captcha

}