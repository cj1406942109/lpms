<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper">
      <el-step title="步骤1" description="确定下单状态"></el-step>
      <el-step title="步骤2" description="出报告"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep=='0'">
      <h3>确定下单状态</h3>
      <el-form :model="orderStatusForm" ref="orderStatusForm" label-width="200px" :rules="orderStatusFormRules">
        <el-row>
          <el-col :span="10">
            <el-form-item label="完成时间" prop="time">
              <el-date-picker type="date" placeholder="选择日期" v-model="orderStatusForm.time" value-format="timestamp" :disabled="finishOrder"></el-date-picker>
            </el-form-item>
            <el-form-item label="评估公司" prop="company">
              <el-select v-model="orderStatusForm.company" placeholder="请选择评估公司" :disabled="finishOrder">
                <el-option label="公司1" :value="1"></el-option>
                <el-option label="公司2" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button v-if="finishOrder" disabled type="info">下单已完成</el-button>
          <template v-else>
            <el-button type="primary" @click="confirmOrderHandler()">完成下单</el-button>
            <el-button @click="resetForm('orderStatusForm')">重置</el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep=='1'">
      <h3>出报告</h3>
      <el-form :model="reportForm" ref="reportForm" label-width="200px" :rules="reportFormRules">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.time" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item label="报告类别" prop="type">
          <el-radio-group v-model="reportForm.type">
            <el-radio :label="1">预评</el-radio>
            <el-radio :label="2">正评</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <h3>报告内容</h3>
            <el-form-item label="权利人" :prop="'report.reportObligee'" :rules="[{ required: true, message: '权利人不能为空' }]">
              <el-input clearable v-model="reportForm.report.reportObligee"></el-input>
            </el-form-item>
            <el-form-item label="借款人" :prop="'report.reportBorrower'" :rules="[{ required: true, message: '借款人不能为空' }]">
              <el-input clearable v-model="reportForm.report.reportBorrower"></el-input>
            </el-form-item>
            <el-form-item label="座落" :prop="'report.reportRepose'" :rules="[{ required: true, message: '座落不能为空' }]">
              <el-input clearable v-model="reportForm.report.reportRepose"></el-input>
            </el-form-item>
            <el-form-item label="房龄" :prop="'report.reportHouseAge'" :rules="[{ required: true, message: '房龄不能为空' }, { type: 'number', message: '房龄必须为数字值' }]">
              <el-input clearable v-model.number="reportForm.report.reportHouseAge" type="number" min="0"><template slot="append">年</template></el-input>
            </el-form-item>
            <el-form-item label="面积" :prop="'report.reportHouseArea'" :rules="[{ required: true, message: '面积不能为空' }, { type: 'number', message: '面积必须为数字值' }]">
              <el-input clearable v-model.number="reportForm.report.reportHouseArea" type="number" min="0" @input="calcTotalPrice(reportForm.report.reportHouseArea, reportForm.report.reportHouseSingle)"><template slot="append">平米</template></el-input>
            </el-form-item>
            <el-form-item label="单价" :prop="'report.reportHouseSingle'" :rules="[{ required: true, message: '单价不能为空' }, { type: 'number', message: '单价必须为数字值' }]">
              <el-input clearable v-model.number="reportForm.report.reportHouseSingle" type="number" min="0" @input="calcTotalPrice(reportForm.report.reportHouseArea, reportForm.report.reportHouseSingle)"><template slot="append">元/平米</template></el-input>
            </el-form-item>
            <el-form-item label="总价" :prop="'report.reportHouseTotal'">
              <el-input clearable v-model.number="reportForm.report.reportHouseTotal" type="number" min="0" readonly><template slot="append">元</template></el-input>
            </el-form-item>
            <el-form-item label="拟贷款金额" :prop="'report.reportLoanAmount'" :rules="[{ required: true, message: '拟贷款金额不能为空' }, { type: 'number', message: '拟贷款金额必须为数字值' }]">
              <el-input clearable v-model.number="reportForm.report.reportLoanAmount" type="number" min="0"><template slot="append">元</template></el-input>
            </el-form-item>
            <el-form-item label="年限" :prop="'report.reportLoanYear'" :rules="[{ required: true, message: '年限不能为空' }, { type: 'number', message: '年限必须为数字值' }]">
              <el-input clearable v-model.number="reportForm.report.reportLoanYear" type="number" min="0"><template slot="append">年</template></el-input>
            </el-form-item>
            <el-form-item label="首套/两套" :prop="'report.reportFirst'" :rules="[{ required: true, message: '请选择首套/两套' }]">
              <el-radio-group v-model="reportForm.report.reportFirst"><el-radio :label="1">首套</el-radio><el-radio :label="2">两套</el-radio></el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" :loading="formLoading" @click="saveReportHandler()">提交</el-button>
          <!-- <el-button @click="resetForm('reportForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="option">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="activeStep++" v-if="activeStep < 1" :disabled="!finishOrder">下一步</el-button>
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
  getOrderById,
  confirmOrder,
  saveReport
} from '@/api/house'

export default {
  data () {
    return {
      orderStatusForm: {
        time: null,
        company: null
      },
      orderStatusFormRules: {
        time: [{ required: true, message: '完成时间不能为空' }],
        company: [{ required: true, message: '请选择评估公司' }]
      },
      reportForm: {
        time: null,
        type: null,
        report: {
          reportObligee: null,
          reportBorrower: null,
          reportRepose: null,
          reportHouseAge: null,
          reportHouseArea: null,
          reportHouseSingle: null,
          reportHouseTotal: null,
          reportLoanAmount: null,
          reportLoanYear: null,
          reportFirst: null,
          reportType: null
        }
      },
      reportFormRules: {
        time: [{ required: true, message: '完成时间不能为空' }],
        type: [{ required: true, message: '请选择报告类别' }]
      },
      activeStep: 0,
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/house/evaluate-order',
      nextPath: '/house/integrate-input',
      finishOrder: false
    }
  },
  methods: {
    confirmOrderHandler () {
      this.$refs['orderStatusForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认下单状态无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            confirmOrder(this.$route.params.id, this.orderStatusForm.time, this.orderStatusForm.company).then(data => {
              if (data) {
                this.finishOrder = true
                this.$message({
                  type: 'success',
                  message: '确定下单状态成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '确定下单状态失败'
                })
              }
            })
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    calcTotalPrice (area, singlePrice) {
      if (area && singlePrice) {
        if (parseFloat(area).toString() !== 'NaN' && parseFloat(singlePrice).toString() !== 'NaN') {
          this.reportForm.report.reportHouseTotal = area * singlePrice
        } else {
          this.reportForm.report.reportHouseTotal = null
        }
      } else {
        this.reportForm.report.reportHouseTotal = null
      }
    },
    saveReportHandler () {
      this.$refs['reportForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'info',
              message: '正在处理...'
            })
            // 给报告类型赋值
            this.reportForm.report.reportType = this.reportForm.type
            saveReport(this.$route.params.id, this.reportForm.time, this.reportForm.type, this.reportForm.report).then(data => {
              this.$message.closeAll()
              this.formLoading = false
              if (data) {
                this.loanId = data.rootId
                this.loanStatus = data.des
                this.dialogVisible = true
              } else {
                this.$message({
                  type: 'error',
                  message: '报告提交失败'
                })
              }
            })
          }).catch(() => {})
        } else {
          return false
        }
      })
    }
  },
  created () {
    this.loanLastStatus = this.$route.params.des
    this.finishOrder = this.$route.params.orderState === 'true'
    getOrderById(this.$route.params.id).then(data => {
      if (data) {
        if (data.orderTime) {
          this.orderStatusForm.time = data.orderTime
          this.orderStatusForm.company = parseInt(data.company)
        }
      } else {
        this.$message({
          type: 'error',
          message: '获取评估下单信息失败'
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .form-wrapper {
      padding: 20px;
      margin-bottom: 20px;
      background-color: #fff;
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
