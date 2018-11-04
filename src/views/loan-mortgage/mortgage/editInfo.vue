<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>抵押进度</h2>
      <el-steps :active="activeStep" align-center finish-status="success">
        <el-step title="确定抵押状态"></el-step>
        <el-step title="担保流程"></el-step>
      </el-steps>
      <div class="form-wrapper" v-if="activeStep==0">
        <h3>确定抵押状态</h3>
        <el-form :model="mortgageStatusForm" ref="mortgageStatusForm" label-width="200px" inline>
          <el-form-item label="完成时间" prop="datetime">
            <el-date-picker type="date" placeholder="选择日期" v-model="mortgageStatusForm.time" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="confirmMortgage">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-wrapper" v-if="activeStep==1">
        <h3>担保流程</h3>
        <el-form :model="guaranteeForm" ref="guaranteeForm" label-width="200px" inline>
          <el-form-item label="是否需要盖章">
            <el-radio-group v-model="guaranteeForm.needStamp">
              <el-radio :label="true" >是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="盖章通过时间" v-if="guaranteeForm.needStamp">
            <el-date-picker type="date" placeholder="选择日期" v-model="guaranteeForm.stampTime" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="出担保函时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="guaranteeForm.guaranteeTime" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="guaranteeFlow">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="30%" center>
        <div slot="title"><i class="el-icon-success" style="color:#67C23A;font-size:22px;vertical-align:middle;margin-right:5px;"></i>抵押成功</div>
        <div>贷款编号为：<a style="color:blue">{{loanNum}}</a></div>
        <div>贷款状态为：<a style="color:blue">正在收费（等待填写收费相关表格）</a></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="checkStatus">查看贷款状态</el-button>
          <el-button @click="returnList">返回面谈列表</el-button>
          <el-button type="primary" @click="nextOperation">办理下一业务</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { confirmMortgage, guaranteeFlow } from '@/api/mortgage'
export default {
  name: 'sign-contract',
  data () {
    return {
      activeStep: 0,
      mortgageStatusForm: {
        time: null
      },
      guaranteeForm: {
        needStamp: null,
        stampTime: null,
        guaranteeTime: null
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      dialogVisible: false,
      loanNum: ''
    }
  },
  methods: {
    confirmMortgage () {
      confirmMortgage(this.mortgageStatusForm.time, this.$route.params.taskId).then(response => {
        console.log(response)
        if (response.data.status) {
          this.$message({
            type: 'success',
            message: '确定抵押状态成功'
          })
          this.activeStep++
        } else {
          this.$message({
            type: 'error',
            message: '确定抵押状态失败，请稍候重试'
          })
        }
      })
    },
    guaranteeFlow () {
      guaranteeFlow(this.guaranteeForm.needStamp, this.guaranteeForm.stampTime, this.guaranteeForm.guaranteeTime, this.$route.params.taskId).then(response => {
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
    },
    checkStatus () {
      this.dialogVisible = false
      this.$router.push({ path: `/loan/order/status/${this.loanNum}` })
    },
    returnList () {
      this.dialogVisible = false
      this.$router.push({ path: '/loan-mortgage/mortgage' })
    },
    nextOperation () {
      this.dialogVisible = false
      this.$router.push({ path: '/loan-mortgage/charge' })
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
