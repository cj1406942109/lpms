<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" v-if="mortgageStatusForm.isNeedGuarantee" class="form-wrapper">
      <el-step title="步骤1" description="确定抵押状态"></el-step>
      <el-step title="步骤2" description="担保流程"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep==0">
      <h3>确定抵押状态</h3>
      <el-form :model="mortgageStatusForm" ref="mortgageStatusForm" label-width="200px" :rules="mortgageStatusFormRules" key="mortgageStatusForm">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="mortgageStatusForm.time" value-format="timestamp" :disabled="finishMortgage"></el-date-picker>
        </el-form-item>
        <el-form-item label="是否出担保函" prop="isNeedGuarantee">
          <el-radio-group v-model="mortgageStatusForm.isNeedGuarantee" :disabled="finishMortgage">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="info" disabled v-if="finishMortgage">已确定抵押状态</el-button>
          <el-button type="primary" @click="confirmMortgageStatusHandler()" v-else>提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep==1">
      <el-row>
        <el-col>
          <h3>担保函审批</h3>
          <el-form :model="guaranteeApproveForm" ref="guaranteeApproveForm" label-width="200px" :rules="guaranteeApproveFormRules" key="guaranteeApproveForm">
            <el-form-item label="审批结果" prop="approvePass">
              <el-select v-model="guaranteeApproveForm.approvePass" placeholder="请选择" :disabled="finishApprove">
                <el-option label="通过" :value="1"></el-option>
                <el-option label="拒绝" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审批通过时间" v-if="guaranteeApproveForm.approvePass == '1'">
              <el-date-picker type="date" placeholder="选择日期" v-model="guaranteeApproveForm.approvePassTime" value-format="timestamp" :disabled="finishApprove"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="info" v-if="finishApprove" disabled>审批函已担保</el-button>
              <el-button type="primary" @click="guaranteeApproveHandler()" v-else>提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="form-wrapper" v-if="activeStep==1">
      <h3>出担保函</h3>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form :model="guaranteePublishForm" ref="guaranteePublishForm" label-width="200px" :rules="guaranteePublishFormRules" key="guaranteePublishForm">
            <el-form-item label="审批结果" prop="approveResult">
              <el-input clearable v-model="guaranteePublishForm.approveResult" :disabled="finishPublish"></el-input>
            </el-form-item>
            <el-form-item label="审批通过时间" prop="approvePassTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="guaranteePublishForm.approvePassTime" value-format="timestamp" :disabled="finishPublish"></el-date-picker>
            </el-form-item>
            <el-form-item label="出担保函时间" prop="guaranteePublishTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="guaranteePublishForm.guaranteePublishTime" value-format="timestamp" :disabled="finishPublish"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="info" v-if="finishPublish" disabled>已出担保函</el-button>
              <el-button type="primary" @click="guaranteePublishHandler()" v-else>提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="option" v-if="mortgageStatusForm.isNeedGuarantee">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="activeStep++" v-if="activeStep < 1" :disabled="!finishMortgage">下一步</el-button>
      <el-button type="success" @click="finishMortgageHandler()" :disabled="!(finishApprove&&finishPublish)" v-if="activeStep == 1 && !localFinishFlow">完成抵押</el-button>
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
      nextPath: '/loan-mortgage/charge',
      finishMortgage: false, // 确定抵押状态完成
      finishApprove: false, // 审批担保函完成
      finishPublish: false, // 出担保函完成
      localFinishFlow: false
    }
  },
  computed: {
    ...mapGetters([
      'permission'
    ])
  },
  props: {
    mortgageId: '',
    finishFlow: {
      default: false
    },
    showFlowDialog: {
      default: false
    },
    currentFlow: ''
  },
  created () {
    this.loanLastStatus = this.currentFlow
    this.localFinishFlow = this.finishFlow
    this.finishMortgage = this.$route.params.mortgageState === 'true'
    this.finishApprove = this.$route.params.guaranteeApprove === 'true'
    this.finishPublish = this.$route.params.guaranteePublish === 'true'
    getMortgageById(this.mortgageId).then(({ data }) => {
      this.finishMortgage = data.mortgageState.done
      this.finishApprove = data.guaranteeApprove.done
      this.finishPublish = data.guaranteePublish.done
      console.log(data)
      if (data) {
        if (this.finishMortgage) {
          this.mortgageStatusForm.time = parseInt(data.mortgageState.time)
          this.mortgageStatusForm.isNeedGuarantee = data.mortgageState.isNeedGuarantee
        }
        if (this.finishApprove) {
          this.guaranteeApproveForm.approvePass = parseInt(data.guaranteeApprove.approvePass)
        }
        if (this.finishPublish) {
          this.guaranteePublishForm.approveResult = data.guaranteePublish.approveResult
          this.guaranteePublishForm.approvePassTime = data.guaranteePublish.approvePassTime
          this.guaranteePublishForm.guaranteePublishTime = data.guaranteePublish.approvePassTime
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
            confirmMortgageStatus(this.mortgageId, this.mortgageStatusForm.time, this.mortgageStatusForm.isNeedGuarantee).then(({ data }) => {
              if (data) {
                this.finishMortgage = true
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
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    guaranteeApproveHandler () {
      this.$refs['guaranteeApproveForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            guaranteeApprove(this.mortgageId, this.guaranteeApproveForm.approvePass, this.guaranteeApproveForm.approvePassTime).then(({ data }) => {
              if (data) {
                this.finishApprove = true
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
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    guaranteePublishHandler () {
      this.$refs['guaranteePublishForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            guaranteePublish(this.mortgageId, this.guaranteePublishForm.approveResult, this.guaranteePublishForm.approvePassTime, this.guaranteePublishForm.guaranteePublishTime).then(({ data }) => {
              if (data) {
                this.finishPublish = true
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
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    skipMortgage () {
      if (this.showFlowDialog) {
        this.$message({
          type: 'info',
          message: '正在处理...'
        })
        skipMortgage(this.mortgageId).then(({ data }) => {
          this.$message.closeAll()
          if (data) {
            this.localFinishFlow = true
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
      } else {
        skipMortgage(this.mortgageId).then(({ data }) => {
          if (data) {
            this.localFinishFlow = true
            this.$message({
              type: 'success',
              message: '流程跳转成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '流程跳转失败'
            })
          }
        })
      }
    },
    finishMortgageHandler () {
      this.$confirm('请确认信息填写无误，是否提交？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.skipMortgage()
      }).catch(() => {})
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
