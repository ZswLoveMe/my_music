/**
 * @author  zsw
 * @date  2019/7/29 16:54
 * @version 1.0
 */

//引入路由中间间
const Router = require('koa-router');
let userrouter = new Router();
const userController = require('../controllers/user.js')

userrouter.get('/user/register', userController.showRegister)
    .post('/user/check-username',userController.checkUsername)
    .post('/user/do-register',userController.doRegister)
    .get('/user/login',userController.showLogin)
    .post('/user/do-login',userController.doLogin);
module.exports = userrouter;
