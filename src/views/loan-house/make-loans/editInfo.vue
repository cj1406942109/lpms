<template>
  <make-loans :showFlowDialog="true" currentFlow="放款" :makeLoanId="makeLoanId"/>
</template>

<script>
import MakeLoans from '@/components/house/make-loans'

export default {
  data () {
    return {
      makeLoanId: ''
    }
  },
  components: {
    MakeLoans
  },
  created () {
    this.makeLoanId = this.$route.params.id
  }
}
</script>
