<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper">
      <el-step title="步骤1" description="确定过户状态"></el-step>
      <el-step title="步骤2" description="确定回证时间"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep=='0'">
      <h3>确定过户状态</h3>
      <el-form :model="transferForm" ref="transferForm" label-width="200px" :rules="transferFormRules" key="transferForm">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="transferForm.time" value-format="timestamp" :disabled="finishTransfer"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmTransferHandler()" v-if="!finishTransfer">提交</el-button>
          <el-button type="info" disabled v-else>已确定过户状态</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep=='1'">
      <h3>确定回证时间</h3>
      <el-form :model="receiptForm" ref="receiptForm" label-width="200px" :rules="receiptFormRules" key="receiptForm">
        <el-form-item label="回证时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="receiptForm.time" value-format="timestamp" :disabled="finishReceipt"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmReceiptHandler()" v-if="!finishReceipt">提交</el-button>
          <el-button type="info" disabled v-else>已确定回证时间</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="option">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="activeStep++" :disabled="!finishTransfer" v-if="activeStep < 1">下一步</el-button>
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
// import moment from 'moment'
import {
  getTransferById,
  confirmTransfer,
  confirmReceipt
} from '@/api/house'

export default {
  data () {
    return {
      transferForm: {
        time: null
      },
      receiptForm: {
        time: null
      },
      transferFormRules: {
        time: [{ required: true, message: '完成时间不能为空' }]
      },
      receiptFormRules: {
        time: [{ required: true, message: '回证时间不能为空' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/house/transfer',
      nextPath: '/house/mortgage',
      activeStep: 0,
      finishTransfer: false, // 过户完成
      finishReceipt: false
    }
  },
  props: {
    transferId: '',
    showFlowDialog: {
      default: false
    },
    currentFlow: ''
  },
  created () {
    this.loanLastStatus = this.currentFlow
    getTransferById(this.transferId).then(({ data }) => {
      if (data) {
        this.finishTransfer = data.transferState.done
        this.finishReceipt = data.receiptState.done
        if (this.finishTransfer) {
          this.transferForm.time = data.transferState.time
        }
        if (this.finishReceipt) {
          this.receiptForm.time = data.receiptState.time
        }
      } else {
        this.$message({
          type: 'error',
          message: '获取过户流程数据失败'
        })
      }
    })
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    confirmTransferHandler () {
      this.$refs['transferForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            confirmTransfer(this.transferId, this.transferForm.time).then(({ data }) => {
              if (data) {
                this.finishTransfer = true
                this.$message({
                  type: 'success',
                  message: '确定过户状态成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '确定过户状态失败'
                })
              }
            })
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    confirmReceiptHandler () {
      this.$refs['receiptForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.showFlowDialog) {
              this.$message({
                type: 'info',
                message: '正在处理...'
              })
              this.formLoading = true
              confirmReceipt(this.transferId, this.receiptForm.time).then(({ data }) => {
                this.$message.closeAll()
                this.formLoading = false
                if (data) {
                  this.finishReceipt = true
                  this.loanId = data.rootId
                  this.loanStatus = data.des
                  this.dialogVisible = true
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定回证时间失败'
                  })
                }
              })
            } else {
              this.formLoading = true
              confirmReceipt(this.transferId, this.receiptForm.time).then(({ data }) => {
                this.formLoading = false
                if (data) {
                  this.finishReceipt = true
                  this.$message({
                    type: 'success',
                    message: '确定回证时间成功'
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定回证时间失败'
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
      h2 {
        margin: 0;
      }
      h3 {
        padding-left: 200px;
        color: #303133;
      }
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