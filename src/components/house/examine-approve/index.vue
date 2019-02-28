<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper">
      <el-step title="步骤1" description="报审"></el-step>
      <el-step title="步骤2" description="确定审批状态"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep=='0'">
      <h3>报审</h3>
      <el-form :model="approveForm" ref="approveForm" label-width="200px" :rules="approveFormRules" key="approveForm">
        <el-form-item label="上报审批时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="approveForm.time" value-format="timestamp" :disabled="finishSend"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="completeApproveHandler()" v-if="!finishSend">完成报审</el-button>
          <el-button type="info" disabled v-else>已完成报审</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep=='1'">
      <h3>确定审批状态</h3>
      <el-form :model="approveStatusForm" ref="approveStatusForm" label-width="200px" :rules="approveStatusFormRules" key="approveStatusForm">
        <el-form-item label="审批状态" prop="approveState">
          <el-radio-group v-model="approveStatusForm.approveState">
            <el-radio :label="1">已通过</el-radio>
            <el-radio :label="0">未通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="10">
            <template v-if="approveStatusForm.approveState == '1'">
              <el-form-item label="审批通过时间" prop="approveTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="approveStatusForm.approveTime" value-format="timestamp"></el-date-picker>
              </el-form-item>
              <el-form-item label="金额" prop="amount">
                <el-input clearable v-model.number="approveStatusForm.amount" type="number"><template slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label="年限" prop="period">
                <el-input clearable v-model.number="approveStatusForm.period" type="number"><template slot="append">年</template></el-input>
              </el-form-item>
              <el-form-item label="利率" prop="rate">
                <el-input clearable v-model.number="approveStatusForm.rate" type="number"><template slot="append">%</template></el-input>
              </el-form-item>
              <el-form-item label="放款条件" prop="loanCondition">
                <el-select v-model="approveStatusForm.loanCondition" placeholder="请选择">
                  <el-option v-for="item in loanCondition.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input clearable type="textarea" v-model="approveStatusForm.remark"></el-input>
              </el-form-item>
            </template>
            <template v-if="approveStatusForm.approveState == '0'">
              <el-form-item label="审批未通过时间" prop="approveTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="approveStatusForm.approveTime" value-format="timestamp"></el-date-picker>
              </el-form-item>
              <el-form-item label="未通过原因" prop="failReason">
                <el-select v-model="approveStatusForm.failReason" placeholder="请选择">
                  <el-option v-for="item in failReason.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
                <el-input clearable v-model="approveStatusForm.failReasonOther" placeholder="其他原因" v-if="approveStatusForm.failReason == '63'"></el-input>
              </el-form-item>
              <el-form-item label="后续操作" prop="laterAction">
                <el-select v-model="approveStatusForm.laterAction" placeholder="请选择">
                  <el-option v-for="item in laterAction.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="confirmApproveStatusHandler()" :loading="formLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="option">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="activeStep++" :disabled="!finishSend" v-if="activeStep < 1">下一步</el-button>
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
  getStaticIndexByKey,
  getApproveById,
  completeApprove,
  confirmApproveStatus,
  updateApproveStatus
} from '@/api/house'

export default {
  data () {
    return {
      approveForm: {
        time: null
      },
      approveStatusForm: {
        approveState: null,
        approveTime: null,
        amount: null,
        period: null,
        rate: null,
        loanCondition: null,
        remark: null,
        failReason: null,
        failReasonOther: null,
        laterAction: null
      },
      approveFormRules: {
        time: [{ required: true, message: '上报审批时间不能为空' }]
      },
      approveStatusFormRules: {
        approveState: [{ required: true, message: '请选择审批状态' }],
        approveTime: [{ required: true, message: '时间不能为空' }],
        amount: [
          { required: true, message: '金额不能为空' },
          { type: 'integer', message: '金额必须为整数值' }
        ],
        period: [
          { required: true, message: '年限不能为空' },
          { type: 'number', message: '年限必须为数字值' }
        ],
        rate: [
          { required: true, message: '利率不能为空' },
          { type: 'number', min: 0, max: 100, message: '利率必须为0到100之间的数字' }
        ],
        loanCondition: [{ required: true, message: '请选择放款条件' }],
        failReason: [{ required: true, message: '请选择未通过原因' }],
        laterAction: [{ required: true, message: '请选择后续操作' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/house/examine-approve',
      nextPath: '/house/transfer',
      activeStep: 0,
      finishSend: false, // 报审完成
      finishApprove: false,
      loanCondition: {
        key: 'mortgageReleaseMoney',
        value: []
      },
      failReason: {
        key: 'mortgageApprovalNotPass',
        value: []
      },
      laterAction: {
        key: 'mortgageApprovalFollowUp',
        value: []
      }
    }
  },
  props: {
    approveId: '',
    showFlowDialog: {
      default: false
    },
    currentFlow: ''
  },
  created () {
    this.loanLastStatus = this.currentFlow
    getApproveById(this.approveId).then(({ data }) => {
      console.log(data)
      if (data) {
        this.finishSend = data.sendState.done
        this.finishApprove = data.approveState.done
        if (this.finishSend) {
          this.approveForm.time = data.sendState.time
        }
        if (this.finishApprove) {
          this.approveStatusForm = JSON.parse(JSON.stringify(data.approve))
          this.approveStatusForm.approveState = parseInt(this.approveStatusForm.approveState)
          this.approveStatusForm.loanCondition = parseInt(this.approveStatusForm.loanCondition)
          this.approveStatusForm.period = parseFloat(this.approveStatusForm.period)
          this.approveStatusForm.rate = parseFloat(this.approveStatusForm.rate)
        }
      } else {
        this.$message({
          type: 'error',
          message: '获取审批流程数据失败'
        })
      }
    })
    this.getStaticIndex(this.loanCondition)
    this.getStaticIndex(this.failReason)
    this.getStaticIndex(this.laterAction)
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    completeApproveHandler () {
      this.$refs['approveForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            completeApprove(this.approveId, this.approveForm.time).then(({ data }) => {
              if (data) {
                this.finishSend = true
                this.$message({
                  type: 'success',
                  message: '确认报审成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '确认报审失败'
                })
              }
            })
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    confirmApproveStatusHandler () {
      this.$refs['approveStatusForm'].validate((valid) => {
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
              confirmApproveStatus(this.approveId, this.approveStatusForm).then(({ data }) => {
                this.$message.closeAll()
                this.formLoading = false
                if (data) {
                  this.loanId = data.rootId
                  this.loanStatus = data.des
                  this.dialogVisible = true
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定审批状态失败'
                  })
                }
              })
            } else {
              this.formLoading = true
              const saveMethod = this.finishApprove ? updateApproveStatus : confirmApproveStatus
              saveMethod(this.approveId, this.approveStatusForm).then(({ data }) => {
                this.formLoading = false
                if (data) {
                  this.finishApprove = true
                  this.$message({
                    type: 'success',
                    message: '确定审批状态成功'
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '确定审批状态失败'
                  })
                }
              })
            }
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    getStaticIndex (staticIndex) {
      getStaticIndexByKey(staticIndex.key).then(({ data }) => {
        if (data) {
          staticIndex.value = data[staticIndex.key]
        } else {
          this.$message({
            type: 'success',
            message: '静态索引获取失败'
          })
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