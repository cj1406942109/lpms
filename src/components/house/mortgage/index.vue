<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper">
      <el-step title="步骤1" description="确定抵押状态"></el-step>
      <el-step title="步骤2" description="确定取证时间"></el-step>
      <el-step title="步骤3" description="确定返证时间"></el-step>
    </el-steps>
    <div class="form-wrapper">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form :model="mortgageInfoForm" ref="mortgageInfoForm" label-width="200px" v-if="mortgageInfoForm" key="mortgageInfoForm">
            <el-form-item label="银行支行">
              <el-input disabled v-model="mortgageInfoForm.loanBank"></el-input>
            </el-form-item>
            <el-form-item label="产权人">
              <el-input disabled v-model="mortgageInfoForm.borrowerName"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input disabled v-model="mortgageInfoForm.borrowerPhone"></el-input>
            </el-form-item>
            <el-form-item label="房屋所属区局">
              <el-input disabled v-model="mortgageInfoForm.houseManager"></el-input>
            </el-form-item>
            <el-form-item label="接单业务员">
              <el-input disabled v-model="mortgageInfoForm.clerkName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="form-wrapper" v-if="activeStep==0">
      <h3>确定抵押状态</h3>
      <el-form :model="mortgageStatusForm" ref="mortgageStatusForm" label-width="200px" :rules="mortgageStatusFormRules" key="mortgageStatusForm">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="mortgageStatusForm.time" value-format="timestamp" :disabled="finishMortgage"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmMortgageStatusHandler()" v-if="!finishMortgage">提交</el-button>
          <el-button type="info" disabled v-else>已确定抵押状态</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep==1">
      <h3>确定取证时间</h3>
      <el-form :model="takeEvidenceForm" ref="takeEvidenceForm" label-width="200px" :rules="takeEvidenceFormRules" key="takeEvidenceForm">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="takeEvidenceForm.time" value-format="timestamp" :disabled="finishTake"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="takeEvidenceHandler()" v-if="!finishTake">提交</el-button>
          <el-button type="info" disabled v-else>已确定取证时间</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep==2">
      <h3>确定返证时间</h3>
      <el-form :model="returnEvidenceForm" ref="returnEvidenceForm" label-width="200px" :rules="returnEvidenceFormRules" key="returnEvidenceForm">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="returnEvidenceForm.time" value-format="timestamp" :disabled="finishReturn"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="returnEvidenceHandler()" :loading="formLoading" v-if="!finishReturn">提交</el-button>
          <el-button type="info" disabled v-else>已确定返证时间</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="option">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="activeStep++" v-if="activeStep < 2" :disabled="nextStepStatus">下一步</el-button>
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
import {
  getMortgageById,
  confirmMortgageStatus,
  takeEvidence,
  returnEvidence
} from '@/api/house'

export default {
  data () {
    return {
      activeStep: 0,
      mortgageInfoForm: null,
      mortgageStatusForm: {
        time: null
      },
      takeEvidenceForm: {
        time: null
      },
      returnEvidenceForm: {
        time: null
      },
      mortgageStatusFormRules: {
        time: [{ required: true, message: '完成时间不能为空' }]
      },
      takeEvidenceFormRules: {
        time: [{ required: true, message: '取证时间不能为空' }]
      },
      returnEvidenceFormRules: {
        time: [{ required: true, message: '返证时间不能为空' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/house/mortgage',
      nextPath: '/house/guarantee',
      finishMortgage: false, // 确定抵押状态完成
      finishTake: false, // 确定取证时间完成
      finishReturn: false
    }
  },
  computed: {
    nextStepStatus: function () {
      if (this.activeStep === 0) {
        return !this.finishMortgage
      } else if (this.activeStep === 1) {
        return !this.finishTake
      }
    }
  },
  props: {
    mortgageId: '',
    showFlowDialog: {
      default: false
    },
    currentFlow: ''
  },
  created () {
    this.loanLastStatus = this.currentFlow
    getMortgageById(this.mortgageId).then(data => {
      if (data) {
        this.finishMortgage = data.mortgageState.done
        this.finishTake = data.takeEvidence.done
        this.finishReturn = data.returnEvidence.done
        this.mortgageInfoForm = JSON.parse(JSON.stringify(data.mortgageInfo))
        if (this.finishMortgage) {
          this.mortgageStatusForm.time = data.mortgageState.time
        }
        if (this.finishTake) {
          this.takeEvidenceForm.time = data.takeEvidence.time
        }
        if (this.finishReturn) {
          this.returnEvidenceForm.time = data.returnEvidence.time
        }
      }
    })
  },
  methods: {
    confirmMortgageStatusHandler () {
      this.$refs['mortgageStatusForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            confirmMortgageStatus(this.mortgageId, this.mortgageStatusForm.time).then(data => {
              if (data) {
                this.finishMortgage = true
                this.$message({
                  type: 'success',
                  message: '确定抵押状态成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '确定抵押状态失败'
                })
              }
            })
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    takeEvidenceHandler () {
      this.$refs['takeEvidenceForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            takeEvidence(this.mortgageId, this.takeEvidenceForm.time).then(data => {
              if (data) {
                this.finishTake = true
                this.$message({
                  type: 'success',
                  message: '确定取证时间成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '确定取证时间失败'
                })
              }
            })
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    returnEvidenceHandler () {
      this.$refs['returnEvidenceForm'].validate((valid) => {
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
              returnEvidence(this.mortgageId, this.returnEvidenceForm.time).then(data => {
                this.$message.closeAll()
                this.formLoading = false
                if (data) {
                  this.finishReturn = true
                  this.loanId = data.rootId
                  this.loanStatus = data.des
                  this.dialogVisible = true
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定抵押状态失败'
                  })
                }
              })
            } else {
              this.formLoading = true
              returnEvidence(this.mortgageId, this.returnEvidenceForm.time).then(data => {
                this.formLoading = false
                if (data) {
                  this.finishReturn = true
                  this.$message({
                    type: 'success',
                    message: '确定抵押状态成功'
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定抵押状态失败'
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
