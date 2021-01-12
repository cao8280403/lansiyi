<template>
    <a-card :border="false">
        <a-form-model :model="model" layout="inline">
            <a-form-model-item label="库存类型">
                <a-select style="width: 180px;" placeholder="请选择库存类型">
                    <a-select-option value="1">护肤品</a-select-option>
                    <a-select-option value="2">中药面膜</a-select-option>
                    <a-select-option value="3">其他配料</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary">查询</a-button>
            </a-form-model-item>
            <a-form-model-item>
                <a-button icon="plus-circle" @click="addGoodsFor">添加</a-button>
            </a-form-model-item>
        </a-form-model>
        <a-table size="small" style="margin-top: 12px" :columns="columns" :data-source="data" :scroll="{ x: 1500 }"
            bordered>
            <span slot="price" slot-scope="price">
                {{price}}元
            </span>
            <span slot="action" slot-scope="text, record">
                <a @click="editGoodsFor(record)">编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                    title="确认删除？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="remove(record)">
                    <a>删除</a>
                </a-popconfirm>
            </span>
        </a-table>
        <a-modal :title="modelName" :visible="visible" @ok="ok" @cancel="visible = false" width="65%">
            <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="产品名称">
                            <a-input v-model="form.productName"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="库存总量">
                            <a-input v-model="form.inventoryTotal"></a-input>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="入库数量">
                            <a-input v-model="form.insertNum"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="产品规格">
                            <a-input v-model="form.productType"></a-input>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="最低库存">
                            <a-input v-model="form.min_inventory"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="产品类型">
                            <a-select v-model="form.type" style="width: 100%;" placeholder="请选择">
                                <a-select-option :value="1">护肤品</a-select-option>
                                <a-select-option :value="2">中药面膜</a-select-option>
                                <a-select-option :value="3">其他</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="单价">
                            <a-input v-model="form.price" prefix="￥" suffix="RMB" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item v-model="form.img" label="上传图片">
                            <a-upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                list-type="picture-card"
                            >
                            <a-icon type="plus" />
                                <div class="ant-upload-text">
                                    Upload
                                </div>
                            </a-upload>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-modal>
    </a-card>
</template>
<script>
    import {
        queryGoods,
        addGoods,
        editGoods,
        deleteGoods
    } from '@/services/Goods/GoodsApi'
    const columns = [{
            title: '产品编号',
            key: 'productId',
            dataIndex: 'productId'
        },
        {
            title: '产品名称',
            key: 'productName',
            dataIndex: 'productName'
        },
        {
            title: '是否低于最低库存',
            key: 'isDownMin',
            dataIndex: 'isDownMin',
            width: 140
        },
        {
            title: '库存率',
            key: 'inventory_Rate',
            dataIndex: 'inventoryRate'
        },
        {
            title: '库存数量',
            key: 'inventory_total',
            dataIndex: 'inventoryTotal'
        },
        {
            title: '最低库存',
            key: 'inventory_min',
            dataIndex: 'inventoryMin'
        },
        {
            title: '产品规格',
            key: 'product_type',
            dataIndex: 'productType'
        },
        {
            title: '上月库存数量',
            key: 'last_inventory_total',
            dataIndex: 'lastInventoryTotal'
        },
        {
            title: '入库数量',
            key: 'insertNum',
            dataIndex: 'insertNum'
        },
        {
            title: '单价',
            key: 'price',
            dataIndex: 'price',
            scopedSlots: { customRender: 'price' },
        },
        {
            title: '出库数量',
            key: 'removeNum',
            dataIndex: 'removeNum'
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            scopedSlots: {
                customRender: 'action'
            },
        }
    ]
    export default {
        name: 'warehouse',
        data() {
            return {
                labelCol: {
                    span: 8
                },
                wrapperCol: {
                    span: 14
                },
                model: {

                },
                modelName: '',
                columns: columns,
                data: [],
                visible: false,
                form: {
                    productId: '',
                    productName: '',
                    inventoryTotal: '',
                    insertNum: '',
                    productType: '',
                    min_inventory: '',
                    type: '',
                    price: '',
                    img: ''
                }
            }
        },
        mounted() {
            queryGoods().then(this.renderTable)
        },
        methods: {
            ok() {
                if(this.modelName == '新增商品') {
                     addGoods(this.form).then((res) => {
                        if(res.data.code == 200) {
                            this.$message.success(res.data.data)
                            queryGoods().then(this.renderTable)
                        }
                    })
                } else if(this.modelName == '编辑商品') {
                    editGoods(this.form).then((res) => {
                        if(res.data.code == 200) {
                            this.$message.success(res.data.data)
                            queryGoods().then(this.renderTable)
                        }
                    })
                }
               
                this.visible = false
            },
            // 添加商品
            addGoodsFor() {
                this.form = {
                    productId: '',
                    productName: '',
                    inventoryTotal: '',
                    insertNum: '',
                    productType: '',
                    min_inventory: '',
                    type: '',
                    price: '',
                    img: ''
                }
                this.visible = true
                this.modelName = '新增商品'
            },
            // 编辑商品
            editGoodsFor(item) {
                this.modelName = '编辑商品'
                this.form.productId = item.productId
                this.form.productName = item.productName
                this.form.inventoryTotal = item.inventoryTotal
                this.form.insertNum = item.insertNum
                this.form.productType = item.productType
                this.form.min_inventory = item.inventoryMin
                this.form.type = item.type
                this.form.price = item.price
                this.visible = true
            },
            // 删除商品
            remove(item) {
                debugger
                deleteGoods(item.productId).then(res => {
                    if(res.data.code == 200) {
                        this.$message.success(res.data.data)
                    }
                })
            },
            renderTable(res) {
                let _this = this
                if (res.data.code == 200) {
                    let data = res.data.data
                    let result = []
                    data.map((item, index) => {
                        let _temp = {
                            key: index,
                            productId: item.id,
                            productName: item.name,
                            isDownMin: item.residue_num < item.min_inventory ? '是' : '否',
                            inventoryRate: (item.residue_num / item.total_num),
                            inventoryTotal: item.total_num,
                            inventoryMin: item.min_inventory,
                            productType: item.productType,
                            type: item.type,
                            lastInventoryTotal: '暂无',
                            insertNum: item.addNumber,
                            price: item.price == null ? '0' : item.price,
                            removeNum: item.outNumber
                        }
                        result.push(_temp)
                    })
                    _this.data = result
                }
            }
        },
    }
</script>