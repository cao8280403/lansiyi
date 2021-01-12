/**
 * @Service
 */
const db = require('../tools/db')

const insertOrder = async (form, id, momeny) => {
    let item = eval(`(${form})`)
    console.log(item, id, momeny)
    let timestamp = Math.round(new Date() / 1000)
    let randomSix = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
    let orderId = `${timestamp}` + `${randomSix}`
    let goodIds = ''
    let goodNums = ''
    for(let i = 0; i < item.length; i++) {
        goodIds += `${item[i].id},`
        goodNums += `${item[i].num},`
    }
    if(goodIds.length > 0 && goodNums.length > 0) {
        goodIds = goodIds.substr(0,goodIds.length - 1);
        goodNums = goodNums.substr(0,goodNums.length - 1);
    }
    console.log(orderId)
    console.log(id)
    console.log(timestamp)
    console.log(momeny)
    console.log(goodIds)
    console.log(goodNums)
    await db.T_order.create({
        id: 0,
        orderId: `${orderId}`,
        create_user_id: id,
        create_date: timestamp,
        update_date: timestamp,
        status: 2,
        price: momeny,
        good_id: goodIds,
        good_num: goodNums
    })
    return '订单生成成功'
}

module.exports = {
    insertOrder,
}