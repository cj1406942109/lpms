<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>确定下单状态</h2>
      <el-form :model="orderStatusForm" ref="orderStatusForm" label-width="200px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="完成时间" prop="time">
              <el-date-picker type="date" placeholder="选择日期" v-model="orderStatusForm.time" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="评估公司">
              <el-select v-model="orderStatusForm.company" placeholder="请选择评估公司">
                <el-option label="公司1" :value="1"></el-option>
                <el-option label="公司2" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label=" ">
          <el-button v-if="orderFinish" disabled type="info">下单已完成</el-button>
          <el-button type="primary" v-else @click="finishOrder()">下单完成</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper">
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
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <div slot="title"><i class="el-icon-success" style="color:#67C23A;font-size:22px;vertical-align:middle;margin-right:5px;"></i>评估下单成功</div>
      <div>贷款编号为：<a style="color:blue">{{loanNum}}</a></div>
      <div>贷款状态为：<a style="color:blue">正在审批（等待填写审批相关表格）</a></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkStatus">查看贷款状态</el-button>
        <el-button @click="returnList">返回面谈列表</el-button>
        <el-button type="primary" @click="nextOperation">办理下一业务</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setOrderStatus, checkOrderStatus, saveReports } from '@/api/mortgage'

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
      loanNum: '',
      dialogVisible: false,
      orderFinish: null,
      reportFinish: null
    }
  },
  methods: {
    finishOrder () {
      setOrderStatus(this.orderStatusForm.time, this.orderStatusForm.company, this.$route.params.taskId).then(response => {
        console.log(response)
        if (response.data.status) {
          this.$message({
            type: 'success',
            message: '下单已完成'
          })
          this.orderFinish = true
        }
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
    },
    checkStatus () {
      this.dialogVisible = false
      this.$router.push({ path: `/loan-management/order/status/${this.loanNum}` })
    },
    returnList () {
      this.dialogVisible = false
      this.$router.push({ path: '/loan-mortgage/evaluate-order' })
    },
    nextOperation () {
      this.dialogVisible = false
      this.$router.push({ path: '/loan-mortgage/examine-approve' })
    }
  },
  created () {
    checkOrderStatus(this.$route.params.loanId).then(response => {
      if (response.data.status) {
        this.orderFinish = response.data.data.orderFinish
        this.reportFinish = response.data.data.reportFinish
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
    }
  }
</style>
