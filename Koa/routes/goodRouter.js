const Router = require('koa-router')()
const goodController = require('../controller/goodController')

const router = Router
    .get('/', goodController.findAllGoods)
    .put('/addGoods', goodController.insertGoods)
    .post('/editGoods', goodController.updateGoods)
    .post('/cutBack', goodController.cutBack)
    .delete('/deleteGoods', goodController.deleteGoods)
module.exports = router