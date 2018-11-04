<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>面谈建议</h2>
      <div>
        <el-form :model="interviewSuggestionForm" ref="interviewSuggestionForm" label-width="200px" :rules="rules">
          <el-row>
            <el-col :span="10">
              <el-form-item label="完成时间" prop="finish_time">
                <el-date-picker type="date" placeholder="选择日期" v-model="interviewSuggestionForm.finish_time" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="拟申请机构" prop="proposed_institution">
                <el-input clearable v-model="interviewSuggestionForm.proposed_institution"></el-input>
              </el-form-item>
              <el-form-item label="拟签约时间" prop="proposed_time">
                <el-date-picker type="date" placeholder="选择日期" v-model="interviewSuggestionForm.proposed_time" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="拟对接人" prop="proposed_clerk">
                <el-input clearable v-model="interviewSuggestionForm.proposed_clerk"></el-input>
              </el-form-item>
              <el-form-item label="拟上报金额" prop="proposed_amount">
                <el-input clearable v-model.number="interviewSuggestionForm.proposed_amount"><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="费率" prop="rate">
                <el-input clearable v-model.number="interviewSuggestionForm.rate"><template slot="append">%</template></el-input>
              </el-form-item>
              <el-form-item label="客户还款方式" prop="repayment_type">
                <el-select v-model="interviewSuggestionForm.repayment_type" placeholder="请选择还款方式">
                  <el-option v-for="item in repaymentMethod.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客户用途">
                <el-select v-model="interviewSuggestionForm.client_purpose_type" placeholder="请选择方式">
                  <el-option v-for="item in purpose.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
                </el-select>
                <el-input clearable v-model="interviewSuggestionForm.client_purpose">
                </el-input>
              </el-form-item>
              <el-form-item label="调查意见" prop="survey_opinion">
                <el-input clearable type="textarea" v-model="interviewSuggestionForm.survey_opinion" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
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
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <div slot="title"><i class="el-icon-success" style="color:#67C23A;font-size:22px;vertical-align:middle;margin-right:5px;"></i>接单成功</div>
      <div>贷款编号为：<a style="color:blue">{{loanNum}}</a></div>
      <div>贷款状态为：<a style="color:blue">正在面签（等待填写面签相关信息）</a></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkStatus">查看贷款状态</el-button>
        <el-button @click="returnList">返回面谈列表</el-button>
        <el-button type="primary" @click="nextOperation">办理下一业务</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStaticIndexByKey, saveInterviewSuggestion } from '@/api/mortgage'
export default {
  data () {
    return {
      // 面谈建议表
      interviewSuggestionForm: {
        finish_time: '',
        proposed_institution: '',
        proposed_clerk: '',
        proposed_amount: '',
        proposed_time: '',
        rate: '',
        repayment_type: '',
        client_purpose_type: '',
        client_purpose: '',
        survey_opinion: ''
      },
      rules: {
        proposed_amount: [
          { type: 'integer', message: '拟上报金额必须为整数值' }
        ],
        rate: [
          { type: 'number', message: '费率必须为数字值' }
        ]
      },
      loanNum: '',
      dialogVisible: false,
      formLoading: false,
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
      'user_id'
    ])
  },
  methods: {
    checkStatus () {
      this.$msgbox.close()
      this.$router.push({ path: `/loan/order/status/${this.loanNum}` })
    },
    returnList () {
      this.$msgbox.close()
      this.$router.push({ path: '/loan-mortgage/interview' })
    },
    nextOperation () {
      this.$msgbox.close()
      this.$router.push({ path: '/loan-mortgage/visa-interview' })
    },
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
            saveInterviewSuggestion(JSON.stringify(this.interviewSuggestionForm), this.$route.params.taskId, this.user_id).then(response => {
              this.formLoading = false
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getStaticIndex (staticIndex) {
      getStaticIndexByKey(staticIndex.key).then(response => {
        if (response.data.status) {
          staticIndex.value = response.data.data[staticIndex.key]
        } else {
          this.$message({
            showClose: true,
            message: '获取静态索引失败，请检查网络！',
            type: 'error'
          })
        }
      })
    }
  },
  created () {
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
      .el-input {
        width: auto;
      }
  }
</style>

