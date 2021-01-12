/**
 * @Service
 */
const db = require('../tools/db')
// 查询所有
const findAllUser = async () => {
    let data = await db.Test.findAll();
    return data;
}

// 修改用户
const updateUser = async (params) => {
    // 查询
    const User = await db.Test.findOne({
        where: { id: Number(`${params.id}`)}
    })
    if(User == undefined || User == null) {
        throw new Error('未找到相关用户')
    }
    const update = await db.Test.update(
        params,
        {
            where: {id: Number(`${params.id}`)}
        }
    )
    return update
}
module.exports = {
    findAllUser,
    updateUser
}