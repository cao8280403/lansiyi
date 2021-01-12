/**
 * @Service
 */
const db = require('../tools/db')
// 查询所有
const findAllGoods = async () => {
    let data = await db.T_goods.findAll({
        where: {
            status: 1
        }
    })
    return data
}

// 插入数据
const insertGoods = async (form) => {
    await db.T_goods.create({
        id: 0,
        name: form.name,
        residue_num: 0,
        status: 1,
        min_inventory: Number(form.min_inventory),
        total_num: Number(form.totalNum),
        addNumber: Number(form.addNumber),
        productType: form.productType,
        type: form.type
    })
    return '新增商品成功'
}

// 修改数据
const updateGoods = async (form) => {
    await db.T_goods.update(form, {
        where: {
            id: form.id
        }
    })
}

// 删除数据
const deleteGoods = async (id) => {
    await db.T_goods.update({ status: 0 }, {
        where: {
            id: id
        }
    })
}

// 减少库存
const cutBack = async (form) => {
    let item = eval(`(${form.form})`)
    for(i = 0; i < item.length; i++) {
        let data = await db.T_goods.findAll({
            attributes: ['total_num'],
            where: {
                id: item[i].id,
                status: 1
            }
        })
        let total = data[0].total_num
        await db.T_goods.update({ total_num: total - item[i].num}, {
            where: {
                status: 1,
                id: item[i].id
            }
        })
    }
}

module.exports = {
    findAllGoods,
    insertGoods,
    updateGoods,
    deleteGoods,
    cutBack
}