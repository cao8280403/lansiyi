/**
 * @Service
 */
const db = require('../tools/db')
// 登录
const login = async (params) => {
    let dataBaseUser = await db.T_user.findAll({
        where: {
            name: params.name
        }
    })
    if(dataBaseUser) {
        dataBaseUser.password === params.password
        return true
    } else {
        return false
    }
}

module.exports = {
    login,
}