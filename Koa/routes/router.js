// 统一处理路由
const Router = require('koa-router')
const user = require('./userRouter')
const good = require('./goodRouter')
const wechat = require('./weChatRouter')
const login = require('./loginRouter')
const order = require('./orderRouter')
let router = new Router()
router.use('/user', user.routes(), user.allowedMethods())
router.use('/good', good.routes(), good.allowedMethods())
router.use('/wechat', wechat.routes(), wechat.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
router.use('/order', order.routes(), order.allowedMethods())
module.exports = router