<template>
  <guarantee :showFlowDialog="true" currentFlow="担保" :guaranteeId="guaranteeId"/>
</template>

<script>
import Guarantee from '@/components/house/guarantee'

export default {
  data () {
    return {
      guaranteeId: ''
    }
  },
  components: {
    Guarantee
  },
  created () {
    this.guaranteeId = this.$route.params.id
  }
}
</script>
