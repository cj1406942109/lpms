<template>
  <transfer :showFlowDialog="true" currentFlow="过户" :transferId="transferId"/>
</template>

<script>
import Transfer from '@/components/house/transfer'

export default {
  data () {
    return {
      transferId: ''
    }
  },
  components: {
    Transfer
  },
  created () {
    this.transferId = this.$route.params.id
  }
}
</script>
