<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>确定收费状态</h2>
      <el-form :model="chargeForm" ref="chargeForm" label-width="200px" :rules="chargeFormRules">
        <!-- <el-form-item label="收费时间" prop="time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="chargeForm.time"
            value-format="timestamp"
            :disabled="finishCharge"
          ></el-date-picker>
        </el-form-item> -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="回款时间" prop="time">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="chargeForm.time"
                value-format="timestamp"
                :disabled="finishCharge"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="回款类型">
              <el-input :disabled="finishCharge"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="回款金额">
              <el-input :disabled="finishCharge">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="转账银行">
              <el-input :disabled="finishCharge"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="转账人">
              <el-input :disabled="finishCharge"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="info" disabled v-if="finishCharge">已收费</el-button>
          <el-button type="primary" :loading="formLoading" @click="confirmCharge" v-else>提交</el-button>
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
import { confirmCharge, getChargeById } from '@/api/mortgage'
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
      finishCharge: false,
      dialogVisible: false,
      listPath: '/loan-mortgage/charge',
      nextPath: '/loan-mortgage/make-loans'
    }
  },
  props: {
    chargeId: '',
    showFlowDialog: {
      default: false
    },
    currentFlow: ''
  },
  created () {
    this.loanLastStatus = this.currentFlow
    getChargeById(this.chargeId).then(data => {
      if (data) {
        this.finishCharge = data.done
        if (this.finishCharge) {
          this.chargeForm.time = data.time
        }
      } else {
        this.$message({
          type: 'error',
          message: '获取收费信息失败'
        })
      }
    })
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
            if (this.showFlowDialog) {
              this.formLoading = true
              this.$message({
                type: 'info',
                message: '正在处理...'
              })
              confirmCharge(this.chargeId, this.chargeForm.time).then(data => {
                this.$message.closeAll()
                this.formLoading = false
                if (data) {
                  this.finishCharge = true
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
            } else {
              this.formLoading = true
              confirmCharge(this.chargeId, this.chargeForm.time).then(data => {
                this.formLoading = false
                if (data) {
                  this.finishCharge = true
                  this.$message({
                    type: 'success',
                    message: '确定收费状态成功'
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定收费状态失败'
                  })
                }
              })
            }
          }).catch(() => { })
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
