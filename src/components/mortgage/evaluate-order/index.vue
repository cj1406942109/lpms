<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper">
      <el-step title="步骤1" description="确定下单状态"></el-step>
      <el-step title="步骤2" description="出报告"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep=='0'">
      <h3>确定下单状态</h3>
      <el-form :model="orderStatusForm" ref="orderStatusForm" label-width="200px" :rules="orderStatusFormRules" key="orderStatusForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="完成时间" prop="time">
              <el-date-picker type="date" placeholder="选择日期" v-model="orderStatusForm.time" value-format="timestamp" :disabled="finishOrder"></el-date-picker>
            </el-form-item>
            <el-form-item label="评估公司" prop="company">
              <el-select v-model="orderStatusForm.company" placeholder="请选择评估公司" :disabled="finishOrder">
                <el-option v-for="item in evaloateCompany.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
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
      <el-form :model="reportForm" ref="reportForm" label-width="200px" :rules="reportFormRules" key="reportForm">
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
          <h3>房产 {{indexH + 1}} </h3>
          <el-form-item>
            <el-button type="success" @click="addReport(indexH)" v-if="reportForm.type == '1' && reportForm.reports[indexH].length < 2">新增报告</el-button>
            <el-button type="danger" @click="removeReport(indexH)" v-if="reportForm.type == '1' && reportForm.reports[indexH].length === 2">删除第二份报告</el-button>
          </el-form-item>
          <el-col :span="10" v-for="(report, indexR) in house" :key="report.id">
            <h3>报告 {{indexR + 1}} 内容</h3>
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
  getStaticIndexByKey,
  getOrderById,
  confirmOrder,
  saveReport,
  updateReport
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
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/loan-mortgage/evaluate-order',
      nextPath: '/loan-mortgage/examine-approve',
      finishOrder: false,
      finishReport: false,
      evaloateCompany: {
        key: 'mortgageordercompany',
        value: []
      }
    }
  },
  props: {
    orderId: '',
    showFlowDialog: {
      default: false
    },
    currentFlow: ''
  },
  watch: {
    'reportForm.type': function (newType, oldType) {
      let dialog = false
      this.reportForm.reports.forEach(house => {
        // 勾选正评，且当前有房产报告大于一份
        if (house.length > 1 && newType === 2) {
          dialog = true
        }
      })

      if (dialog) {
        this.$confirm('一个房产只能对应一份正评，是否删除多余报告', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 报告截取，只取第一个
          this.reportForm.reports.forEach((house, index) => {
            this.removeReport(index)
          })
          this.reportForm.type = newType
        }).catch(() => {
          this.reportForm.type = oldType
        })
      }
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
            confirmOrder(this.orderId, this.orderStatusForm.time, this.orderStatusForm.company).then(({ data }) => {
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
    },
    saveReportHandler () {
      this.$refs['reportForm'].validate((valid) => {
        if (valid) {
          // 给所有的报告类型赋值
          this.reportForm.reports.forEach(house => {
            house.forEach(report => {
              report.reportType = this.reportForm.type
            })
          })
          if (this.showFlowDialog) {
            this.$confirm('请确认信息填写无误，是否提交？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'info',
                message: '正在处理...'
              })
              this.formLoading = true
              saveReport(this.orderId, this.reportForm.time, this.reportForm.type, this.reportForm.reports).then(({ data }) => {
                this.$message.closeAll()
                this.formLoading = false
                if (data) {
                  this.finishReport = true
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
            this.formLoading = true
            const saveMethod = this.finishReport ? updateReport : saveReport
            saveMethod(this.orderId, this.reportForm.time, this.reportForm.type, this.reportForm.reports).then(({ data }) => {
              this.formLoading = false
              if (data) {
                this.finishReport = true
                this.$message({
                  type: 'success',
                  message: '报告保存成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '报告保存失败'
                })
              }
            })
          }
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
            type: 'error',
            message: '静态索引获取失败'
          })
        }
      })
    }
  },
  created () {
    this.loanLastStatus = this.currentFlow
    getOrderById(this.orderId).then(({ data }) => {
      if (data) {
        this.finishOrder = data.orderState.done
        this.finishReport = data.reportState.done
        if (data.orderState.done) {
          this.orderStatusForm = JSON.parse(JSON.stringify(data.order))
          this.orderStatusForm.company = parseInt(this.orderStatusForm.company)
        }
        if (!data.reportState.done) {
          data.checklist.houses.forEach(ele => {
            // 深层赋值，防止对象被篡改
            const report = JSON.parse(JSON.stringify(this.report))
            report.houseId = ele.id
            this.reportForm.reports.push([report])
          })
        } else {
          console.log(data)
          this.reportForm = JSON.parse(JSON.stringify(data.report))
          this.reportForm.type = parseInt(this.reportForm.type)
          console.log(this.reportForm.reports)
          this.reportForm.reports.forEach(house => {
            console.log(house)
            house.forEach((report, index) => {
              console.log(report)
              // 过滤审批环节的报告
              if (parseInt(report.reportType) !== this.reportForm.type) {
                house = house.splice(index, 1)
              } else {
                report.reportFirst = parseInt(report.reportFirst)
                report.reportHouseAge = parseInt(report.reportHouseAge)
                report.reportLoanYear = parseInt(report.reportLoanYear)
              }
            })
          })
        }
      } else {
        this.$message({
          type: 'error',
          message: '获取评估下单信息失败'
        })
      }
    })
    this.getStaticIndex(this.evaloateCompany)
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
