<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>确定收费状态</h2>
      <el-form :model="chargeForm" ref="chargeForm" label-width="200px" inline>
        <el-form-item label="收费时间" prop="datetime">
          <el-date-picker type="date" placeholder="选择日期" v-model="chargeForm.time" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="confirmCharge">提交</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="dialogVisible" width="30%" center>
        <div slot="title"><i class="el-icon-success" style="color:#67C23A;font-size:22px;vertical-align:middle;margin-right:5px;"></i>接单成功</div>
        <div>贷款编号为：<a style="color:blue">{{loanNum}}</a></div>
        <div>贷款状态为：<a style="color:blue">正在面谈（等待填写面谈相关表格）</a></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="checkStatus">查看贷款状态</el-button>
          <el-button type="primary" @click="nextOperation">办理下一业务</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { confirmCharge } from '@/api/mortgage'
export default {
  name: 'sign-contract',
  data () {
    return {
      chargeForm: {
        time: null
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
    confirmCharge () {
      confirmCharge(this.chargeForm.time, this.$route.params.taskId).then(response => {
        console.log(response)
        if (response.data.status) {
          this.loanNum = response.data.data
          this.dialogVisible = true
          this.$message({
            type: 'success',
            message: '确定收费状态成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '确定收费状态失败，请稍候重试'
          })
        }
      })
    },
    checkStatus () {
      this.$msgbox.close()
      this.$router.push({ path: `/loan/order/status/${this.loanNum}` })
    },
    returnList () {
      this.$msgbox.close()
      this.$router.push({ path: '/loan-mortgage/mortgage' })
    },
    nextOperation () {
      this.$msgbox.close()
      this.$router.push({ path: '/loan-mortgage/make-loans' })
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
