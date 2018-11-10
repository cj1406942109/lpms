<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper">
      <el-step title="步骤1" description="填写资料目录表和个人贷款申请表"></el-step>
      <el-step title="步骤2" description="确定面签状态"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep=='0'">
      <h3>确定下单状态</h3>
      <el-form :model="orderStatusForm" ref="orderStatusForm" label-width="200px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="完成时间" prop="time">
              <el-date-picker type="date" placeholder="选择日期" v-model="orderStatusForm.time" value-format="timestamp"></el-date-picker>
            </el-form-item>
            <el-form-item label="评估公司" prop="company">
              <el-select v-model="orderStatusForm.company" placeholder="请选择评估公司">
                <el-option label="公司1" :value="1"></el-option>
                <el-option label="公司2" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label=" ">
          <el-button v-if="orderFinish" disabled type="info">下单已完成</el-button>
          <el-button type="primary" v-else @click="confirmOrder()">完成下单</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep=='1'">
      <h2>出报告</h2>
      <el-form :model="reportForm" ref="reportForm" label-width="200px">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.time" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="报告类别">
          <el-radio-group v-model="reportForm.type">
            <el-radio :label="1">预评</el-radio>
            <el-radio :label="2">正评</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="10" v-for="report in reportForm.reports" :key="report.id">
            <h3 style="margin-left: 50px;">报告内容</h3>
            <el-form-item label="权利人">
              <el-input v-model="report.report_obligee"></el-input>
            </el-form-item>
            <el-form-item label="借款人">
              <el-input v-model="report.report_borrower"></el-input>
            </el-form-item>
            <el-form-item label="坐落">
              <el-input v-model="report.report_repose"></el-input>
            </el-form-item>
            <el-form-item label="房龄">
              <el-input v-model="report.report_house_age"></el-input>
            </el-form-item>
            <el-form-item label="面积">
              <el-input v-model="report.report_house_area"></el-input>
            </el-form-item>
            <el-form-item label="单价">
              <el-input v-model="report.report_house_single"></el-input>
            </el-form-item>
            <el-form-item label="总价">
              <el-input v-model="report.report_house_total"></el-input>
            </el-form-item>
            <el-form-item label="贷款金额">
              <el-input v-model="report.report_loan_amount"></el-input>
            </el-form-item>
            <el-form-item label="年限">
              <el-input v-model="report.report_loan_year"></el-input>
            </el-form-item>
            <el-form-item label="首套/两套">
              <el-radio-group v-model="report.report_first"><el-radio :label="1">首套</el-radio><el-radio :label="2">两套</el-radio></el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label=" ">
          <el-button type="primary" @click="submit()">提交</el-button>
          <el-button type="success" @click="addReport()" v-if="reportForm.type == '1' && reportForm.reports.length < 2">新增报告</el-button>
          <el-button type="danger" @click="removeReport()" v-if="reportForm.type == '1' && reportForm.reports.length === 2">删除第二份报告</el-button>
        </el-form-item>
      </el-form>
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
import {
  getOrderById,
  confirmOrder,
  saveReports
} from '@/api/mortgage'

export default {
  data () {
    const report = {
      report_obligee: null,
      report_borrower: null,
      report_repose: null,
      report_house_age: null,
      report_house_area: null,
      report_house_single: null,
      report_house_total: null,
      report_loan_amount: null,
      report_loan_year: null,
      report_first: null,
      report_type: null
    }
    return {
      orderStatusForm: {
        time: null,
        company: null
      },
      report: report,
      reportForm: {
        time: null,
        type: null,
        reports: [report]
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
    confirmOrder () {
      confirmOrder(this.$route.params.id, this.orderStatusForm.company, this.orderStatusForm.time).then(data => {
        console.log(data)
        this.orderFinish = true
      })
    },
    addReport () {
      if (this.reportForm.reports.length < 2) {
        this.reportForm.reports.push(this.report)
      }
    },
    removeReport () {
      if (this.reportForm.reports.length === 2) {
        this.reportForm.reports.splice(1, 1)
      }
    },
    submit () {
      this.$confirm('请确认信息填写无误，是否提交？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '正在处理...'
        })
        saveReports(this.reportForm.time, this.reportForm.type, JSON.stringify(this.reportForm.reports), this.$route.params.taskId).then(response => {
          if (response.data.status === 1) {
            this.loanNum = response.data.data
            this.dialogVisible = true
          } else {
            this.$message({
              showClose: true,
              message: '保存失败，请稍候重试！',
              type: 'error'
            })
          }
        })
      }).catch(() => {})
      this.dialogVisible = false
    }
  },
  created () {
    getOrderById(this.$route.params.id).then(data => {
      console.log(data)
    })
    // checkOrderStatus(this.$route.params.loanId).then(response => {
    //   if (response.data.status) {
    //     this.orderFinish = response.data.data.orderFinish
    //     this.reportFinish = response.data.data.reportFinish
    //   }
    // })
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
  }
</style>
