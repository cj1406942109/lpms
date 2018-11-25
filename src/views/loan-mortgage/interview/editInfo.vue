<template>
  <interview :showFlowDialog="true" currentFlow="面谈" :interviewId="interviewId"/>
</template>

<script>
import Interview from '@/components/mortgage/interview'

export default {
  data () {
    return {
      interviewId: ''
    }
  },
  components: {
    Interview
  },
  created () {
    this.interviewId = this.$route.params.id
  }
}
</script>
