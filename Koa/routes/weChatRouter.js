/**
 * 微信子路由
 */
const Router = require('koa-router')()
const weChatApiController = require('../controller/weChatApiController');
const payController = require('../controller/payController');

const router = Router
    .get('/', weChatApiController.wxConfig)
    .get('/h5Pay', payController.wxPayConfig)
    .get('/jsPay', payController.wxJsApiPay)
module.exports = router
