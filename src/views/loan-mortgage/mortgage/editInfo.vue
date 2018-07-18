<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>确定抵押时间</h2>
      <span style="margin-left:100px;">请尽快与银行确定抵押时间，若已确定好，请告诉客户并在下方输入确定的抵押时间。</span><br><br>
      <el-form :model="mortgageTimeForm" ref="mortgageTimeForm" label-width="200px" inline>
        <el-form-item label="约定时间" prop="datetime">
          <el-date-picker type="datetime" placeholder="选择日期和时间" v-model="mortgageTimeForm.date"></el-date-picker>
        </el-form-item>
        <br>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('mortgageTimeForm')">提交</el-button>
          <el-button @click="resetForm('mortgageTimeForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper">
      <h2>确定抵押状态</h2>
      <el-form :model="mortgageStatusForm" ref="mortgageStatusForm" label-width="200px" inline>
        <el-form-item label="签约状态" prop="status">
          <el-radio-group v-model="mortgageStatusForm.status"><el-radio :label="1">签约完成</el-radio><el-radio :label="0">因事未完成，重新约定时间抵押</el-radio></el-radio-group>
        </el-form-item>
        <el-form-item label="未完成原因" prop="failedReason" v-show="mortgageStatusForm.status === 0">
          <el-select v-model="mortgageStatusForm.failedReason" placeholder="请选择原因">
            <el-option label="原因1" value="1"></el-option>
            <el-option label="其他" value="2"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="finishMortgage">提交</el-button>
          <el-button @click="resetForm('mortgageStatusForm')">重置</el-button>
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
      mortgageTimeForm: {
        date: ''
      },
      mortgageStatusForm: {
        status: '',
        failedReason: ''
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
    finishMortgage () {
      const h = this.$createElement
      // h(param1, param2, param3)
      // @param1: 一个 HTML 标签，组件设置，或一个函数 {String | Object | Function}
      //    必须 Return 上述其中一个, 如'div'
      // @param2: {Object}, 一个对应属性的数据对象
      // @param3: 内部节点
      this.$msgbox({
        type: 'success',
        center: true,
        title: '抵押完成',
        message: h('p', null, [
          '贷款编号为：',
          h('span', { style: 'color: blue' }, ['145245415']),
          h('br', null, []),
          '目前贷款状态为：',
          h('span', { style: 'color: blue' }, ['正在放款']),
          h('br', null, []),
          h('el-button', { style: 'margin-top: 20px', on: { click: this.checkStatus }}, '查看贷款状态'),
          h('el-button', { style: 'margin-top: 20px', on: { click: this.returnList }}, '返回抵押列表'),
          h('el-button', { style: 'margin-top: 20px', attrs: { type: 'primary' }, on: { click: this.nextOperation }}, '办理下一业务')
        ]),
        showConfirmButton: false
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
