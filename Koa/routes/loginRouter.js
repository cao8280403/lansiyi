const Router = require('koa-router')()
const loginController = require('../controller/loginController')

const router = Router
    .post('/', loginController.goLogin)
module.exports = router