<template>
  <div class="app-container">
    <h2>客户情况登记明细表</h2>
    <el-form :model="checklistForm" ref="checklistForm" label-width="200px" :rules="rules">
      <el-form-item label="完成时间" prop="finishTime">
        <el-date-picker type="date" v-model="checklistForm.finishTime" placeholder="选择日期" value-format="timestamp"></el-date-picker>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="10">
          <h3>借款人基本信息</h3>
          <el-form-item label="姓名" prop="borrowerName">
            <el-input clearable v-model="checklistForm.borrowerName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="borrowerPhone">
            <el-input clearable v-model="checklistForm.borrowerPhone"></el-input>
          </el-form-item>
          <el-form-item label="工作单位" prop="borrowerCompany">
            <el-input clearable v-model="checklistForm.borrowerCompany"></el-input>
          </el-form-item>
          <el-form-item label="单位电话" prop="borrowerCompanyPhone">
            <el-input clearable v-model="checklistForm.borrowerCompanyPhone"></el-input>
          </el-form-item>
          <el-form-item label="月均收入" prop="borrowerSalary">
            <el-input clearable v-model.number="checklistForm.borrowerSalary" type="number" min="0"><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="联系地址" prop="borrowerAddress">
            <el-input clearable v-model="checklistForm.borrowerAddress"></el-input>
          </el-form-item>
          <el-form-item label="户口所在地" prop="borrowerResidentCity">
            <el-input clearable v-model="checklistForm.borrowerResidentCity"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="borrowerCertificateType">
            <el-select placeholder="请选择" v-model="checklistForm.borrowerCertificateType">
              <el-option label="身份证" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="borrowerCertificateNumber">
            <el-input clearable v-model="checklistForm.borrowerCertificateNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <h3>借款人配偶基本信息</h3>
          <el-form-item label="姓名" prop="borrowerSpouseName">
            <el-input clearable v-model="checklistForm.borrowerSpouseName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="borrowerSpousePhone">
            <el-input clearable v-model="checklistForm.borrowerSpousePhone"></el-input>
          </el-form-item>
          <el-form-item label="工作单位" prop="borrowerSpouseCompany">
            <el-input clearable v-model="checklistForm.borrowerSpouseCompany"></el-input>
          </el-form-item>
          <el-form-item label="单位电话" prop="borrowerSpouseCompanyPhone">
            <el-input clearable v-model="checklistForm.borrowerSpouseCompanyPhone"></el-input>
          </el-form-item>
          <el-form-item label="户口所在地" prop="borrowerSpouseResidentCity">
            <el-input clearable v-model="checklistForm.borrowerSpouseResidentCity"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="borrowerSpouseCertificateType">
            <el-select placeholder="请选择" v-model="checklistForm.borrowerSpouseCertificateType">
              <el-option v-for="item in cardType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="borrowerSpouseCertificateNumber">
            <el-input clearable v-model="checklistForm.borrowerSpouseCertificateNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <h3>产权人基本信息</h3>
          <el-form-item label="姓名" prop="ownerName">
            <el-input clearable v-model="checklistForm.ownerName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="ownerPhone">
            <el-input clearable v-model="checklistForm.ownerPhone"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="ownerIdCard">
            <el-input clearable v-model="checklistForm.ownerIdCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <h3>产权人配偶基本信息</h3>
          <el-form-item label="姓名" prop="ownerSpouseName">
            <el-input clearable v-model="checklistForm.ownerSpouseName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="ownerSpousePhone">
            <el-input clearable v-model="checklistForm.ownerSpousePhone"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="ownerSpouseIdCard">
            <el-input clearable v-model="checklistForm.ownerSpouseIdCard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <h3>客户借款基本信息</h3>
          <el-form-item label="贷款银行" prop="loanBank">
            <el-input clearable v-model="checklistForm.loanBank"></el-input>
          </el-form-item>
          <el-form-item label="评估公司" prop="evaluationCompany">
            <el-input clearable v-model="checklistForm.evaluationCompany"></el-input>
          </el-form-item>
          <el-form-item label="房屋成交价" prop="houseTransactionPrice">
            <el-input clearable v-model.number="checklistForm.houseTransactionPrice" type="number" min="0"><template slot="append">万元</template></el-input>
          </el-form-item>
          <el-form-item label="房屋评估价" prop="houseEvaluatePrice">
            <el-input clearable v-model.number="checklistForm.houseEvaluatePrice" type="number" min="0"><template slot="append">万元</template></el-input>
          </el-form-item>
          <el-form-item label="贷款金额" prop="loanAmount">
            <el-input clearable v-model.number="checklistForm.loanAmount" type="number" min="0"><template slot="append">万元</template></el-input>
          </el-form-item>
          <el-form-item label="贷款年限" prop="loanPeriod">
            <el-input clearable v-model.number="checklistForm.loanPeriod" type="number" min="0"><template slot="append">年</template></el-input>
          </el-form-item>
          <el-form-item label="担保方式" prop="guaranteeType">
            <el-input clearable v-model="checklistForm.guaranteeType"></el-input>
          </el-form-item>
          <el-form-item label="还款方式" prop="payType">
            <el-select placeholder="请选择" v-model="checklistForm.payType">
              <el-option v-for="item in payType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="贷款类型" prop="loanType">
            <el-select placeholder="请选择" v-model="checklistForm.loanType">
              <el-option v-for="item in loanType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首付款金额" prop="downPayAmount">
            <el-input clearable v-model.number="checklistForm.downPayAmount" type="number" min="0"><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="首付款交付方式" prop="downPayType">
            <el-input clearable v-model="checklistForm.downPayType"></el-input>
          </el-form-item>
          <el-form-item label="成交是否真实" prop="isDealReal">
            <el-radio-group v-model="checklistForm.isDealReal">
              <el-radio label="1" >是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="客户情况是否真实" prop="isClientSituationReal">
            <el-radio-group v-model="checklistForm.isClientSituationReal">
              <el-radio label="1" >是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="卖方存折办理" prop="sellerHandle">
            <el-select placeholder="请选择" v-model="checklistForm.sellerHandle">
              <el-option v-for="item in sellerHandle.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input clearable type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="checklistForm.remark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <h3>保证人基本信息</h3>
          <el-form-item label="姓名" prop="guarantorName">
            <el-input clearable v-model="checklistForm.guarantorName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="guarantorPhone">
            <el-input clearable v-model="checklistForm.guarantorPhone"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="guarantorIdCard">
            <el-input clearable v-model="checklistForm.guarantorIdCard"></el-input>
          </el-form-item>
          <el-form-item label="工作单位" prop="guarantorCompany">
            <el-input clearable v-model="checklistForm.guarantorCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <h3>房屋基本信息</h3>
          <el-form-item label="房屋地址" prop="houseAddress">
            <el-input clearable v-model="checklistForm.houseAddress"></el-input>
          </el-form-item>
          <el-form-item label="房产证号" prop="houseCertificateNumber">
            <el-input clearable v-model="checklistForm.houseCertificateNumber"></el-input>
          </el-form-item>
          <el-form-item label="土地证号" prop="houseLandCertificateNumber">
            <el-input clearable v-model="checklistForm.houseLandCertificateNumber"></el-input>
          </el-form-item>
          <el-form-item label="房屋所属区局" prop="houseAffiliation">
            <el-input clearable v-model="checklistForm.houseAffiliation"></el-input>
          </el-form-item>
          <el-form-item label="建成年份" prop="houseBuiltTime">
            <el-input clearable v-model="checklistForm.houseBuiltTime"><template slot="append">年</template></el-input>
          </el-form-item>
          <el-form-item label="房屋类型" prop="houseType">
            <el-select placeholder="请选择" v-model="checklistForm.houseType">
              <el-option v-for="item in houseType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房屋建筑面积" prop="houseArea">
            <el-input clearable v-model.number="checklistForm.houseArea" type="number" min="0"><template slot="append">平米</template></el-input>
          </el-form-item>
          <el-form-item label="土地属性" prop="houseLandType">
            <el-select placeholder="请选择" v-model="checklistForm.houseLandType">
              <el-option v-for="item in landType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" :loading="formLoading" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm('checklistForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <flow-complete-dialog
      :loanId="loanId"
      :loanStatus="loanStatus"
      :loanLastStatus="loanLastStatus"
      :dialogVisible="dialogVisible"
      :showReturnButton="false"
      :listPath="listPath"
      :nextPath="nextPath"
    ></flow-complete-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStaticIndexByKey, saveChecklist, createTask } from '@/api/house'

export default {
  name: 'order-taking',
  data () {
    return {
      checklistForm: {
        finishTime: null,
        borrowerName: null,
        borrowerPhone: null,
        borrowerCompany: null,
        borrowerCompanyPhone: null,
        borrowerSalary: null,
        borrowerAddress: null,
        borrowerResidentCity: null,
        borrowerCertificateType: null,
        borrowerCertificateNumber: null,
        borrowerSpouseName: null,
        borrowerSpousePhone: null,
        borrowerSpouseCompany: null,
        borrowerSpouseCompanyPhone: null,
        borrowerSpouseResidentCity: null,
        borrowerSpouseCertificateType: null,
        borrowerSpouseCertificateNumber: null,
        ownerName: null,
        ownerPhone: null,
        ownerIdCard: null,
        ownerSpouseName: null,
        ownerSpousePhone: null,
        ownerSpouseIdCard: null,
        guarantorName: null,
        guarantorPhone: null,
        guarantorIdCard: null,
        guarantorCompany: null,
        houseAddress: null,
        houseCertificateNumber: null,
        houseLandCertificateNumber: null,
        houseAffiliation: null,
        houseBuiltTime: null,
        houseType: null,
        houseArea: null,
        houseLandType: null,
        loanBank: null,
        evaluationCompany: null,
        houseTransactionPrice: null,
        houseEvaluatePrice: null,
        loanAmount: null,
        loanPeriod: null,
        guaranteeType: null,
        payType: null,
        loanType: null,
        downPayAmount: null,
        downPayType: null,
        isDealReal: null,
        isClientSituationReal: null,
        sellerHandle: null,
        remark: null
      },
      rules: {
        finishTime: [{ required: true, message: '完成时间不能为空' }],
        borrowerName: [{ required: true, message: '姓名不能为空' }],
        borrowerPhone: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误' }
        ],
        borrowerCompany: [{ required: true, message: '工作单位不能为空' }],
        borrowerCompanyPhone: [{ required: true, message: '单位电话不能为空' }],
        borrowerSalary: [
          { required: true, message: '月均不能为空' },
          { type: 'number', message: '月均收入必须为数字值' }
        ],
        borrowerAddress: [{ required: true, message: '联系地址不能为空' }],
        borrowerResidentCity: [{ required: true, message: '户口所在地不能为空' }],
        borrowerCertificateType: [{ required: true, message: '请选择证件类型' }],
        borrowerCertificateNumber: [
          { required: true, message: '证件号码不能为空' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '证件号码格式错误' }
        ],
        borrowerSpouseName: [{ required: true, message: '姓名不能为空' }],
        borrowerSpousePhone: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误' }
        ],
        borrowerSpouseCompany: [{ required: true, message: '工作单位不能为空' }],
        borrowerSpouseCompanyPhone: [{ required: true, message: '单位电话不能为空' }],
        borrowerSpouseResidentCity: [{ required: true, message: '户口所在地不能为空' }],
        borrowerSpouseCertificateType: [{ required: true, message: '请选择证件类型' }],
        borrowerSpouseCertificateNumber: [
          { required: true, message: '证件号码不能为空' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '证件号码格式错误' }
        ],
        ownerName: [{ required: true, message: '姓名不能为空' }],
        ownerPhone: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误' }
        ],
        ownerIdCard: [
          { required: true, message: '身份证号不能为空' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '证件号码格式错误' }
        ],
        ownerSpouseName: [{ required: true, message: '姓名不能为空' }],
        ownerSpousePhone: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误' }
        ],
        ownerSpouseIdCard: [
          { required: true, message: '身份证号不能为空' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '证件号码格式错误' }
        ],
        guarantorName: [{ required: true, message: '姓名不能为空' }],
        guarantorPhone: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误' }
        ],
        guarantorIdCard: [
          { required: true, message: '身份证号不能为空' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '证件号码格式错误' }
        ],
        guarantorCompany: [{ required: true, message: '工作单位不能为空' }],
        houseAddress: [{ required: true, message: '房屋地址不能为空' }],
        houseCertificateNumber: [{ required: true, message: '房产证号不能为空' }],
        houseLandCertificateNumber: [{ required: true, message: '土地证号不能为空' }],
        houseAffiliation: [{ required: true, message: '房屋所属区局不能为空' }],
        houseBuiltTime: [{ required: true, message: '建成年份不能为空' }],
        houseType: [{ required: true, message: '请选择房屋类型' }],
        houseArea: [
          { required: true, message: '房屋建筑面积不能为空' },
          { type: 'number', message: '房屋建筑面积必须为数字值' }
        ],
        houseLandType: [{ required: true, message: '请选择土地属性' }],
        loanBank: [{ required: true, message: '贷款银行不能为空' }],
        evaluationCompany: [{ required: true, message: '评估公司不能为空' }],
        houseTransactionPrice: [
          { required: true, message: '成交价不能为空' },
          { type: 'number', message: '成交价必须为数字值' }
        ],
        houseEvaluatePrice: [
          { required: true, message: '评估值不能为空' },
          { type: 'number', message: '评估值必须为数字值' }
        ],
        loanAmount: [
          { required: true, message: '贷款金额不能为空' },
          { type: 'number', message: '贷款金额必须为数字值' }
        ],
        loanPeriod: [
          { required: true, message: '贷款期限不能为空' },
          { type: 'number', message: '贷款期限必须为数字值' }
        ],
        guaranteeType: [{ required: true, message: '担保方式不能为空' }],
        payType: [{ required: true, message: '请选择还款方式' }],
        loanType: [{ required: true, message: '请选择贷款类型' }],
        downPayAmount: [{ required: true, message: '首付款交付金额不能为空' }],
        downPayType: [{ required: true, message: '首付款交付方式不能为空' }],
        isDealReal: [{ required: true, message: '请选择成交情况' }],
        isClientSituationReal: [{ required: true, message: '请选择客户情况' }],
        sellerHandle: [{ required: true, message: '请选择存折办理' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '',
      nextPath: '/house/visa-interview',
      cardType: {
        key: 'mortgagechecklistcardtype',
        value: []
      },
      houseType: {
        key: 'sechandregisterlisthousetype',
        value: []
      },
      landType: {
        key: 'sechandregisterlistlandproperty',
        value: []
      },
      payType: {
        key: 'sechandregisterlistrepaymentmethod',
        value: []
      },
      loanType: {
        key: 'sechandregisterlistloanmethod',
        value: []
      },
      sellerHandle: {
        key: 'sechandregisterlistpassbooktrans',
        value: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    submitForm () {
      this.$refs['checklistForm'].validate((valid) => {
        if (valid) {
          this.$confirm('请确认客户交接表填写无误，是否提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'info',
              message: '正在处理...'
            })
            this.formLoading = true
            createTask(this.userId).then(data => {
              if (data) {
                const checklistId = data.id
                this.loanLastStatus = data.des
                saveChecklist(checklistId, this.checklistForm).then(data => {
                  // 关闭所有消息
                  this.$message.closeAll()
                  this.formLoading = false
                  if (data) {
                    this.loanId = data.rootId
                    this.loanStatus = data.des
                    this.dialogVisible = true
                  } else {
                    this.$message({
                      type: 'error',
                      message: '客户交接表保存失败'
                    })
                  }
                })
              } else {
                this.$message.closeAll()
                this.formLoading = false
                this.$message({
                  type: 'error',
                  message: '任务创建失败'
                })
              }
            })
          }).catch(() => {})
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getStaticIndex (staticIndex) {
      getStaticIndexByKey(staticIndex.key).then(data => {
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
  },
  created () {
    this.getStaticIndex(this.cardType)
    this.getStaticIndex(this.houseType)
    this.getStaticIndex(this.landType)
    this.getStaticIndex(this.payType)
    this.getStaticIndex(this.loanType)
    this.getStaticIndex(this.sellerHandle)
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    h3 {
      text-align: center;
    }
  }
  .el-dialog {
    .el-icon-success {
      color: #67C23A;
      font-size: 22px;
      margin-right: 5px;
      vertical-align: middle;
    }
    a {
      color: blue;
    }
  }
</style>
