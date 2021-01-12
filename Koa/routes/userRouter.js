/**
 * 用户子路由
 */
const Router = require('koa-router')()
const userController = require('../controller/userController');

const router = Router
    .get('/', userController.findAllUser)
    .post('/update', userController.updateUser)
module.exports = router
