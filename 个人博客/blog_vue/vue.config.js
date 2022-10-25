module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://music.163.com/#/my/m/music',
                ws: true,
                changeOrigin: true,
                pathRewrite: { //  /api 替换
                    '^/api': ''
                }
            },
            "/node": {
                target: 'http://localhost:80',
                ws: true,
                changeOrigin: true,
                pathRewrite: { //  /node 替换
                    '^/node': ''
                }
            }
        }
    }
}