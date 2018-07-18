<template>
  <div class="app-container">
    <div class="form-wrapper">
      <h2>约定签约时间</h2>
      <el-form :model="contractTimeForm" ref="contractTimeForm" label-width="200px" inline>
        <el-form-item label="约定时间" prop="datetime">
          <el-date-picker type="datetime" placeholder="选择日期和时间" v-model="contractTimeForm.datetime" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="约定地点" prop="place">
          <el-select v-model="contractTimeForm.place" placeholder="请选择签约地点">
            <el-option label="地点1" value="1"></el-option>
            <el-option label="地点2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('contractTimeForm')">提交</el-button>
          <el-button @click="resetForm('contractTimeForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-wrapper">
      <h2>确定签约状态</h2>
      <el-form :model="contractTimeForm" ref="contractTimeForm" label-width="200px" inline>
        <el-form-item label="约定时间" prop="datetime">
          <el-date-picker type="datetime" placeholder="选择日期和时间" v-model="contractTimeForm.datetime" readonly></el-date-picker>
        </el-form-item>
        <br>
         <el-form-item label="约定地点" prop="place">
          <el-select v-model="contractTimeForm.place" placeholder="请选择签约地点" readonly>
            <el-option label="地点1" value="1"></el-option>
            <el-option label="地点2" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="contractStatusForm" ref="contractStatusForm" label-width="200px" inline>
        <el-form-item label="签约状态" prop="status">
          <el-radio-group v-model="contractStatusForm.status"><el-radio :label="1">签约完成</el-radio><el-radio :label="0">签约未完成，重新约定时间签约</el-radio></el-radio-group>
        </el-form-item>
        <el-form-item label="未完成原因" prop="failedReason" v-show="contractStatusForm.status === 0">
          <el-input v-model="contractStatusForm.failedReason"></el-input>
        </el-form-item>
        <br>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('contractStatusForm')">提交</el-button>
          <el-button @click="resetForm('contractStatusForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="option">
      <el-button type="primary" @click="finishVisaInterview">完成面签</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign-contract',
  data () {
    return {
      contractTimeForm: {
        datetime: '',
        place: ''
      },
      contractStatusForm: {
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
    finishVisaInterview () {
      const h = this.$createElement
      // h(param1, param2, param3)
      // @param1: 一个 HTML 标签，组件设置，或一个函数 {String | Object | Function}
      //    必须 Return 上述其中一个, 如'div'
      // @param2: {Object}, 一个对应属性的数据对象
      // @param3: 内部节点
      this.$msgbox({
        type: 'success',
        center: true,
        title: '面签完成',
        message: h('p', null, [
          '贷款编号为：',
          h('span', { style: 'color: blue' }, ['145245415']),
          h('br', null, []),
          '目前贷款状态为：',
          h('span', { style: 'color: blue' }, ['正在评估下单（待下单）']),
          h('br', null, []),
          h('el-button', { style: 'margin-top: 20px', on: { click: this.checkStatus }}, '查看贷款状态'),
          h('el-button', { style: 'margin-top: 20px', on: { click: this.returnList }}, '返回面签列表'),
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
      this.$router.push({ path: '/loan-mortgage/visa-interview' })
    },
    nextOperation () {
      this.$msgbox.close()
      this.$router.push({ path: '/loan-mortgage/evaluate-order' })
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
