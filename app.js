const Koa = require("koa");
const {appPort,viewsRoot,staticRoot} = require('./config.js');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
//引入路由中间间
const musicrouter = require('./routers/music');
const usersrouter = require('./routers/users');

//创建服务器
let app = new Koa();


//开启服务器
app.listen(appPort, () => {
    console.log("run....");
});


// 模板渲染

const render = require('koa-art-template');
render(app, {
    root: viewsRoot,
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

//优雅处理异常

app.use(async (ctx,next) => {
    try {
        //先放行
        await next();
    }catch (e) {
        // 根据之前的
        // e.code之类的状态码002
        ctx.render('error',{msg:'002状态错误，原因是:xxx'})
    }
})


//为静态资源重写url
app.use(async (ctx, next) => {
    if (ctx.request.url.startsWith("/public")) {
        ctx.request.url = ctx.request.url.replace('/public', '');
    }
    await next();
});


//处理静态资源
app.use(require('koa-static')(staticRoot));

app.keys = ['zsw']; //基于zsw字符串进行签名运算 保证数据不被串改
let store = {
    storage: {},
    get (key) {  // key就是 cookie中的session_id
        return this.storage[key]
    },
    set (key, session) {
        this.storage[key] = session
    },
    destroy (key) {
        delete this.storage[key]
    }
};

app.use(session({store:store},app));


//处理请求体数据

app.use(bodyParser());
//中间件使用列表
app.use(musicrouter.routes());
app.use(usersrouter.routes());

app.use(musicrouter.allowedMethods());
app.use(usersrouter.allowedMethods());


