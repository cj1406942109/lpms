<template>
  <charge :showFlowDialog="true" currentFlow="收费" :chargeId="chargeId"/>
</template>

<script>
import Charge from '@/components/mortgage/charge'

export default {
  data () {
    return {
      chargeId: ''
    }
  },
  components: {
    Charge
  },
  created () {
    this.chargeId = this.$route.params.id
  }
}
</script>
