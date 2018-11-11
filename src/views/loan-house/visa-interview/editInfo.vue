<template>
  <div class="app-container">
    <el-steps :active="activeStep" align-center finish-status="success" class="form-wrapper">
      <el-step title="步骤1" description="填写资料目录表"></el-step>
      <el-step title="步骤2" description="确定签约状态"></el-step>
    </el-steps>
    <div class="form-wrapper" v-if="activeStep=='0'">
      <h3>资料目录表</h3>
      <el-form :model="catalogForm" ref="catalogForm" label-width="200px" :rules="catalogFormRules">
        <el-row>
          <el-col :span="10">
            <el-form-item label="完成时间" prop="finishTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="catalogForm.finishTime" value-format="timestamp"></el-date-picker>
            </el-form-item>
            <el-form-item label="贷款人姓名" prop="clientName">
              <el-input clearable v-model="catalogForm.clientName"></el-input>
            </el-form-item>
            <el-form-item label="拟上报金额" prop="loanAmount">
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
              <th>说明</th>
              <th>页码</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <el-checkbox v-model="catalogForm.hasClientIdCard" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>借款人身份证</td>
              <td>
                <el-radio-group v-model="catalogForm.clientIdCardDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.clientIdCardPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.clientIdCardRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <el-checkbox v-model="catalogForm.hasClientAccount" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>借款人户口：&nbsp;&nbsp;
                <el-checkbox label="首页" v-model="catalogForm.clientAccountHome" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="户主页" v-model="catalogForm.clientAccountHousehold" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="本人页" v-model="catalogForm.clientAccountMyself" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>
                <el-radio-group v-model="catalogForm.clientAccountDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.clientAccountPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.clientAccountRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <el-checkbox v-model="catalogForm.hasClientSpouseIdCard" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>借款人配偶身份证</td>
              <td>
                <el-radio-group v-model="catalogForm.clientSpouseIdCardDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.clientSpouseIdCardPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.clientSpouseIdCardRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                <el-checkbox v-model="catalogForm.hasClientSpouseAccount" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>借款人配偶户口：&nbsp;&nbsp;
                <el-checkbox label="首页" v-model="catalogForm.clientSpouseAccountHome" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="户主页" v-model="catalogForm.clientSpouseAccountHousehold" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="本人页" v-model="catalogForm.clientSpouseAccountMyself" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>
                <el-radio-group v-model="catalogForm.clientSpouseAccountDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.clientSpouseAccountPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.clientSpouseAccountRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                <el-checkbox v-model="catalogForm.hasMarriageProof" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>婚姻证明：&nbsp;&nbsp;
                <el-checkbox label="结婚证" v-model="catalogForm.marriageCertificate" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="离婚证" v-model="catalogForm.divorceCertificate" :true-label="1" :false-label="0"></el-checkbox>
                <el-checkbox label="离婚协议" v-model="catalogForm.divorceAgreement" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>
                <el-radio-group v-model="catalogForm.marriageProofDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
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
              <td>6</td>
              <td>
                <el-checkbox v-model="catalogForm.hasHouseMortgage" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>抵押物房产两证：&nbsp;&nbsp;
                <el-input clearable type="number" v-model="catalogForm.houseMortgage" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套
              </td>
              <td>
                <el-radio-group v-model="catalogForm.houseMortgageDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.houseMortgagePage" min="0" size="small">></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.houseMortgageRemark" size="small">></el-input>
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>
                <el-checkbox v-model="catalogForm.hasAssetsCertificate" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>资产证件复印件：&nbsp;&nbsp;
                <el-checkbox label="房产证" v-model="catalogForm.assetsHouseCertificate" :true-label="1" :false-label="0"></el-checkbox>
                <template v-if="catalogForm.assetsHouseCertificate">
                  <el-input clearable type="number" v-model="catalogForm.assetsHouseNumber" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套&nbsp;&nbsp;
                </template>
                <el-checkbox label="车产证" v-model="catalogForm.assetsCarCertificate" :true-label="1" :false-label="0"></el-checkbox>
                <template v-if="catalogForm.assetsCarCertificate">
                  <el-input clearable type="number" v-model="catalogForm.assetsCarNumber" min="0" style="width:80px" size="small"></el-input>&nbsp;&nbsp;套&nbsp;&nbsp;
                </template>
                <el-checkbox label="其他资产" v-model="catalogForm.assetsOther" :true-label="1" :false-label="0"></el-checkbox>
                <template v-if="catalogForm.assetsOther">
                  <el-input clearable v-model="catalogForm.assetsOtherRemark" style="width:150px" size="small"></el-input>
                </template>
              </td>
              <td>
                <el-radio-group v-model="catalogForm.assetsCertificateDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.assetsCertificatePage" min="0" size="small">></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.assetsCertificateRemark" size="small">></el-input>
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>
                <el-checkbox v-model="catalogForm.hasIncomeProof" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>收入证明</td>
              <td>
                <el-radio-group v-model="catalogForm.incomeProofDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.incomeProofPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.incomeProofRemark" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>
                <el-checkbox v-model="catalogForm.hasPurposeContact" :true-label="1" :false-label="0"></el-checkbox>
              </td>
              <td>用途合同</td>
              <td>
                <el-radio-group v-model="catalogForm.purposeContactDes">
                  <el-radio :label="1" >原件</el-radio>
                  <el-radio :label="2">复印件</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-input clearable type="number" v-model="catalogForm.purposeContactPage" min="0" size="small"></el-input>
              </td>
              <td>
                <el-input clearable v-model="catalogForm.purposeContactRemark" size="small"></el-input>
              </td>
            </tr>
            <!-- 抵押消费对应id为20,抵押经营对应id为21 -->
            <template v-if="loanVariety==21">
              <tr>
                <td>10</td>
                <td>
                  <el-checkbox v-model="catalogForm.hasBusinessLicense" :true-label="1" :false-label="0"></el-checkbox>
                </td>
                <td>营业执照（三证合一）</td>
                <td>
                  <el-radio-group v-model="catalogForm.businessLicenseDes">
                    <el-radio :label="1" >原件</el-radio>
                    <el-radio :label="2">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.businessLicensePage" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable v-model="catalogForm.businessLicenseRemark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>11</td>
                <td>
                  <el-checkbox v-model="catalogForm.hasLegalRepresentative" :true-label="1" :false-label="0"></el-checkbox>
                </td>
                <td>企业法定代表人身份证</td>
                <td>
                  <el-radio-group v-model="catalogForm.legalRepresentativeDes">
                    <el-radio :label="1" >原件</el-radio>
                    <el-radio :label="2">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.legalRepresentativePage" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable v-model="catalogForm.legalRepresentativeRemark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>12</td>
                <td>
                  <el-checkbox v-model="catalogForm.hasCompanyStatute" :true-label="1" :false-label="0"></el-checkbox>
                </td>
                <td>公司章程</td>
                <td>
                  <el-radio-group v-model="catalogForm.companyStatuteDes">
                    <el-radio :label="1" >原件</el-radio>
                    <el-radio :label="2">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.companyStatutePage" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable v-model="catalogForm.companyStatuteRemark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>13</td>
                <td>
                  <el-checkbox v-model="catalogForm.hasGrantDeed" :true-label="1" :false-label="0"></el-checkbox>
                </td>
                <td>经营地租赁合同或产权证明</td>
                <td>
                  <el-radio-group v-model="catalogForm.grantDeedDes">
                    <el-radio :label="1" >原件</el-radio>
                    <el-radio :label="2">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.grantDeedPage" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable v-model="catalogForm.grantDeedRemark" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>14</td>
                <td>
                  <el-checkbox v-model="catalogForm.hasTradingContact" :true-label="1" :false-label="0"></el-checkbox>
                </td>
                <td>贸易合同</td>
                <td>
                  <el-radio-group v-model="catalogForm.tradingContactDes">
                    <el-radio :label="1" >原件</el-radio>
                    <el-radio :label="2">复印件</el-radio>
                  </el-radio-group>
                </td>
                <td>
                  <el-input clearable type="number" v-model="catalogForm.tradingContactPage" min="0" size="small"></el-input>
                </td>
                <td>
                  <el-input clearable v-model="catalogForm.tradingContactRemark" size="small"></el-input>
                </td>
              </tr>
            </template>
            <tr v-for="(item, index) in catalogForm.catalogOther" :key="item.id">
              <td v-if="loanVariety=='21'">{{14 + index + 1}}</td>
              <td v-else>{{9 + index + 1}}</td>
              <td></td>
              <td><el-input clearable v-model="item.content" size="small"></el-input></td>
              <td><el-input clearable v-model="item.description" size="small"></el-input></td>
              <td><el-input clearable type="number" v-model="item.page" min="0" size="small"></el-input></td>
              <td><el-input clearable v-model="item.remark" size="small" style="width:calc(100% - 100px)"></el-input>
              <el-button @click.prevent="removeContent(index)" type="danger" size="small" style="width:80px;">删除</el-button></td>
            </tr>
          </tbody>
        </table>
        <el-button type="info" @click="addContent()" style="margin: 20px 0 50px 200px;display:block;">添加资料内容</el-button>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveCatalog()">保存</el-button>
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
          <el-button type="primary" :loading="formLoading" @click="finishVisaInterview">提交</el-button>
          <el-button @click="resetForm('contractStatusForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="option">
      <el-button @click="activeStep--" v-if="activeStep > 0">上一步</el-button>
      <el-button type="primary" @click="nextStep()" v-if="activeStep < 1">提交并下一步</el-button>
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
import { mapGetters } from 'vuex'
import {
  getStaticIndexByKey,
  getTaskById,
  getChecklistById,
  getVisaById,
  saveCatalog,
  saveForm,
  confirmVisa
} from '@/api/mortgage'

export default {
  name: 'sign-contract',
  data () {
    return {
      contractStatusForm: {
        time: '',
        address: ''
      },
      catalogForm: {
        finishTime: null,
        clientName: null,
        loanAmount: null,
        clerkName: null,
        clerkPhone: null,
        hasClientIdCard: null,
        clientIdCardDes: null,
        clientIdCardPage: null,
        clientIdCardRemark: null,
        hasClientAccount: null,
        clientAccountHome: null,
        clientAccountHousehold: null,
        clientAccountMyself: null,
        clientAccountDes: null,
        clientAccountPage: null,
        clientAccountRemark: null,
        hasClientSpouseIdCard: null,
        clientSpouseIdCardDes: null,
        clientSpouseIdCardPage: null,
        clientSpouseIdCardRemark: null,
        hasClientSpouseAccount: null,
        clientSpouseAccountHome: null,
        clientSpouseAccountHousehold: null,
        clientSpouseAccountMyself: null,
        clientSpouseAccountDes: null,
        clientSpouseAccountPage: null,
        clientSpouseAccountRemark: null,
        hasMarriageProof: null,
        marriageCertificate: null,
        divorceCertificate: null,
        divorceAgreement: null,
        marriageProofDes: null,
        marriageProofPage: null,
        marriageProofRemark: null,
        hasHouseMortgage: null,
        houseMortgage: null,
        houseMortgageDes: null,
        houseMortgagePage: null,
        houseMortgageRemark: null,
        hasAssetsCertificate: null,
        assetsHouseCertificate: null,
        assetsHouseNumber: null,
        assetsOther: null,
        assetsOtherRemark: null,
        assetsCarCertificate: null,
        assetsCarNumber: null,
        assetsCertificateDes: null,
        assetsCertificatePage: null,
        assetsCertificateRemark: null,
        hasIncomeProof: null,
        incomeProofDes: null,
        incomeProofPage: null,
        incomeProofRemark: null,
        hasBusinessLicense: null,
        businessLicenseDes: null,
        businessLicensePage: null,
        businessLicenseRemark: null,
        hasLegalRepresentative: null,
        legalRepresentativeDes: null,
        legalRepresentativePage: null,
        legalRepresentativeRemark: null,
        hasCompanyStatute: null,
        companyStatuteDes: null,
        companyStatutePage: null,
        companyStatuteRemark: null,
        hasGrantDeed: null,
        grantDeedDes: null,
        grantDeedPage: null,
        grantDeedRemark: null,
        hasTradingContact: null,
        tradingContactDes: null,
        tradingContactPage: null,
        tradingContactRemark: null,
        hasPurposeContact: null,
        purposeContactDes: null,
        purposeContactPage: null,
        purposeContactRemark: null,
        catalogOther: []
      },
      catalogFormRules: {
        finishTime: [{ required: true, message: '完成时间不能为空' }],
        clientName: [{ required: true, message: '贷款人姓名不能为空' }],
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
      formLoading: false,
      loanId: '',
      loanStatus: '',
      dialogVisible: false,
      listPath: '/loan-mortgage/visa-interview',
      nextPath: '/loan-mortgage/evaluate-order',
      activeStep: 0,
      activeNames: ['1'],
      loanVariety: '',
      maritalStatus: {
        key: 'mortgagevisamaritalstatus',
        value: []
      },
      familyStructure: {
        key: 'mortgagevisafamilystructure',
        value: []
      },
      localLiving1: {
        key: 'mortgagevisalocalliving1',
        value: []
      },
      localLiving2: {
        key: 'mortgagevisalocalliving2',
        value: []
      },
      credentialType: {
        key: 'mortgagevisacredentialtype',
        value: []
      },
      unitNature: {
        key: 'mortgagevisaunitnature',
        value: []
      },
      jobTitle: {
        key: 'mortgagevisajobtitle',
        value: []
      },
      paymentMethod: {
        key: 'mortgagevisarepaymentmethod',
        value: []
      },
      isYour: {
        key: 'mortgagevisaisyour',
        value: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  created () {
    getTaskById(this.$route.params.mortgageId).then(data => {
      getChecklistById(data[0].id).then(data => {
        this.loanVariety = data.loanVariety
      })
    })
    this.getFormData()
    this.getStaticIndex(this.maritalStatus)
    this.getStaticIndex(this.familyStructure)
    this.getStaticIndex(this.localLiving1)
    this.getStaticIndex(this.localLiving2)
    this.getStaticIndex(this.credentialType)
    this.getStaticIndex(this.unitNature)
    this.getStaticIndex(this.jobTitle)
    this.getStaticIndex(this.paymentMethod)
    this.getStaticIndex(this.isYour)
  },
  methods: {
    getFormData () {
      getVisaById(this.$route.params.id).then(data => {
        this.catalogForm = data.catalog
        this.applicationForm = data.form
        // 如果后台返回的数据类型不是int，需要手动转为int 修复element-ui model.number初始化出错
      })
    },
    saveCatalog () {
      this.$refs['catalogForm'].validate((valid) => {
        if (valid) {
          saveCatalog(this.catalogForm).then(data => {
            console.log(data)
          })
        } else {
          return false
        }
      })
    },
    saveForm () {
      this.$refs['applicationForm'].validate((valid) => {
        if (valid) {
          saveForm(this.applicationForm).then(data => {
            return data
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      console.log(formName)
      this.$refs[formName].resetFields()
    },
    addContent () {
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
    nextStep () {
      this.$confirm('是否提交资料目录表和个人贷款申请表？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '正在处理...'
        })
        this.saveCatalog()
        this.saveForm()
        this.activeStep++
      }).catch(() => {})
    },
    finishVisaInterview () {
      this.$refs['contractStatusForm'].validate((valid) => {
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
            this.formLoading = true
            confirmVisa(this.$route.params.id, this.contractStatusForm.time, this.contractStatusForm.address).then(data => {
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
    getStaticIndex (staticIndex) {
      getStaticIndexByKey(staticIndex.key).then(data => {
        staticIndex.value = data[staticIndex.key]
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
          td:nth-child(5) {
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
