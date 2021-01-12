<template>
    <a-card>
        <a-form-model layout="horizontal">
            <div>
                <a-row>
                    <a-col :md="8" :sm="24">
                        <a-form-model-item
                            label="创建人"
                            :labelCol="{span: 5}"
                            :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8" :sm="24" >
                        <a-form-model-item
                            label="订单状态"
                            :labelCol="{span: 5}"
                            :wrapperCol="{span: 18, offset: 1}"
                        >
                            <a-select placeholder="请选择">
                                <a-select-option value="1">审批中</a-select-option>
                                <a-select-option value="2">等发货</a-select-option>
                                <a-select-option value="3">已发货</a-select-option>
                                <a-select-option value="4">已完成</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :md="8" :sm="24" >
                        <a-form-model-item
                            label="日期"
                            :labelCol="{span: 5}"
                            :wrapperCol="{span: 18, offset: 1}"
                        >
                            <a-date-picker style="width: 100%" placeholder="请选择日期" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </div>
             <span style="float: right; margin-top: 3px;">
                <a-button type="primary">查询</a-button>
                <a-button style="margin-left: 8px">重置</a-button>
            </span>
        </a-form-model>
        <a-table 
            style="margin-top: 15px"
            :bordered="false" 
            :loading="loading"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="pagination"
            :scroll="{ x: 1200 }">

        </a-table>
    </a-card>
</template>

<script>
const columns = [
    {
        key: 'id',
        dataIndex: 'id',
        title: 'Id'
    }, {
        key: 'createName',
        dataIndex: 'createName',
        title: '创建人'
    }, {
        key: 'approval',
        dataIndex: 'approval',
        title: '审核人'
    }, {
        key: 'createTime',
        dataIndex: 'createTime',
        title: '创建时间'
    }, {
        key: 'updateTime',
        dataIndex: 'updateTime',
        title: '更新时间'
    }, {
        key: 'status',
        dataIndex: 'status',
        title: '状态'
    }, {
        key: 'price',
        dataIndex: 'price',
        title: '价格'
    }, {
        key: 'goods',
        dataIndex: 'goods',
        title: '商品'
    }, {
        key: 'action',
        dataIndex: 'action',
        title: '操作',
    }
]
export default {
    name: 'Order',
    data() {
        return {
            loading: false,
            columns: columns,
            dataSource: [],
            pagination: {
                current: 1,
                pageSize: 20,
                total: 0
            }
        }
    },
    methods: {
    }
}
</script>