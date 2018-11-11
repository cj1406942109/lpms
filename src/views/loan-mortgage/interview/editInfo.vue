<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>面谈建议</h2>
      <div>
        <el-form :model="interviewSuggestionForm" ref="interviewSuggestionForm" label-width="200px" :rules="rules">
          <el-row>
            <el-col :span="10">
              <el-form-item label="完成时间" prop="finishTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="interviewSuggestionForm.finishTime" value-format="timestamp"></el-date-picker>
              </el-form-item>
              <el-form-item label="拟申请机构" prop="proposedInstitution">
                <el-input clearable v-model="interviewSuggestionForm.proposedInstitution"></el-input>
              </el-form-item>
              <el-form-item label="拟签约时间" prop="proposedTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="interviewSuggestionForm.proposedTime" value-format="timestamp"></el-date-picker>
              </el-form-item>
              <el-form-item label="拟对接人" prop="proposedClerk">
                <el-input clearable v-model="interviewSuggestionForm.proposedClerk"></el-input>
              </el-form-item>
              <el-form-item label="拟上报金额" prop="proposedAmount">
                <el-input clearable v-model.number="interviewSuggestionForm.proposedAmount" type="number"><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="费率" prop="rate">
                <el-input clearable v-model.number="interviewSuggestionForm.rate" type="number" max="100"><template slot="append">%</template></el-input>
              </el-form-item>
              <el-form-item label="客户还款方式" prop="repaymentType">
                <el-select v-model="interviewSuggestionForm.repaymentType" placeholder="请选择">
                  <el-option v-for="item in repaymentMethod.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客户用途" prop="clientPurposeType">
                <el-select v-model="interviewSuggestionForm.clientPurposeType" placeholder="请选择">
                  <el-option v-for="item in purpose.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" prop="clientPurpose">
                <el-input clearable v-model="interviewSuggestionForm.clientPurpose" style="width:auto"></el-input>
              </el-form-item>
              <el-form-item label="调查意见" prop="surveyOpinion">
                <el-input clearable type="textarea" v-model="interviewSuggestionForm.surveyOpinion" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label=" ">
            <el-button type="primary" @click="submitForm('interviewSuggestionForm')" :loading="formLoading">提交</el-button>
            <el-button @click="resetForm('interviewSuggestionForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
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
import { getStaticIndexByKey, saveView } from '@/api/mortgage'
export default {
  data () {
    return {
      // 面谈建议表
      interviewSuggestionForm: {
        finishTime: null,
        proposedInstitution: null,
        proposedClerk: null,
        proposedAmount: null,
        proposedTime: null,
        rate: null,
        repaymentType: null,
        clientPurposeType: null,
        clientPurpose: null,
        surveyOpinion: null
      },
      rules: {
        finishTime: [{ required: true, message: '完成时间不能为空' }],
        proposedInstitution: [{ required: true, message: '拟申请机构不能为空' }],
        proposedClerk: [{ required: true, message: '拟对接人不能为空' }],
        proposedAmount: [
          { required: true, message: '拟上报金额不能为空' },
          { type: 'integer', message: '拟上报金额必须为整数值' }
        ],
        proposedTime: [{ required: true, message: '拟签约时间不能为空' }],
        rate: [
          { required: true, message: '费率不能为空' },
          { type: 'number', min: 0, max: 100, message: '费率必须为0到100之间的数字' }
        ],
        repaymentType: [{ required: true, message: '请选择客户还款方式' }],
        clientPurposeType: [{ required: true, message: '请选择客户用途类型' }],
        clientPurpose: [{ required: true, message: '客户用途不能为空' }],
        surveyOpinion: [{ required: true, message: '调查意见不能为空' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/loan-mortgage/interview',
      nextPath: '/loan-mortgage/visa-interview',
      repaymentMethod: {
        key: 'mortgageviewrepaymentmethod',
        value: []
      },
      purpose: {
        key: 'mortgageviewpurpose',
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交面谈建议?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.formLoading = true
            this.$message({
              type: 'info',
              message: '正在处理...'
            })
            saveView(this.interviewSuggestionForm, this.$route.params.id).then(data => {
              this.formLoading = false
              this.$message.closeAll()
              if (data) {
                this.loanId = data.rootId
                this.loanStatus = data.des
                this.dialogVisible = true
              } else {
                this.$message({
                  type: 'error',
                  message: '面谈建议保存失败'
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
    this.loanLastStatus = this.$route.params.des
    this.getStaticIndex(this.repaymentMethod)
    this.getStaticIndex(this.purpose)
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
      padding: 20px;
      background-color: #fff;
      margin-bottom: 20px;
  }
</style>
