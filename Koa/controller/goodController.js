const good = require('../service/goodService')
const findAllGoods = async (ctx, next) => {
    try {
        let data = await good.findAllGoods()
        return ctx.response.body = {
            code: 200,
            message: 'SUCCESS',
            data: data
        }
    } catch (error) {
        return ctx.response.body = {
            code: 500,
            message: 'FAIL',
            data: error
        }
    }
}

const insertGoods = async (ctx, next) => {
    let res = ctx.request.body
    let data = await good.insertGoods(res)
    return ctx.response.body = {
        code: 200,
        message: 'SUCCESS',
        data: data
    }
    
}

const updateGoods = async (ctx, next) => {
    let res = ctx.request.body
    try {
        await good.updateGoods(res)
        return ctx.response.body = {
            code: 200,
            message: 'SUCCESS',
            data: '编辑成功'
        }
    } catch (error) {
        return ctx.response.body = {
            code: 500,
            message: 'FAIL',
            data: error
        }
    }
}

const deleteGoods = async (ctx, next) => {
    let id = ctx.request.body
    try {
        await good.deleteGoods(id)
        return ctx.response.body = {
            code: 200,
            message: 'SUCCESS',
            data: '删除成功'
        }
    } catch (error) {
        return ctx.response.body = {
            code: 500,
            message: 'FAIL',
            data: error
        }
    }
}

const cutBack = async (ctx, next) => {
    let form = ctx.request.body
    try {
        await good.cutBack(form)
        return ctx.response.body = {
            code: 200,
            message: 'SUCCESS',
            data: '库存修改成功'
        }
    } catch (error) {
        return ctx.response.body = {
            code: 500,
            message: 'FAIL',
            data: error
        }
    }
}

module.exports = {
    findAllGoods,
    insertGoods,
    updateGoods,
    deleteGoods,
    cutBack
}