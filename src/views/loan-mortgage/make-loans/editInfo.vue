<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>担保函与收费明细</h2>
      <el-form :model="chargeDetailsForm" ref="chargeDetailsForm" label-width="200px" inline>
        <el-form-item label="担保函开具状态" prop="status">
          <el-radio-group v-model="chargeDetailsForm.status"><el-radio :label="1">已开</el-radio><el-radio :label="0">未开</el-radio></el-radio-group>
        </el-form-item>
        <el-form-item label="担保函开具时间">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="chargeDetailsForm.date"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="费用A收费状态" prop="status">
          <el-radio-group v-model="chargeDetailsForm.costA.status"><el-radio :label="1">已收</el-radio><el-radio :label="0">未收</el-radio></el-radio-group>
        </el-form-item>
        <el-form-item label="费用A收费时间">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="chargeDetailsForm.costA.date"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="费用B收费状态" prop="status">
          <el-radio-group v-model="chargeDetailsForm.costB.status"><el-radio :label="1">已收</el-radio><el-radio :label="0">未收</el-radio></el-radio-group>
        </el-form-item>
        <el-form-item label="费用B收费时间">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="chargeDetailsForm.costB.date"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="费用C收费状态" prop="status">
          <el-radio-group v-model="chargeDetailsForm.costC.status"><el-radio :label="1">已收</el-radio><el-radio :label="0">未收</el-radio></el-radio-group>
        </el-form-item>
        <el-form-item label="费用C收费时间">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="chargeDetailsForm.costC.date"></el-date-picker>
        </el-form-item>
        <br>
        <br>
        <el-form-item>
          <el-button type="primary" @click="submitForm('chargeDetailsForm')">提交</el-button>
          <el-button @click="resetForm('chargeDetailsForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper">
      <h2>确定放款状态</h2>
      <el-form :model="makeLoansStatusForm" ref="makeLoansStatusForm" label-width="200px" inline>
        <el-form-item label="放款状态" prop="status">
          <el-radio-group v-model="makeLoansStatusForm.status"><el-radio :label="1">已放款</el-radio><el-radio :label="0">未放款</el-radio></el-radio-group>
        </el-form-item>
        <br>
        <el-form-item label="放款时间">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="makeLoansStatusForm.date"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="finishMakeLoans">放款完成</el-button>
          <el-button @click="resetForm('makeLoansStatusForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign-contract',
  data () {
    return {
      chargeDetailsForm: {
        guaranteeLetter: {
          status: '',
          date: ''
        },
        costA: {
          status: '',
          date: ''
        },
        costB: {
          status: '',
          date: ''
        },
        costC: {
          status: '',
          date: ''
        }
      },
      makeLoansStatusForm: {
        status: '',
        date: ''
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('success')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    finishMakeLoans () {
      this.$confirm('确认23890474编号贷款已放款?', '确认放款', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '放款成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消放款'
        })
      })
    },
    checkStatus () {
      this.$msgbox.close()
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
