/**
 * @Controller
 */
const user = require('../service/userService')
// 查询
const findAllUser = async (ctx, next) => {
    try {
        let data = await user.findAllUser()
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

// 修改
const updateUser = async (ctx, netx) => {
    try {
        let params = ctx.request.body
        let data = await user.updateUser(params)
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
module.exports = {
    findAllUser,
    updateUser
}