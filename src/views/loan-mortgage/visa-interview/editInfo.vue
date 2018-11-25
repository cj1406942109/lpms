<template>
  <visa-interview :showFlowDialog="true" currentFlow="面签" :visaId="visaId"/>
</template>

<script>
import VisaInterview from '@/components/mortgage/visa-interview'

export default {
  data () {
    return {
      visaId: ''
    }
  },
  components: {
    VisaInterview
  },
  created () {
    this.visaId = this.$route.params.id
  }
}
</script>
