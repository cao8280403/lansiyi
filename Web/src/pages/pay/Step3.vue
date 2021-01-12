<template>
  <div style="max-width: 500px; margin: 40px auto 0; text-align: center">
    <result title="支付完成" :is-success="true" />
    <a-button type="primary" @click="doOnceAgin">再转一笔</a-button>
    <a-button style="margin-left: 8px">查看账单</a-button>
  </div>
</template>

<script>
import Result from '@/components/result/Result'
export default {
  name: 'Step3',
  components: {Result},
  methods: {
    doOnceAgin () {
      this.$emit('finish')
    }
  }
}
</script>

<style scoped>

</style>
