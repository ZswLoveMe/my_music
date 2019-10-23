/**
 * 业务模块
 * @author  zsw
 * @date  2019/7/29 23:22
 * @version 1.0
 */
const userModel = require('../models/user.js');

module.exports ={
    showRegister: async (ctx,next)=>{
        ctx.render("register.html");
    },
    checkUsername:async (ctx,next)=>{
        //接收请求的繁琐事务
        let { username } = ctx.request.body;
        //查询数据库中是否存在该用户名
        let user = await userModel.findUserByname(username);
        if (user.length === 0){
            ctx.body = {code:'001',msg:"可以注册"}
            return;
        }
        ctx.body = {code:'002',msg:"用户名已经存在"}
    },
    doRegister:async (ctx,next)=>{
        //获取前端的数据
        let {username,password,email,v_code} = ctx.request.body;
        //查询数据库中是否存在该用户名
        let user = await userModel.findUserByname(username);
        if (user.length !== 0){
            ctx.body = {code:'002',msg:"用户名已经存在"}
            return;
        }
        // 用户名 不存在  可以开始注册
     try {
         let result = await userModel.registerUser(username,password,email);
         console.log(result);
         if (result.affectedRows === 1) {
             console.log(result);
             ctx.body = { code: '001',msg:'注册用户成功'}
             return;
         }
         // 不等于1的情况会发生在id冲突，就不插入数据
         ctx.body = { code:'002' , msg:result.message };
     }catch (e) {
         ctx.throw('002')
     }
    },
    showLogin:async ctx=>{
        ctx.render('login.html')
    },
    doLogin:async (ctx,next)=>{
        let {username,password} = ctx.request.body;
        //检查用户名和密码是否匹配
        let user = await userModel.findUserByNameAndPassword(username,password);
        if (user.length !== 0){
            ctx.body = {code:"001",msg:"登录成功"}
            ctx.session.user = user;
            return;
        }
        ctx.body = { code:'002' , msg:"登录失败 用户名和密码不匹配" };
    }
}
