<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper" v-if="reportType == '1'">
      <el-step title="步骤1" description="担保流程"></el-step>
      <el-step title="步骤2" description="出正评"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep=='0'">
      <h3>担保流程</h3>
      <el-form :model="guaranteeForm" ref="guaranteeForm" label-width="200px" :rules="guaranteeFormRules" key="guaranteeForm">
        <el-form-item label="是否需要盖章" prop="isNeedStamp">
          <el-radio-group v-model="guaranteeForm.isNeedStamp">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="盖章通过时间" prop="stampTime" v-if="guaranteeForm.isNeedStamp == '1'">
          <el-date-picker type="date" placeholder="选择日期" v-model="guaranteeForm.stampTime" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item label="出担保函时间" prop="guaranteeTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="guaranteeForm.guaranteeTime" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="formLoading" @click="saveGuaranteeHandler()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep=='1'">
      <h3>出报告</h3>
      <el-form :model="reportForm" ref="reportForm" label-width="200px" :rules="reportFormRules" key="reportForm">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="reportForm.time" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="copyReport()">复制预评报告</el-button>
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
          <el-button @click="resetForm('reportForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="option" v-if="reportType == '1'">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="activeStep++" :disabled="!finishGuarantee" v-if="activeStep < 1">下一步</el-button>
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
import { mapGetters } from 'vuex'
import {
  getGuaranteeById,
  saveGuarantee,
  saveFormalReport,
  skipGuarantee
} from '@/api/house'

export default {
  data () {
    return {
      reportType: 0, // 报告类型，1表示预评，2表示正评
      preReport: null, // 预评
      guaranteeForm: {
        isNeedStamp: null,
        stampTime: null,
        guaranteeTime: null
      },
      reportForm: {
        time: null,
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
      guaranteeFormRules: {
        isNeedStamp: [{ required: true, message: '请选择是否需要盖章' }],
        stampTime: [{ required: true, message: '盖章通过时间不能为空' }],
        guaranteeTime: [{ required: true, message: '出担保函时间不能为空' }]
      },
      reportFormRules: {
        time: [{ required: true, message: '完成时间不能为空' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/house/guarantee',
      nextPath: '/house/make-loans',
      activeStep: 0,
      loanVariety: '',
      finishGuarantee: false // 担保流程完成
    }
  },
  created () {
    this.loanLastStatus = this.$route.params.des
    this.reportType = parseInt(this.$route.params.reportType)
    this.finishGuarantee = this.$route.params.guaranteeState === 'true'
    getGuaranteeById(this.$route.params.id).then(data => {
      if (data) {
        this.guaranteeForm.isNeedStamp = data.guaranteeState.isNeedStamp ? parseInt(data.guaranteeState.isNeedStamp) : null
        this.guaranteeForm.stampTime = data.guaranteeState.stampTime ? data.guaranteeState.isNeedStamp : null
        this.guaranteeForm.guaranteeTime = data.guaranteeState.guaranteeTime ? data.guaranteeState.guaranteeTime : null
        if (data.report) {
          this.preReport = JSON.parse(JSON.stringify(data.report))
        }
      } else {
        this.$message({
          type: 'error',
          message: '获取担保流程数据失败'
        })
      }
    })
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
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
    saveGuaranteeHandler () {
      this.$refs['guaranteeForm'].validate((valid) => {
        if (valid) {
          // 奇葩设计，必须要设置一个数字值后台才能保存，否则报错，为空时，将null置为0
          this.guaranteeForm.stampTime = this.guaranteeForm.stampTime ? this.guaranteeForm.stampTime : 0
          if (this.reportType === 1) {
            saveGuarantee(this.$route.params.id, this.guaranteeForm.isNeedStamp, this.guaranteeForm.stampTime, this.guaranteeForm.guaranteeTime).then(data => {
              if (data) {
                this.finishGuarantee = true
                this.$message({
                  type: 'success',
                  message: '担保流程提交成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '担保流程提交失败'
                })
              }
            })
          } else {
            this.$confirm('请确认信息填写无误，是否提交？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'info',
                message: '正在处理...'
              })
              saveGuarantee(this.$route.params.id, this.guaranteeForm.isNeedStamp, this.guaranteeForm.stampTime, this.guaranteeForm.guaranteeTime).then(data => {
                if (data) {
                  this.finishGuarantee = true
                  this.$message({
                    type: 'success',
                    message: '担保流程提交成功'
                  })
                  skipGuarantee(this.$route.params.id).then(data => {
                    this.formLoading = false
                    this.$message.closeAll()
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
                } else {
                  this.$message({
                    type: 'error',
                    message: '担保流程提交失败'
                  })
                }
              })
            }).catch(() => {})
          }
        } else {
          return false
        }
      })
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
            this.reportForm.report.reportType = 2
            saveFormalReport(this.$route.params.id, this.reportForm.time, this.reportForm.report).then(data => {
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
    },
    copyReport () {
      // index1 正评索引，index2 预评索引
      this.reportForm.report = JSON.parse(JSON.stringify(this.preReport))
      this.reportForm.report.reportHouseAge = parseInt(this.reportForm.report.reportHouseAge)
      this.reportForm.report.reportLoanYear = parseInt(this.reportForm.report.reportLoanYear)
      this.reportForm.report.reportFirst = parseInt(this.reportForm.report.reportFirst)
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