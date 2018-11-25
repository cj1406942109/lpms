<template>
  <mortgage :showFlowDialog="true" currentFlow="抵押" :mortgageId="mortgageId"/>
</template>

<script>
import Mortgage from '@/components/house/mortgage'

export default {
  data () {
    return {
      mortgageId: ''
    }
  },
  components: {
    Mortgage
  },
  created () {
    this.mortgageId = this.$route.params.id
  }
}
</script>
