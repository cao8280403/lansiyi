<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;">
      <a-alert
        :closable="true"
        message="确认转账后，资金将直接打入对方账户，无法退回。"
        style="margin-bottom: 24px;"
      />
      <a-form-item
        label="付款账户"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 17}"
        class="stepFormText"
      >
        ant-design@alipay.com
      </a-form-item>
      <a-form-item
        label="收款账户"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 17}"
        class="stepFormText"
      >
        test@example.com
      </a-form-item>
      <a-form-item
        label="收款人姓名"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 17}"
        class="stepFormText"
      >
        Alex
      </a-form-item>
      <a-form-item
        label="转账金额"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 17}"
        class="stepFormText"
      >
        ￥ {{momeny}}
      </a-form-item>
      <a-form-item :wrapperCol="{span: 17, offset: 7}">
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// import { cutBack } from '@/services/Goods/GoodsApi'
import { addOrder } from '@/services/Order/OrderApi'
export default {
  props: {
    momeny: Number
  },
  name: 'Step2',
  data () {
    return {
      loading: false
    }
  },
  mounted() {
  },
  methods: {
    nextStep () {
      // let _this = this
      // _this.loading = true
      // setTimeout(() => {
      //   _this.$emit('nextStep')
      // }, 1500)
      let getPayList = localStorage.getItem('setList')
      let arr = eval(`(${getPayList})`)
      console.log(arr)
      addOrder(JSON.stringify(arr), 1, this.momeny).then(res => {
          console.log(res.data)
        })
      // cutBack(JSON.stringify(arr)).then(
        
      // )
    },
    prevStep () {
      this.$emit('prevStep')
    }
  }
}
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;
    :global {
      .ant-form-item-label,
      .ant-form-item-control {
        line-height: 22px;
      }
    }
  }
</style>
