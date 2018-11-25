<template>
  <integrate-input :showFlowDialog="true" currentFlow="整件输机" :inputId="inputId"/>
</template>

<script>
import IntegrateInput from '@/components/house/integrate-input'

export default {
  data () {
    return {
      inputId: ''
    }
  },
  components: {
    IntegrateInput
  },
  created () {
    this.inputId = this.$route.params.id
  }
}
</script>
