const Router = require('koa-router')()
const orderController = require('../controller/orderController')

const router = Router
    .put('/addOrder', orderController.insertOrder)
module.exports = router