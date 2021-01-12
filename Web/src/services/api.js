//跨域代理前缀
const API_PROXY_PREFIX='/api'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/login`,
  ROUTES: `${BASE_URL}/routes`,
  /**
   * @desc 查询商品
   * @method POST、GET
   */
  GOODS: `${BASE_URL}/good`,
  /**
   * @desc 新增商品
   **/ 
  ADDGOODS: `${BASE_URL}/good/addGoods`,
  /**
   * @desc 编辑商品
   **/ 
  EDITGOODS: `${BASE_URL}/good/editGoods`,
  /**
   * @desc 修改库存
   **/ 
  CUTBACK: `${BASE_URL}/good/cutBack`,
  /**
   * @desc 删除商品
   **/ 
  DELETEGOODS: `${BASE_URL}/good/deleteGoods`,

  /**
   * @desc 生成订单
   */
  ADDORDER: `${BASE_URL}/order/addOrder`
}
