<template>
    <a-card :bordered="false">
        <a-steps class="steps" :current="current">
            <a-step title="请填写转账信息" />
            <a-step title="确认转账信息" />
            <a-step title="完成" />
        </a-steps>
        <div class="content">
            <step1 v-if="current === 0" :momeny="momeny" @nextStep="nextStep"></step1>
            <step2 v-if="current === 1" :momeny="momeny" @nextStep="nextStep" @prevStep="prevStep"></step2>
            <step3 v-if="current === 2" @prevStep="prevStep" @finish="finish"></step3>
        </div>
    </a-card>
</template>
<script>
// import { addOrder } from '@/service/Order/OrderApi'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default {
    name: 'Pay',
    components: {Step1, Step2, Step3},
    data() {
        return {
            current: 0,
            momeny: 0
        }
    },
    mounted() {
        this.momeny = Number(this.$route.query.total)
    },
     methods: {
        nextStep () {
            if (this.current < 2) {
                this.current += 1
            }
        },
        prevStep () {
            if (this.current > 0) {
                this.current -= 1
            }
        },
        finish () {
            this.current = 0
            // let form = sessionStorage.getItem('setList')
            // addOrder(form, this.momeny).then((res => {
            //     console.log(res)
            // }))
        }
    }
}
</script>
<style lang="less" scoped>
  .steps{
    max-width: 950px;
    margin: 16px auto;
  }
</style>
