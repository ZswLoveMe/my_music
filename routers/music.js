/**
 * @author  zsw
 * @date  2019/7/29 16:54
 * @version 1.0
 */
//引入路由中间间
const Router = require('koa-router');
const musicrouter = Router();
const db = require('../models/db.js')

musicrouter.get('/music/index', async ctx => {
    ctx.render('index.html')
})
.get('/music/add',async ctx=>{
        ctx.render('add.html');
    })
.get('/music/edit',async ctx=>{
        ctx.render('edit.html');
})
module.exports = musicrouter;
