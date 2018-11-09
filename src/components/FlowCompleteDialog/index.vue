<template>
  <el-dialog :visible.sync="showDialog" width="30%" center :close-on-click-modal="false" :close-on-press-escape="false">
    <div slot="title"><i class="el-icon-success" style="color:#67C23A;font-size:22px;vertical-align:middle;margin-right:5px;"></i>面签成功</div>
    <div>贷款编号为：<a style="color:blue">{{loanId}}</a></div>
    <div>贷款状态为：<a style="color:blue">{{loanStatus}}</a></div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="changePath()">查看贷款状态</el-button>
      <el-button @click="changePath(listPath)" v-if="showReturnButton">返回面谈列表</el-button>
      <el-button type="primary" @click="changePath(nextPath)">办理下一业务</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'flow-complete-dialog',
  data () {
    return {
      showDialog: this.dialogVisible
    }
  },
  props: {
    loanId: '',
    loanStatus: '',
    dialogVisible: '',
    showReturnButton: {
      default: true
    },
    listPath: '',
    nextPath: ''
  },
  watch: {
    dialogVisible () {
      this.showDialog = this.dialogVisible
    }
  },
  methods: {
    changePath (path) {
      this.showDialog = false
      if (path) {
        this.$router.push({ path })
      } else {
        this.$router.push({ path: `/loan-management/order/status/${this.loanNum}` })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
