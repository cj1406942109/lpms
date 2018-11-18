<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>确定收费状态</h2>
      <el-form :model="chargeForm" ref="chargeForm" label-width="200px" :rules="chargeFormRules">
        <el-form-item label="收费时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="chargeForm.time" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="formLoading" @click="confirmCharge">提交</el-button>
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
import { confirmCharge } from '@/api/mortgage'
export default {
  data () {
    return {
      chargeForm: {
        time: null
      },
      chargeFormRules: {
        time: [{ required: true, message: '收费时间不能为空' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/loan-mortgage/charge',
      nextPath: '/loan-mortgage/make-loans'
    }
  },
  created () {
    this.loanLastStatus = this.$route.params.des
  },
  methods: {
    confirmCharge () {
      this.$refs['chargeForm'].validate((valid) => {
        if (valid) {
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
            confirmCharge(this.$route.params.id, this.chargeForm.time).then(data => {
              this.$message.closeAll()
              this.formLoading = false
              if (data) {
                this.loanId = data.rootId
                this.loanStatus = data.des
                this.dialogVisible = true
              } else {
                this.$message({
                  type: 'error',
                  message: '确定收费状态失败'
                })
              }
            })
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
