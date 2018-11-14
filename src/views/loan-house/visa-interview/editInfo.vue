<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper">
      <el-step title="步骤1" description="填写资料目录表"></el-step>
      <el-step title="步骤2" description="确定签约状态"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep=='0'">
      <h3>资料目录表</h3>
      <el-form :model="catalogForm" ref="catalogForm" label-width="200px" :rules="catalogFormRules" v-if="catalogForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="完成时间" prop="finishTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="catalogForm.finishTime" value-format="timestamp"></el-date-picker>
            </el-form-item>
            <el-form-item label="贷款人姓名" prop="borrowerName">
              <el-input clearable v-model="catalogForm.borrowerName"></el-input>
            </el-form-item>
            <el-form-item label="贷款金额" prop="loanAmount">
              <el-input clearable v-model.number="catalogForm.loanAmount" type="number"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="接单人员姓名" prop="clerkName">
              <el-input clearable v-model="catalogForm.clerkName"></el-input>
            </el-form-item>
            <el-form-item label="接单人员电话" prop="clerkPhone">
              <el-input clearable v-model="catalogForm.clerkPhone"></el-input>
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
          <el-button type="primary" @click="saveCatalogHandler()">保存</el-button>
          <el-button @click="resetForm('catalogForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper" v-if="activeStep=='1'">
      <h3>确定面签状态</h3>
      <el-form :model="contractStatusForm" ref="contractStatusForm" label-width="200px" :rules="contractStatusFormRules">
        <el-form-item label="完成时间" prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="contractStatusForm.time" value-format="timestamp"></el-date-picker>
        </el-form-item>
         <el-form-item label="约定地点" prop="address">
          <el-select v-model="contractStatusForm.address" placeholder="请选择签约地点">
            <el-option label="地点1" :value="0"></el-option>
            <el-option label="地点2" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :loading="formLoading" @click="confirmVisaStatus()">提交</el-button>
          <el-button @click="resetForm('contractStatusForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="option">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="activeStep++" v-if="activeStep < 1" :disabled="!finishCatalog">下一步</el-button>
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
import {
  getVisaById,
  saveCatalog,
  confirmVisa
} from '@/api/house'

export default {
  data () {
    return {
      contractStatusForm: {
        time: '',
        address: ''
      },
      // catalogForm: {
      //   finishTime: null,
      //   clientName: null,
      //   loanAmount: null,
      //   clerkName: null,
      //   clerkPhone: null,
      //   hasClientIdCard: null,
      //   clientIdCardDes: null,
      //   clientIdCardPage: null,
      //   clientIdCardRemark: null,
      //   hasClientAccount: null,
      //   clientAccountHome: null,
      //   clientAccountHousehold: null,
      //   clientAccountMyself: null,
      //   clientAccountDes: null,
      //   clientAccountPage: null,
      //   clientAccountRemark: null,
      //   hasClientSpouseIdCard: null,
      //   clientSpouseIdCardDes: null,
      //   clientSpouseIdCardPage: null,
      //   clientSpouseIdCardRemark: null,
      //   hasClientSpouseAccount: null,
      //   clientSpouseAccountHome: null,
      //   clientSpouseAccountHousehold: null,
      //   clientSpouseAccountMyself: null,
      //   clientSpouseAccountDes: null,
      //   clientSpouseAccountPage: null,
      //   clientSpouseAccountRemark: null,
      //   hasMarriageProof: null,
      //   marriageCertificate: null,
      //   divorceCertificate: null,
      //   divorceAgreement: null,
      //   marriageProofDes: null,
      //   marriageProofPage: null,
      //   marriageProofRemark: null,
      //   hasHouseMortgage: null,
      //   houseMortgage: null,
      //   houseMortgageDes: null,
      //   houseMortgagePage: null,
      //   houseMortgageRemark: null,
      //   hasAssetsCertificate: null,
      //   assetsHouseCertificate: null,
      //   assetsHouseNumber: null,
      //   assetsOther: null,
      //   assetsOtherRemark: null,
      //   assetsCarCertificate: null,
      //   assetsCarNumber: null,
      //   assetsCertificateDes: null,
      //   assetsCertificatePage: null,
      //   assetsCertificateRemark: null,
      //   hasIncomeProof: null,
      //   incomeProofDes: null,
      //   incomeProofPage: null,
      //   incomeProofRemark: null,
      //   hasBusinessLicense: null,
      //   businessLicenseDes: null,
      //   businessLicensePage: null,
      //   businessLicenseRemark: null,
      //   hasLegalRepresentative: null,
      //   legalRepresentativeDes: null,
      //   legalRepresentativePage: null,
      //   legalRepresentativeRemark: null,
      //   hasCompanyStatute: null,
      //   companyStatuteDes: null,
      //   companyStatutePage: null,
      //   companyStatuteRemark: null,
      //   hasGrantDeed: null,
      //   grantDeedDes: null,
      //   grantDeedPage: null,
      //   grantDeedRemark: null,
      //   hasTradingContact: null,
      //   tradingContactDes: null,
      //   tradingContactPage: null,
      //   tradingContactRemark: null,
      //   hasPurposeContact: null,
      //   purposeContactDes: null,
      //   purposeContactPage: null,
      //   purposeContactRemark: null,
      //   catalogOther: []
      // },
      catalogForm: null,
      catalogFormRules: {
        finishTime: [{ required: true, message: '完成时间不能为空' }],
        borrowerName: [{ required: true, message: '贷款人姓名不能为空' }],
        clerkName: [{ required: true, message: '接单人员姓名不能为空' }],
        loanAmount: [
          { required: true, message: '拟上报金额不能为空' },
          { type: 'integer', message: '拟上报金额必须为整数值' }
        ],
        clerkPhone: [
          { required: true, message: '接单人员电话不能为空' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误' }
        ]
      },
      contractStatusFormRules: {
        time: [{ required: true, message: '完成时间不能为空' }],
        address: [{ required: true, message: '请选择约定地点' }]
      },
      finishCatalog: false,
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/house/visa-interview',
      nextPath: '/house/evaluate-order',
      activeStep: 0
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created () {
    this.loanLastStatus = this.$route.params.des
    getVisaById(this.$route.params.id).then(data => {
      if (data) {
        this.catalogForm = JSON.parse(JSON.stringify(data.catalog))
        if (this.catalogForm.borrowerName) {
          this.finishCatalog = true
        }
      } else {
        this.$message({
          type: 'error',
          message: '表单数据获取失败'
        })
      }
    })
  },
  methods: {
    saveCatalog () {
      return new Promise((resolve, reject) => {
        this.$refs['catalogForm'].validate((valid) => {
          if (valid) {
            saveCatalog(this.catalogForm).then(data => {
              data ? resolve() : reject(true)
            })
          } else {
            reject()
          }
        })
      })
    },
    saveCatalogHandler () {
      this.saveCatalog().then(() => {
        this.finishCatalog = true
        this.$message({
          type: 'success',
          message: '资料目录表保存成功'
        })
      }).catch((done) => {
        if (done) {
          this.$message({
            type: 'error',
            message: '资料目录表保存失败'
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    addContent () {
      // 第一次拿到时为null
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
    confirmVisaStatus () {
      this.$refs['contractStatusForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认信息填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.formLoading = true
            this.$message({
              type: 'info',
              message: '正在处理...'
            })
            confirmVisa(this.$route.params.id, this.contractStatusForm.time, this.contractStatusForm.address).then(data => {
              this.$message.closeAll()
              this.formLoading = false
              if (data) {
                this.loanId = data.rootId
                this.loanStatus = data.des
                this.dialogVisible = true
              } else {
                this.$message({
                  type: 'error',
                  message: '确定面签状态失败'
                })
              }
            })
          }).catch(() => {})
        } else {
          return false
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
