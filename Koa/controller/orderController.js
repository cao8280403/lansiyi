const order = require('../service/orderService')
const insertOrder = async (ctx, next) => {
    let params = ctx.request.body
    let data = await order.insertOrder(params.params, params.id, params.momeny)
    return ctx.response.body = {
        code: 200,
        message: 'SUCCESS',
        data: data
    }
  
}

module.exports = {
    insertOrder
}