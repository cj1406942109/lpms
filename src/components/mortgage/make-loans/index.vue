<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>确定放款状态</h2>
      <el-form :model="loanForm" ref="loanForm" label-width="200px" :rules="loanFormRules">
        <el-form-item label="放款时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="loanForm.time" value-format="timestamp" :disabled="finishLoan"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="info" disabled v-if="finishLoan">已放款</el-button>
          <el-button type="primary" :loading="formLoading" @click="confirmLoan" v-else>提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <flow-complete-dialog
      :loanId="loanId"
      :loanStatus="loanStatus"
      :loanLastStatus="loanLastStatus"
      :dialogVisible="dialogVisible"
      :showNextButton="false"
      :listPath="listPath"
      :nextPath="nextPath"
    ></flow-complete-dialog>
  </div>
</template>

<script>
import { confirmLoan, getLoanById } from '@/api/mortgage'
export default {
  data () {
    return {
      loanForm: {
        time: null
      },
      loanFormRules: {
        time: [{ required: true, message: '放款时间不能为空' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      finishLoan: false,
      dialogVisible: false,
      listPath: '/loan-mortgage/make-loans',
      nextPath: ''
    }
  },
  props: {
    makeLoanId: '',
    showFlowDialog: {
      default: false
    },
    currentFlow: ''
  },
  created () {
    this.loanLastStatus = this.currentFlow
    getLoanById(this.makeLoanId).then(({ data }) => {
      if (data) {
        this.finishLoan = data.done
        if (this.finishLoan) {
          this.loanForm.time = data.time
        }
      } else {
        this.$message({
          type: 'error',
          message: '获取放款信息失败'
        })
      }
    })
  },
  methods: {
    confirmLoan () {
      this.$refs['loanForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.showFlowDialog) {
              this.formLoading = true
              this.$message({
                type: 'info',
                message: '正在处理...'
              })
              confirmLoan(this.makeLoanId, this.loanForm.time).then(({ data }) => {
                this.$message.closeAll()
                this.formLoading = false
                if (data) {
                  this.finishLoan = true
                  this.loanId = data.rootId
                  this.loanStatus = data.des
                  this.dialogVisible = true
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定放款状态失败'
                  })
                }
              })
            } else {
              this.formLoading = true
              confirmLoan(this.makeLoanId, this.loanForm.time).then(({ data }) => {
                this.formLoading = false
                if (data) {
                  this.finishLoan = true
                  this.$message({
                    type: 'success',
                    message: '确定放款状态成功'
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定放款状态失败'
                  })
                }
              })
            }
          }).catch(() => {})
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .form-wrapper {
      padding: 20px;
      margin-bottom: 20px;
      background-color: #fff;
    }
    .option {
      text-align: center;
      margin: 50px;
      button {
        width: 200px;
      }
    }
  }
</style>
