<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>确定收费状态</h2>
      <el-form :model="chargeForm" ref="chargeForm" label-width="200px" :rules="chargeFormRules" inline>
         <el-form-item label="费用 A 收费状态" prop="isA">
          <el-radio-group v-model="chargeForm.isA">
            <el-radio label="1">已收</el-radio>
            <el-radio label="0">未收</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="收费 A 收费时间" prop="timeA" v-if="chargeForm.isA == '1'">
          <el-date-picker type="date" placeholder="选择日期" v-model="chargeForm.timeA" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="费用 B 收费状态" prop="isB">
          <el-radio-group v-model="chargeForm.isB">
            <el-radio label="1">已收</el-radio>
            <el-radio label="0">未收</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="收费 B 收费时间" prop="timeB" v-if="chargeForm.isB == '1'">
          <el-date-picker type="date" placeholder="选择日期" v-model="chargeForm.timeB" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="费用 C 收费状态" prop="isC">
          <el-radio-group v-model="chargeForm.isC">
            <el-radio label="1">已收</el-radio>
            <el-radio label="0">未收</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="收费 C 收费时间" prop="timeC" v-if="chargeForm.isC == '1'">
          <el-date-picker type="date" placeholder="选择日期" v-model="chargeForm.timeC" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" :loading="formLoading" @click="confirmCharge">提交</el-button>
        </el-form-item>
      </el-form>
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
import { confirmCharge } from '@/api/house'
export default {
  data () {
    return {
      chargeForm: {
        isA: null,
        timeA: null,
        isB: null,
        timeB: null,
        isC: null,
        timeC: null
      },
      chargeFormRules: {
        isA: [{ required: true, message: '请选择费用A收费状态' }],
        isB: [{ required: true, message: '请选择费用B收费状态' }],
        isC: [{ required: true, message: '请选择费用C收费状态' }],
        timeA: [{ required: true, message: '费用A收费时间不能为空' }],
        timeB: [{ required: true, message: '费用A收费时间不能为空' }],
        timeC: [{ required: true, message: '费用A收费时间不能为空' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '/loan-mortgage/charge',
      nextPath: '/loan-mortgage/make-loans'
    }
  },
  created () {
    this.loanLastStatus = this.$route.params.des
  },
  methods: {
    confirmCharge () {
      this.$refs['chargeForm'].validate((valid) => {
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
            // FIXME: 后台应该做类型转换处理的地方
            this.chargeForm.timeA = this.chargeForm.timeA ? this.chargeForm.timeA : 0
            this.chargeForm.timeB = this.chargeForm.timeB ? this.chargeForm.timeB : 0
            this.chargeForm.timeC = this.chargeForm.timeC ? this.chargeForm.timeC : 0
            confirmCharge(this.$route.params.id, this.chargeForm).then(data => {
              this.$message.closeAll()
              this.formLoading = false
              if (data) {
                this.loanId = data.rootId
                this.loanStatus = data.des
                this.dialogVisible = true
              } else {
                this.$message({
                  type: 'error',
                  message: '确定收费状态失败'
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
