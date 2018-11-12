<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" v-if="mortgageStatusForm.isNeedGuarantee" class="form-wrapper">
      <el-step title="步骤1" description="确定抵押状态"></el-step>
      <el-step title="步骤2" description="担保流程"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep==0">
      <h3>确定抵押状态</h3>
      <el-form :model="mortgageStatusForm" ref="mortgageStatusForm" label-width="200px" :rules="mortgageStatusFormRules">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="mortgageStatusForm.time" value-format="timestamp" :disabled="finishCurrent"></el-date-picker>
        </el-form-item>
        <el-form-item label="是否出担保函" prop="isNeedGuarantee">
          <el-radio-group v-model="mortgageStatusForm.isNeedGuarantee" :disabled="finishCurrent">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmMortgageStatus()" :disabled="finishCurrent">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep==1">
      <el-row>
        <el-col>
          <h3>担保函审批</h3>
          <el-form :model="guaranteeApproveForm" ref="guaranteeApproveForm" label-width="200px" :rules="guaranteeApproveFormRules">
            <el-form-item label="审批结果" prop="approvePass">
              <el-select v-model="guaranteeApproveForm.approvePass" placeholder="请选择">
                <el-option label="通过" :value="1"></el-option>
                <el-option label="拒绝" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审批通过时间" v-if="guaranteeApproveForm.approvePass == '1'">
              <el-date-picker type="date" placeholder="选择日期" v-model="guaranteeApproveForm.approvePassTime" value-format="timestamp"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="guaranteeApproveHandler()">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="form-wrapper" v-if="activeStep==1">
      <h3>出担保函</h3>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form :model="guaranteePublishForm" ref="guaranteePublishForm" label-width="200px" :rules="guaranteePublishFormRules">
            <el-form-item label="审批结果" prop="approveResult">
              <el-input clearable v-model="guaranteePublishForm.approveResult"></el-input>
            </el-form-item>
            <el-form-item label="审批通过时间" prop="approvePassTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="guaranteePublishForm.approvePassTime" value-format="timestamp"></el-date-picker>
            </el-form-item>
            <el-form-item label="出担保函时间" prop="guaranteePublishTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="guaranteePublishForm.guaranteePublishTime" value-format="timestamp"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="guaranteePublishHandler()">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="option" v-if="mortgageStatusForm.isNeedGuarantee">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="activeStep++" v-if="activeStep < 1" :disabled="!finishCurrent">下一步</el-button>
      <el-button type="success" @click="finishMortgageHandler()" v-if="activeStep == 1">完成抵押</el-button>
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
import { mapGetters } from 'vuex'
import { getMortgageById, confirmMortgageStatus, guaranteeApprove, guaranteePublish, skipMortgage } from '@/api/mortgage'
export default {
  name: 'sign-contract',
  data () {
    return {
      activeStep: 0,
      finishCurrent: false,
      mortgageStatusForm: {
        time: null,
        isNeedGuarantee: null
      },
      guaranteeApproveForm: {
        approvePass: null,
        approvePassTime: new Date().getTime()
      },
      guaranteePublishForm: {
        approveResult: null,
        approvePassTime: null,
        guaranteePublishTime: new Date().getTime()
      },
      mortgageStatusFormRules: {
        time: [{ required: true, message: '完成时间不能为空' }],
        isNeedGuarantee: [{ required: true, message: '请选择是否出担保函' }]
      },
      guaranteeApproveFormRules: {
        approvePass: [{ required: true, message: '请选择审批结果' }],
        approvePassTime: [{ required: true, message: '请选择审批通过时间' }]
      },
      guaranteePublishFormRules: {
        approveResult: [{ required: true, message: '审批结果不能为空' }],
        approvePassTime: [{ required: true, message: '请选择审批通过时间' }],
        guaranteePublishTime: [{ required: true, message: '请选择出担保函时间' }]
      },
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/loan-mortgage/mortgage',
      nextPath: '/loan-mortgage/charge'
    }
  },
  computed: {
    ...mapGetters([
      'permission'
    ])
  },
  created () {
    this.loanLastStatus = this.$route.params.des
    getMortgageById(this.$route.params.id).then(data => {
      if (data) {
        this.mortgageStatusForm.time = data.mortgageState.time ? data.mortgageState.time : null
        this.mortgageStatusForm.isNeedGuarantee = data.mortgageState.isNeedGuarantee ? data.mortgageState.isNeedGuarantee : null
        this.finishCurrent = Boolean(data.mortgageState.time)
        this.guaranteeApproveForm.approvePass = data.guaranteeApprove.approvePass ? parseInt(data.guaranteeApprove.approvePass) : null
        this.guaranteeApproveForm.approvePassTime = data.guaranteeApprove.approvePassTime ? data.guaranteeApprove.approvePassTime : new Date().getTime()
        this.guaranteePublishForm.approveResult = data.guaranteePublish.approveResult ? data.guaranteePublish.approveResult : null
        this.guaranteePublishForm.approvePassTime = data.guaranteePublish.approvePassTime ? data.guaranteePublish.approvePassTime : null
        this.guaranteePublishForm.guaranteePublishTime = data.guaranteePublish.approvePassTime ? data.guaranteePublish.guaranteePublishTime : new Date().getTime()
      }
    })
  },
  methods: {
    confirmMortgageStatus () {
      this.$refs['mortgageStatusForm'].validate((valid) => {
        if (valid) {
          confirmMortgageStatus(this.$route.params.id, this.mortgageStatusForm.time, this.mortgageStatusForm.isNeedGuarantee).then(data => {
            if (data) {
              this.finishCurrent = true
              this.$message({
                type: 'success',
                message: '确定抵押状态成功'
              })
              // 如果不出担保函，直接结束当前流程
              if (!this.mortgageStatusForm.isNeedGuarantee) {
                this.skipMortgage()
              }
            } else {
              this.$message({
                type: 'error',
                message: '确定抵押状态失败'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    guaranteeApproveHandler () {
      this.$refs['guaranteeApproveForm'].validate((valid) => {
        if (valid) {
          guaranteeApprove(this.$route.params.id, this.guaranteeApproveForm.approvePass, this.guaranteeApproveForm.approvePassTime).then(data => {
            if (data) {
              this.$message({
                type: 'success',
                message: '担保函审批成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '担保函审批失败'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    guaranteePublishHandler () {
      this.$refs['guaranteePublishForm'].validate((valid) => {
        if (valid) {
          guaranteePublish(this.$route.params.id, this.guaranteePublishForm.approveResult, this.guaranteePublishForm.approvePassTime, this.guaranteePublishForm.guaranteePublishTime).then(data => {
            if (data) {
              this.$message({
                type: 'success',
                message: '出担保函成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '出担保函失败'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    skipMortgage () {
      skipMortgage(this.$route.params.id).then(data => {
        if (data) {
          this.loanId = data.rootId
          this.loanStatus = data.des
          this.dialogVisible = true
        } else {
          this.$message({
            type: 'error',
            message: '流程跳转失败'
          })
        }
      })
    },
    finishMortgageHandler () {
      this.skipMortgage()
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
