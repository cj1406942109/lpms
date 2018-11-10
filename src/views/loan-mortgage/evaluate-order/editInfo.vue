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
              <el-date-picker type="date" placeholder="选择日期" v-model="orderStatusForm.time" value-format="timestamp" :disabled="orderFinish"></el-date-picker>
            </el-form-item>
            <el-form-item label="评估公司" prop="company">
              <el-select v-model="orderStatusForm.company" placeholder="请选择评估公司" :disabled="orderFinish">
                <el-option label="公司1" :value="1"></el-option>
                <el-option label="公司2" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label=" ">
          <el-button v-if="orderFinish" disabled type="info">下单已完成</el-button>
          <template v-else>
            <el-button type="primary" @click="confirmOrder('orderStatusForm')">完成下单</el-button>
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
        <el-row v-for="(house, indexH) in reportForm.reports" :key="house.id">
          <el-form-item>
            <el-button type="success" @click="addReport(indexH)" v-if="reportForm.type == '1' && reportForm.reports[indexH].length < 2">新增报告</el-button>
            <el-button type="danger" @click="removeReport(indexH)" v-if="reportForm.type == '1' && reportForm.reports[indexH].length === 2">删除第二份报告</el-button>
          </el-form-item>
          <el-col :span="10" v-for="(report, indexR) in house" :key="report.id">
            <h3>房产 {{indexH + 1}} 报告 {{indexR + 1}} 内容</h3>
            <el-form-item label="权利人" :prop="'reports.' + indexH + '.' + indexR + '.reportObligee'" :rules="[{ required: true, message: '权利人不能为空' }]">
              <el-input clearable v-model="report.reportObligee"></el-input>
            </el-form-item>
            <el-form-item label="借款人" :prop="'reports.' + indexH + '.' + indexR + '.reportBorrower'" :rules="[{ required: true, message: '借款人不能为空' }]">
              <el-input clearable v-model="report.reportBorrower"></el-input>
            </el-form-item>
            <el-form-item label="座落" :prop="'reports.' + indexH + '.' + indexR + '.reportRepose'" :rules="[{ required: true, message: '座落不能为空' }]">
              <el-input clearable v-model="report.reportRepose"></el-input>
            </el-form-item>
            <el-form-item label="房龄" :prop="'reports.' + indexH + '.' + indexR + '.reportHouseAge'" :rules="[{ required: true, message: '房龄不能为空' }, { type: 'number', message: '房龄必须为数字值' }]">
              <el-input clearable v-model.number="report.reportHouseAge" type="number" min="0"><template slot="append">年</template></el-input>
            </el-form-item>
            <el-form-item label="面积" :prop="'reports.' + indexH + '.' + indexR + '.reportHouseArea'" :rules="[{ required: true, message: '面积不能为空' }, { type: 'number', message: '面积必须为数字值' }]">
              <el-input clearable v-model.number="report.reportHouseArea" type="number" min="0" @input="calcTotalPrice(report.reportHouseArea, report.reportHouseSingle, indexH, indexR)"><template slot="append">平米</template></el-input>
            </el-form-item>
            <el-form-item label="单价" :prop="'reports.' + indexH + '.' + indexR + '.reportHouseSingle'" :rules="[{ required: true, message: '单价不能为空' }, { type: 'number', message: '单价必须为数字值' }]">
              <el-input clearable v-model.number="report.reportHouseSingle" type="number" min="0" @input="calcTotalPrice(report.reportHouseArea, report.reportHouseSingle, indexH, indexR)"><template slot="append">元/平米</template></el-input>
            </el-form-item>
            <el-form-item label="总价" :prop="'reports.' + indexH + '.' + indexR + '.reportHouseTotal'">
              <el-input clearable v-model.number="report.reportHouseTotal" type="number" min="0" readonly><template slot="append">元</template></el-input>
            </el-form-item>
            <el-form-item label="拟贷款金额" :prop="'reports.' + indexH + '.' + indexR + '.reportLoanAmount'" :rules="[{ required: true, message: '拟贷款金额不能为空' }, { type: 'number', message: '拟贷款金额必须为数字值' }]">
              <el-input clearable v-model.number="report.reportLoanAmount" type="number" min="0"><template slot="append">元</template></el-input>
            </el-form-item>
            <el-form-item label="年限" :prop="'reports.' + indexH + '.' + indexR + '.reportLoanYear'" :rules="[{ required: true, message: '年限不能为空' }, { type: 'number', message: '年限必须为数字值' }]">
              <el-input clearable v-model.number="report.reportLoanYear" type="number" min="0"><template slot="append">年</template></el-input>
            </el-form-item>
            <el-form-item label="首套/两套" :prop="'reports.' + indexH + '.' + indexR + '.reportFirst'" :rules="[{ required: true, message: '请选择首套/两套' }]">
              <el-radio-group v-model="report.reportFirst"><el-radio :label="1">首套</el-radio><el-radio :label="2">两套</el-radio></el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" :loading="formLoading" @click="submit('reportForm')">提交</el-button>
          <el-button @click="resetForm('reportForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="option">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="nextStep()" v-if="activeStep < 1">下一步</el-button>
    </div>
    <flow-complete-dialog
      :loanId="loanId"
      :loanStatus="loanStatus"
      :dialogVisible="dialogVisible"
      :listPath="listPath"
      :nextPath="nextPath"
    ></flow-complete-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import {
  getTaskById,
  getChecklistById,
  getOrderById,
  confirmOrder,
  saveReport
} from '@/api/mortgage'

export default {
  data () {
    const report = {
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
      reportType: null,
      houseId: null
    }
    return {
      report: report, // 不可直接修改
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
        reports: []
      },
      reportFormRules: {
        time: [{ required: true, message: '完成时间不能为空' }],
        type: [{ required: true, message: '请选择报告类别' }]
      },
      activeStep: 0,
      formLoading: false,
      loanId: '',
      loanStatus: '',
      dialogVisible: false,
      listPath: '/loan-mortgage/visa-interview',
      nextPath: '/loan-mortgage/evaluate-order',
      orderFinish: null,
      reportFinish: null
    }
  },
  methods: {
    confirmOrder (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('请确认下单状态无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'info',
              message: '正在处理...'
            })
            confirmOrder(this.$route.params.id, this.orderStatusForm.time, this.orderStatusForm.company).then(data => {
              this.orderFinish = true
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
    addReport (index) {
      const report = JSON.parse(JSON.stringify(this.report))
      if (this.reportForm.reports[index].length < 2) {
        report.houseId = this.reportForm.reports[index][0].houseId
        this.reportForm.reports[index].push(report)
      }
    },
    removeReport (index) {
      if (this.reportForm.reports[index].length === 2) {
        this.reportForm.reports[index].splice(1, 1)
      }
    },
    nextStep () {
      if (!this.orderFinish) {
        confirmOrder(this.$route.params.id, this.orderStatusForm.company, this.orderStatusForm.time).then(data => {
          this.orderFinish = true
        })
      }
      this.activeStep++
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
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
            saveReport(this.$route.params.id, this.reportForm.time, this.reportForm.type, this.reportForm.reports).then(data => {
              this.formLoading = false
              this.loanId = data.rootId
              this.loanStatus = data.des
              this.dialogVisible = true
            })
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    calcTotalPrice (area, singlePrice, indexH, indexR) {
      if (area && singlePrice) {
        if (parseFloat(area).toString() !== 'NaN' && parseFloat(singlePrice).toString() !== 'NaN') {
          this.reportForm.reports[indexH][indexR].reportHouseTotal = area * singlePrice
        } else {
          this.reportForm.reports[indexH][indexR].reportHouseTotal = null
        }
      } else {
        this.reportForm.reports[indexH][indexR].reportHouseTotal = null
      }
    }
  },
  created () {
    getOrderById(this.$route.params.id).then(data => {
      if (data.id) {
        this.orderStatusForm.time = moment(data.orderTime).format('x')
        this.orderStatusForm.company = parseInt(data.company)
        this.orderFinish = true
      }
    })
    getTaskById(parseInt(this.$route.params.mortgageId)).then(data => {
      getChecklistById(data[0].id).then(data => {
        data.houses.forEach(ele => {
          // 深层赋值，防止对象被篡改
          const report = JSON.parse(JSON.stringify(this.report))
          report.houseId = ele.id
          this.reportForm.reports.push([report])
        })
      })
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
