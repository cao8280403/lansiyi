const login = require('../service/loginService')

const goLogin = async (ctx, next) => {
    let res = ctx.request.body
    try {
        let data = await login.login(res)
        if(data) {
            return ctx.response.body = {
                code: 200,
                message: '欢迎回来',
                data: {
                    user: {
                        name: '@ADMIN',
                        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                        address: '@CITY',
                        position: '@POSITION'
                    },
                    token: 'Authorization:' + Math.random(),
                    expireAt: new Date(new Date().getTime() + 30 * 60 * 100000),
                    permissions: [{id: 'queryForm', operation: ['add', 'edit']}],
                    roles: [{id: 'admin', operation: ['add', 'edit', 'delete']}]
                }
            }
        } else {
            return ctx.response.body = {
                code: 500,
                message: 'ERROR',
                data: '用户名或者密码不正确'
            }
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
    goLogin
}