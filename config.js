const path = require('path');
module.exports = {
    appPort: 8888,
    viewsRoot: path.resolve(__dirname, './views'),
    staticRoot:path.resolve(__dirname, './public'),
    uploadDir: path.join(__dirname, 'public/files'),
    dbConfig: {
        // mysql默认端口3306
        // oracle默认端口1521
        // sqlserver 1433
        host: 'localhost', //主机
        user: 'root', // 用户名
        password: '123123', // 密码
        database: 'node_music' // 数据库名
    }
}
