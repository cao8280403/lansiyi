import { ADDORDER } from '@/services/api'
import { request, METHOD } from '@/utils/request'

/**
 * @desc 新增商品
 */
export async function addOrder(res, id, momeny) {
    return request(ADDORDER, METHOD.PUT, {
        params: res,
        id: id,
        momeny: momeny
    })
}