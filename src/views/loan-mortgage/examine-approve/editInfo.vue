<template>
  <examine-approve :showFlowDialog="true" currentFlow="审批" :approveId="approveId"/>
</template>

<script>
import ExamineApprove from '@/components/mortgage/examine-approve'

export default {
  data () {
    return {
      approveId: ''
    }
  },
  components: {
    ExamineApprove
  },
  created () {
    this.approveId = this.$route.params.id
  }
}
</script>
