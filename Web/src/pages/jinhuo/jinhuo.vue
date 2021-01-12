<template>
    <div class="jinhuo">
        <a-row style="margin: 0 -12px">
            <a-col style="padding: 0 12px" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <a-card :style="{ width: cardWidth }" size="small" style="margin-bottom: 24px;" :bordered="false" title="商品" :body-style="{padding: 0}">
                    <a-dropdown slot="extra">
                        <a class="ant-dropdown-link">{{filterName}}</a>
                        <a-menu slot="overlay" @click="choose">
                            <a-menu-item key="全部商品">
                                <a>全部商品</a>
                            </a-menu-item>
                            <a-menu-item key="护肤品">
                                <a>护肤品</a>
                            </a-menu-item>
                            <a-menu-item key="药材">
                                <a>药材</a>
                            </a-menu-item>
                            <a-menu-item key="其他">
                                <a>其他</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    <div v-for="(item, index) in showCard" :key="index">
                        <a-card-grid style="width:20%">
                            <a-card :bordered="false" :body-style="{padding: 0}">
                                <img style="width: 100%; height: 200px; padding-bottom: 12px;" slot="cover"
                                    alt="example"
                                    :src="item.img" />
                                <a-card-meta :description="item.desc">
                                    <div slot="title" class="card-title">
                                        <span>{{item.name}}</span>
                                        <div style="float:right; color: #e4393c">
                                            <em>￥</em><i>{{item.price}}</i>
                                        </div>
                                    </div>
                                </a-card-meta>
                                <div class="project-item">
                                    <a class="group">操作</a>
                                    <a-button size="small" type="primary" shape="circle" icon="plus"
                                        @click="addList(item)" />
                                </div>
                            </a-card>
                        </a-card-grid>
                    </div>
                </a-card>
            </a-col>
        </a-row>
        <!-- 抽屉统计栏 -->
        <a-drawer title="已选" placement="right" :closable="true" :visible="visible" :mask="false" :width="400"
            @close="onClose">
            <a-form-model :model="form">
                <a-form-model-item v-for="(item, index) in drawerList" :key="index">
                    <a-row :gutter="22">
                            <a-col :span="8">
                                <img 
                                    style="width: 100%; height: 140px; padding-bottom: 12px;"   
                                    :src="item.img" />
                            </a-col>
                            <a-col :span="16">
                                <a-card-meta :description="item.desc">
                                    <div slot="title" class="card-title">
                                        <span v-text="item.name"></span>
                                        <div style="float:right; color: #e4393c">
                                            <em>￥</em><i>{{item.price}}</i>
                                        </div>
                                    </div>
                                </a-card-meta>
                                <div class="project-item">
                                    <span style="font-size: 14px;">数量</span>
                                    <a-input-number v-model="item.num" :min="1" :max="10" @change="onChange" />
                                    <a-button type="link" @click="remove(item.id)">取消</a-button>
                                </div>
                            </a-col>
                            <a-divider />
                    </a-row>
                </a-form-model-item>
            </a-form-model>
            <div :style="{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                    zIndex: 1}">
                 
                <a-button :style="{ marginRight: '8px' }" @click="onClose">
                    取消
                </a-button>
                <a-button type="primary" @click="onSubmit">
                    确认
                </a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>
    import {
        queryGoods,
    } from '@/services/Goods/GoodsApi'
    export default {
        data() {
            return {
                cardWidth: '100%',
                visible: false,
                cardList: [],
                drawerList: [],
                form: {},
                showCard: [],
                filterName: '全部商品'
            }
        },
        mounted() {
            queryGoods().then(this.renderCard)
        },
        methods: {
            renderCard(res) {
                if(res.data.code == 200) {
                    let _this = this
                    let data = res.data.data
                    let result = []
                    data.map((item) => {
                        let _temp = {
                            id: item.id,
                            img: item.type == 1 ? '//img11.360buyimg.com/n1/jfs/t1/156042/1/4112/117901/5ff29131E3ccfeeeb/18aac7aeb502d60c.jpg' 
                            : item.type == 2 ? '//img13.360buyimg.com/n1/jfs/t1/135227/6/16206/167933/5fb27265E64795246/9136030e1fd4095f.jpg' 
                            : '//img13.360buyimg.com/pop/s1180x940_jfs/t1/125196/4/14909/58224/5f8737ffE1496e367/1a0016a0a76c538e.jpg.webp',
                            name: item.name,
                            desc: item.type == 1 ? '护肤品' : item.type == 2 ? '药材' : '其他',
                            price: item.price
                        }
                        result.push(_temp)
                    })
                    _this.cardList = result
                    _this.showCard = _this.cardList
                } else {
                    this.$message.error(res.data.data)
                }
            },
            onClose() {
                this.cardWidth = '100%'
                this.visible = false
            },
            onSubmit() {
                this.visible = false
                let allMoney = 0
                for(let i = 0; i < this.drawerList.length; i++) {
                    console.log(Number(this.drawerList[i].num) , Number(this.drawerList[i].price))
                    allMoney = Number(this.drawerList[i].num) * Number(this.drawerList[i].price) + allMoney
                }
                localStorage.setItem('setList', JSON.stringify(this.drawerList))
                this.$router.push({ path: '/pay/pay', query: { total: allMoney }});
                allMoney = 0
            },
            addList(item) {
                this.visible = true
                this.cardWidth = '78%'
                let isRepeat = false
                this.drawerList.forEach((e) => {
                    if(e.id == item.id) {
                        isRepeat = true
                    }
                });
                if(!isRepeat) {
                    let _temp = {
                        id: item.id,
                        img: item.img,
                        name: item.name,
                        desc: item.desc,
                        price: item.price,
                        num: 1
                    }
                    this.drawerList.push(_temp)
                } else {
                    this.$message.error('请不要重复添加')
                }
            },
            choose(e) {
                if(e.key == '护肤品') {
                    this.filterName = '护肤品'
                    let result = this.cardList.filter(item => { 
                        if(item.desc == '护肤品') {
                            return item
                        }
                    })
                    this.showCard = result
                } else if(e.key == '药材') {
                    this.filterName = '药材'
                    let result = this.cardList.filter(item => { 
                        if(item.desc == '药材') {
                            return item
                        }
                    })
                    this.showCard = result
                } else if(e.key == '其他') {
                    this.filterName = '其他'
                    let result = this.cardList.filter(item => { 
                        if(item.desc == '其他') {
                            return item
                        }
                    })
                    this.showCard = result
                } else if(e.key == '全部商品'){
                    this.filterName = '全部商品'
                    queryGoods().then(this.renderCard)
                }
            },
            onChange(value) {
                console.log('changed', value);
            },
            remove(e) {
                this.drawerList = this.drawerList.filter((val) => {
                    return val.id !== e
                })
            }
        }
    }
</script>
<style lang="less">
    .card-title {
        span {
            vertical-align: middle;

            &:last-child {
                margin-left: 0px;
            }
        }
    }

    .project-item {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        overflow: hidden;
        font-size: 12px;
        color: inherit;

        .group {
            color: @text-color;
            flex: 1 1 0;

            &:hover {
                color: @primary-color;
            }
        }

        .datetime {
            color: @text-color-second;
            flex: 0 0 auto;
        }
    }

    .ant-card-meta-description {
        height: 44px;
        line-height: 22px;
        overflow: hidden;
    }

    .item-group {
        padding: 20px 0 8px 24px;
        font-size: 0;

        a {
            color: inherit;
            display: inline-block;
            font-size: 14px;
            margin-bottom: 13px;
            width: 25%;
        }
    }

    .members {
        a {
            display: block;
            margin: 12px 0;
            color: @text-color;

            &:hover {
                color: @primary-color;
            }

            .member {
                vertical-align: middle;
                margin-left: 12px;
            }
        }
    }
</style>