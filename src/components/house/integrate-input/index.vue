<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper">
      <el-step title="步骤1" description="确定房查征信状态"></el-step>
      <el-step title="步骤2" description="确定整件状态"></el-step>
      <el-step title="步骤3" description="确定输机状态"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep=='0'">
      <h3>确定房查征信状态</h3>
      <el-form :model="checkForm" ref="checkForm" label-width="200px" :rules="checkFormRules" key="checkForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="房查完成时间" prop="houseTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="checkForm.houseTime" value-format="timestamp" :disabled="finishCheck"></el-date-picker>
            </el-form-item>
            <el-form-item label="征信完成时间" prop="creditTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="checkForm.creditTime" value-format="timestamp" :disabled="finishCheck"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <template v-if="!finishCheck">
            <el-button type="primary" @click="confirmCheckHandler()">完成房查征信</el-button>
            <el-button @click="resetForm('checkForm')">重置</el-button>
          </template>
          <template v-else>
            <el-button type="info" disabled>已完成房查征信</el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep=='1'">
      <h3>确定整件状态</h3>
      <el-form :model="catalogForm" ref="catalogForm" label-width="200px" :rules="catalogFormRules" v-if="catalogForm" key="catalogForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="整件完成时间" prop="inputFinishTime" :rules="[{ required: true, message: '整件完成时间不能为空' }]">
              <el-date-picker type="date" placeholder="选择日期" v-model="catalogForm.inputFinishTime" value-format="timestamp"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <table cellspacing="0">
          <thead>
            <tr>
              <th>序号</th>
              <th>有无</th>
              <th>资料内容明细</th>
              <th>份数</th>
              <th>说明</th>
              <th>页码</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <el-checkbox v-model="catalogForm.hasClientInformation" true-label="1" false-label="0"></el-checkbox>
              </td>
              <td>客户情况登记明细表</td>
              <td>1 份</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <el-checkbox v-model="catalogForm.hasBothIdCard" true-label="1" false-label="0"></el-checkbox>
              </td>
              <td>买卖双方身份证</td>
              <td>各 2 份</td>
              <td>
                <el-radio-group v-model="catalogForm.bothIdCardDes">
                  <el-radio label="1">原件</el-radio>
                  <el-radio label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.bothIdCardPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.bothIdCardRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <el-checkbox v-model="catalogForm.hasBothAccount" true-label="1" false-label="0"></el-checkbox>
              </td>
              <td>买卖双方户口：&nbsp;&nbsp;
                <el-checkbox label="首页" v-model="catalogForm.bothAccountHome" true-label="1" false-label="0"></el-checkbox>
                <el-checkbox label="户主页" v-model="catalogForm.bothAccountHousehold" true-label="1" false-label="0"></el-checkbox>
                <el-checkbox label="本人页" v-model="catalogForm.bothAccountMyself" true-label="1" false-label="0"></el-checkbox>
              </td>
              <td>各 1 份</td>
              <td>
                <el-radio-group v-model="catalogForm.bothAccountDes">
                  <el-radio label="1">原件</el-radio>
                  <el-radio label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.bothAccountPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.bothAccountRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                <el-checkbox v-model="catalogForm.hasMarriageProof" true-label="1" false-label="0"></el-checkbox>
              </td>
              <td>婚姻证明：&nbsp;&nbsp;
                <el-checkbox label="结婚证" v-model="catalogForm.marriageCertificate" true-label="1" false-label="0"></el-checkbox>
                <el-checkbox label="离婚证" v-model="catalogForm.divorceCertificate" true-label="1" false-label="0"></el-checkbox>
                <el-checkbox label="离婚协议" v-model="catalogForm.divorceAgreement" true-label="1" false-label="0"></el-checkbox>
              </td>
              <td>2 份</td>
              <td>
                <el-radio-group v-model="catalogForm.marriageProofDes">
                  <el-radio label="1">原件</el-radio>
                  <el-radio label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.marriageProofPage" min="0"  size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.marriageProofRemark"  size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                <el-checkbox v-model="catalogForm.hasHouseCertificate" true-label="1" false-label="0"></el-checkbox>
              </td>
              <td>抵押物房产两证</td>
              <td>1 份</td>
              <td>
                <el-radio-group v-model="catalogForm.houseCertificateDes">
                  <el-radio label="1">原件</el-radio>
                  <el-radio label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.houseCertificatePage" min="0" size="small">></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.houseCertificateRemark" size="small">></el-input>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>
                <el-checkbox v-model="catalogForm.hasPayReceipt" true-label="1" false-label="0"></el-checkbox>
              </td>
              <td>首付款收据</td>
              <td>1 份</td>
              <td>
                <el-radio-group v-model="catalogForm.payReceiptDes">
                  <el-radio label="1">原件</el-radio>
                  <el-radio label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.payReceiptPage" min="0" size="small">></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.payReceiptRemark" size="small">></el-input>
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>
                <el-checkbox v-model="catalogForm.hasBankCard" true-label="1" false-label="0"></el-checkbox>
              </td>
              <td>银行卡复印件（夫妻两人都要开卡）</td>
              <td>各 1 份</td>
              <td>
                <el-radio-group v-model="catalogForm.bankCardDes">
                  <el-radio label="1">原件</el-radio>
                  <el-radio label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.bankCardPage" min="0" size="small">></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.bankCardRemark" size="small">></el-input>
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>
                <el-checkbox v-model="catalogForm.hasSalaryProof" true-label="1" false-label="0"></el-checkbox>
              </td>
              <td>收入证明</td>
              <td>1 份</td>
              <td>
                <el-radio-group v-model="catalogForm.salaryProofDes">
                  <el-radio label="1">原件</el-radio>
                  <el-radio label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.salaryProofPage" min="0" size="small">></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.salaryProofRemark" size="small">></el-input>
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>
                <el-checkbox v-model="catalogForm.hasBankStatement" true-label="1" false-label="0"></el-checkbox>
              </td>
              <td>银行流水近六个月</td>
              <td></td>
              <td>
                <el-radio-group v-model="catalogForm.bankStatementDes">
                  <el-radio label="1">原件</el-radio>
                  <el-radio label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.bankStatementPage" min="0" size="small">></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.bankStatementRemark" size="small">></el-input>
              </td>
            </tr>
            <tr v-for="(item, index) in catalogForm.catalogOther" :key="item.id">
              <td>{{9 + index + 1}}</td>
              <td></td>
              <td><el-input clearable v-model="item.content" size="small"></el-input></td>
              <td></td>
              <td><el-input clearable v-model="item.description" size="small"></el-input></td>
              <td><el-input clearable type="number" v-model="item.page" min="0" size="small"></el-input></td>
              <td><el-input clearable v-model="item.remark" size="small" style="width:calc(100% - 100px)"></el-input>
              <el-button @click.prevent="removeContent(index)" type="danger" size="small" style="width:80px;">删除</el-button></td>
            </tr>
          </tbody>
        </table>
        <el-button type="info" @click="addContent()" style="margin: 20px 0 50px 200px;display:block;">添加资料内容</el-button>
        <el-form-item>
          <el-button type="primary" @click="confirmIntegrateHandler()">完成整件</el-button>
          <el-button @click="resetForm('catalogForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep=='2'">
      <h3>确定输机状态</h3>
      <el-form :model="inputForm" ref="inputForm" label-width="200px" :rules="inputFormRules" key="inputForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="输机完成时间" prop="time">
              <el-date-picker type="date" placeholder="选择日期" v-model="inputForm.time" value-format="timestamp" :disabled="finishInput"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <template v-if="!finishInput">
            <el-button type="primary" :loading="formLoading" @click="confirmInputHandler()">完成输机</el-button>
            <el-button @click="resetForm('inputForm')">重置</el-button>
          </template>
          <template v-else>
            <el-button type="info" disabled>已完成输机</el-button>
          </template>
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
// import moment from 'moment'
import {
  getInputById,
  confirmCheck,
  confirmIntegrate,
  updateIntegrate,
  confirmInput
} from '@/api/house'

export default {
  data () {
    return {
      checkForm: {
        houseTime: null,
        creditTime: null
      },
      catalogForm: null,
      inputForm: {
        time: null
      },
      checkFormRules: {
        houseTime: [{ required: true, message: '房查完成时间不能为空' }],
        creditTime: [{ required: true, message: '征信完成时间不能为空' }]
      },
      catalogFormRules: {
        inputFinishTime: [{ required: true, message: '整件完成时间不能为空' }]
      },
      inputFormRules: {
        time: [{ required: true, message: '输机完成时间不能为空' }]
      },
      activeStep: 0,
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/house/integrate-input',
      nextPath: '/house/examine-approve',
      finishCheck: false,
      finishCatalog: false,
      finishInput: false
    }
  },
  computed: {
    nextStepStatus: function () {
      if (this.activeStep === 0) {
        return !this.finishCheck
      } else if (this.activeStep === 1) {
        return !this.finishCatalog
      }
    }
  },
  props: {
    inputId: '',
    showFlowDialog: {
      default: false
    },
    currentFlow: ''
  },
  methods: {
    confirmCheckHandler () {
      this.$refs['checkForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            confirmCheck(this.inputId, this.checkForm.houseTime, this.checkForm.creditTime).then(data => {
              if (data) {
                this.finishCheck = true
                this.$message({
                  type: 'success',
                  message: '确定房查征信状态成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '确定房查征信状态失败'
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
    addContent () {
      // 第一次拿到时为nulls
      if (!this.catalogForm.catalogOther) {
        this.catalogForm.catalogOther = []
      }
      this.catalogForm.catalogOther.push({
        content: '',
        description: '',
        page: '',
        remark: ''
      })
    },
    removeContent (index) {
      this.$confirm('是否删除该行？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.catalogForm.catalogOther.splice(index, 1)
      }).catch(() => {})
    },
    confirmIntegrateHandler () {
      this.$refs['catalogForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const saveMethod = this.finishCatalog ? updateIntegrate : confirmIntegrate
            saveMethod(this.inputId, this.catalogForm).then(data => {
              if (data) {
                this.finishCatalog = true
                this.$message({
                  type: 'success',
                  message: '完成整件成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '完成整件失败'
                })
              }
            })
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    confirmInputHandler () {
      this.$refs['inputForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.showFlowDialog) {
              this.formLoading = true
              this.$message({
                type: 'info',
                message: '正在处理...'
              })
              confirmInput(this.inputId, this.inputForm.time).then(data => {
                this.$message.closeAll()
                this.formLoading = false
                if (data) {
                  this.finishInput = true
                  this.loanId = data.rootId
                  this.loanStatus = data.des
                  this.dialogVisible = true
                } else {
                  this.$message({
                    type: 'error',
                    message: '完成输机失败'
                  })
                }
              })
            } else {
              this.formLoading = true
              confirmInput(this.inputId, this.inputForm.time).then(data => {
                this.formLoading = false
                if (data) {
                  this.finishInput = true
                  this.$message({
                    type: 'success',
                    message: '完成输机成功'
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '完成输机失败'
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
  },
  created () {
    this.loanLastStatus = this.currentFlow
    getInputById(this.inputId).then(data => {
      console.log(data)
      if (data) {
        this.finishCheck = data.checkState.done
        this.finishCatalog = data.catalogState.done
        this.finishInput = data.inputState.done
        if (this.finishCheck) {
          this.checkForm.houseTime = data.checkState.houseTime
          this.checkForm.creditTime = data.checkState.creditTime
        }
        this.catalogForm = JSON.parse(JSON.stringify(data.catalog))
        if (this.finishInput) {
          this.inputForm.time = data.inputState.time
        }
      } else {
        this.$message({
          type: 'error',
          message: '获取整件输机信息失败'
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
      h2 {
        margin: 0;
      }
      h3 {
        padding-left: 200px;
        color: #303133;
      }
      table {
        border: 1px solid #ccc;
        margin-left:200px;
        width:calc(100% - 300px);
        thead tr {
          background-color: #fafafa;
        }
        tr {
          
          td, th {
            padding: 10px 5px;
            text-align: center;
          }
          td {
            border-top: 1px solid #ddd;
          }
          td:nth-child(6) {
            width: 100px;
          }
        }
        tbody tr:nth-child(odd) {
          background-color: #fff;
        }
        tbody tr:nth-child(even) {
          background-color: #fafafa;
        }
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
