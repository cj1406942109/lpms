<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>确定放款状态</h2>
      <el-form :model="loanForm" ref="loanForm" label-width="200px" :rules="loanFormRules">
        <el-form-item label="放款时间" prop="loanTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="loanForm.loanTime" value-format="timestamp" :disabled="finishLoan"></el-date-picker>
        </el-form-item>
        <el-form-item label="证回公司时间" prop="backTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="loanForm.backTime" value-format="timestamp" :disabled="finishLoan"></el-date-picker>
        </el-form-item>
        <el-form-item label="领证人姓名" prop="name">
          <el-input clearable style="max-width:300px;" v-model="loanForm.name" :disabled="finishLoan"></el-input>
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
      :listPath="listPath"
      :nextPath="nextPath"
    ></flow-complete-dialog>
  </div>
</template>

<script>
import { confirmLoan, getLoanById } from '@/api/house'
export default {
  data () {
    return {
      loanForm: {
        loanTime: null,
        backTime: null,
        name: null
      },
      loanFormRules: {
        loanTime: [{ required: true, message: '放款时间不能为空' }],
        backTime: [{ required: true, message: '证回公司时间不能为空' }],
        name: [{ required: true, message: '领证人姓名不能为空' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      finishLoan: false,
      dialogVisible: false,
      listPath: '/house/make-loans',
      nextPath: '/house/charge'
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
    getLoanById(this.makeLoanId).then(data => {
      if (data) {
        this.finishLoan = data.loanState.done
        if (this.finishLoan) {
          this.loanForm = JSON.parse(JSON.stringify(data.loan))
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
          if (this.showFlowDialog) {
            this.$confirm('请确认信息填写无误，是否提交？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.formLoading = true
              this.$message({
                type: 'info',
                message: '正在处理...'
              })
              confirmLoan(this.makeLoanId, this.loanForm).then(data => {
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
            }).catch(() => {})
          } else {
            this.formLoading = true
            confirmLoan(this.makeLoanId, this.loanForm).then(data => {
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
