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
            <el-input clearable v-model="checklistForm.borrowerSalary"><template slot="append">元</template></el-input>
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
              <el-option label="身份证" value="1"></el-option>
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
            <el-input clearable v-model="checklistForm.houseTransactionPrice"><template slot="append">万元</template></el-input>
          </el-form-item>
          <el-form-item label="房屋评估价" prop="houseEvaluatePrice">
            <el-input clearable v-model="checklistForm.houseEvaluatePrice"><template slot="append">万元</template></el-input>
          </el-form-item>
          <el-form-item label="贷款金额" prop="loanAmount">
            <el-input clearable v-model="checklistForm.loanAmount"><template slot="append">万元</template></el-input>
          </el-form-item>
          <el-form-item label="贷款年限" prop="loanPeriod">
            <el-input clearable v-model="checklistForm.loanPeriod"><template slot="append">年</template></el-input>
          </el-form-item>
          <el-form-item label="担保方式" prop="guaranteeType">
            <el-select placeholder="请选择" v-model="checklistForm.guaranteeType">
              <el-option label="方式1" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="还款方式" prop="payType">
            <el-select placeholder="请选择" v-model="checklistForm.payType">
              <el-option label="等额本息" value="1"></el-option>
              <el-option label="等额本金" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="贷款类型" prop="loanType">
            <el-select placeholder="请选择" v-model="checklistForm.loanType">
              <el-option label="普通按揭" value="1"></el-option>
              <el-option label="组合" value="2"></el-option>
              <el-option label="公积金" value="3"></el-option>
              <el-option label="消费贷款" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首付款金额" prop="downPayAmount">
            <el-input clearable v-model="checklistForm.downPayAmount"><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="首付款交付方式" prop="downPayType">
            <el-select placeholder="请选择" v-model="checklistForm.downPayType">
              <el-option label="方式1" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成交是否真实" prop="isDealReal">
            <el-radio-group v-model="checklistForm.isDealReal">
              <el-radio :label="1" >是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="客户情况是否真实" prop="isClientSituationReal">
            <el-radio-group v-model="checklistForm.isClientSituationReal">
              <el-radio :label="1" >是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="卖方存折办理" prop="sellerHandle">
            <el-select placeholder="请选择" v-model="checklistForm.sellerHandle">
              <el-option label="签约办理" value="1"></el-option>
              <el-option label="签约后办理" value="2"></el-option>
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
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房屋建筑面积" prop="houseArea">
            <el-input clearable v-model="checklistForm.houseArea"><template slot="append">平米</template></el-input>
          </el-form-item>
          <el-form-item label="土地属性" prop="houseLandType">
            <el-select placeholder="请选择" v-model="checklistForm.houseLandType">
              <el-option label="划拨" value="1"></el-option>
              <el-option label="出让" value="2"></el-option>
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
        borrowerAddress: null,
        borrowerCertificateNumber: null,
        borrowerCertificateType: null,
        borrowerCompany: null,
        borrowerCompanyPhone: null,
        borrowerName: null,
        borrowerPhone: null,
        borrowerResidentCity: null,
        borrowerSalary: null,
        borrowerSpouseCertificateNumber: null,
        borrowerSpouseCertificateType: null,
        borrowerSpouseCompany: null,
        borrowerSpouseCompanyPhone: null,
        borrowerSpouseName: null,
        borrowerSpousePhone: null,
        borrowerSpouseResidentCity: null,
        downPayAmount: null,
        downPayType: null,
        evaluationCompany: null,
        finishTime: null,
        guaranteeType: null,
        guarantorCompany: null,
        guarantorIdCard: null,
        guarantorName: null,
        guarantorPhone: null,
        houseAddress: null,
        houseAffiliation: null,
        houseArea: null,
        houseBuiltTime: null,
        houseCertificateNumber: null,
        houseEvaluatePrice: null,
        houseLandCertificateNumber: null,
        houseLandType: null,
        houseTransactionPrice: null,
        houseType: null,
        isClientSituationReal: null,
        isDealReal: null,
        loanAmount: null,
        loanBank: null,
        loanPeriod: null,
        loanType: null,
        ownerIdCard: null,
        ownerName: null,
        ownerPhone: null,
        ownerSpouseIdCard: null,
        ownerSpouseName: null,
        ownerSpousePhone: null,
        payType: null,
        remark: null,
        sellerHandle: null
      },
      rules: {
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
      workType: {
        key: 'mortgagechecklistworktype',
        value: []
      },
      loanType: {
        key: 'mortgagechecklistloantype',
        value: []
      },
      listSource: {
        key: 'mortgagechecklistsource',
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
    // this.getStaticIndex(this.cardType)
    // this.getStaticIndex(this.workType)
    // this.getStaticIndex(this.loanType)
    // this.getStaticIndex(this.listSource)
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
