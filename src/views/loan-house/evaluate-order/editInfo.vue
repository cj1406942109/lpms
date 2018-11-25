<template>
  <evaluate-order :showFlowDialog="true" currentFlow="评估下单" :orderId="orderId"/>
</template>

<script>
import EvaluateOrder from '@/components/house/evaluate-order'

export default {
  data () {
    return {
      orderId: ''
    }
  },
  components: {
    EvaluateOrder
  },
  created () {
    this.orderId = this.$route.params.id
  }
}
</script>
