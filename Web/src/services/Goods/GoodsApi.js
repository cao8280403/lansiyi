import { 
    GOODS, 
    ADDGOODS, 
    EDITGOODS, 
    DELETEGOODS,
    CUTBACK } from '@/services/api'
import { request, METHOD } from '@/utils/request'

/**
 * @desc 新增商品
 */
export async function addGoods(form) {
    return request(ADDGOODS, METHOD.PUT, {
        name: form.productName,
        totalNum: form.inventoryTotal,
        residue_num: form.inventoryTotal,
        addNumber: form.insertNum,
        productType: form.productType,
        min_inventory: form.min_inventory,
        type: form.type,
        price: form.price,
        img: form.img
    })
}

/**
 * @desc 编辑商品
 */
export async function editGoods(form) {
    return request(EDITGOODS, METHOD.POST, {
        id: form.productId,
        name: form.productName,
        totalNum: form.inventoryTotal,
        addNumber: form.insertNum,
        productType: form.productType,
        min_inventory: form.min_inventory,
        type: form.type,
        price: form.price,
        img: form.img
    })
}

/**
 * @desc 减少库存
 */
export async function cutBack(form) {
    return request(CUTBACK, METHOD.POST, {
     form: form
    })
}

/**
 * @desc 删除商品
 */
export async function deleteGoods(id) {
    return request(DELETEGOODS, METHOD.DELETE, {
        id: id
    })
}

/**
 * @desc 查询商品
 */
export async function queryGoods() {
    return request(GOODS, METHOD.GET, {})
}