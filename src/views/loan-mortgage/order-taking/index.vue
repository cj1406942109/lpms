<template>
  <div class="app-container">
    <h2>客户交接表</h2>
    <el-form :model="clientForm" :rules="rules" ref="clientForm" label-width="200px" inline>
      <el-form-item label="完成时间" prop="finish_time">
        <el-date-picker type="date" placeholder="选择日期" v-model="clientForm.finish_time" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <br>
      <el-form-item label="客户姓名" prop="client_name">
        <el-input clearable v-model="clientForm.client_name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="client_phone">
        <el-input clearable v-model="clientForm.client_phone"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="证件类型" prop="client_id_type">
        <el-select v-model="clientForm.client_id_type" placeholder="请选择证件类型">
          <el-option label="身份证" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="client_id_number">
        <el-input clearable v-model="clientForm.client_id_number"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="工作种类" prop="client_work_type">
        <el-select v-model="clientForm.client_work_type" placeholder="请选择工作种类">
          <el-option label="授薪" value="1"></el-option>
          <el-option label="自雇" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作单位" prop="client_work_unit">
        <el-input clearable v-model="clientForm.client_work_unit"></el-input>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="借款品种" prop="loan_type">
        <el-select v-model="clientForm.loan_type" placeholder="请选择借款品种">
          <el-option label="抵押消费" value="1"></el-option>
          <el-option label="抵押经营" value="2"></el-option>
          <el-option label="信用" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请贷款金额" prop="loan_amount">
        <el-input clearable v-model="clientForm.loan_amount"><template slot="append">元</template></el-input>
      </el-form-item>
      <el-form-item label="申请贷款期限" prop="loan_period">
        <el-input clearable v-model="clientForm.loan_period"></el-input>
      </el-form-item>
      <br><br>
      <el-button @click.prevent="addHouseProperty" type="primary" style="margin-left: 50px;">添加房产信息</el-button>
      <br>
      <br>
      <template v-for="(item, index) in clientForm.mortgageHouses">
        <span :key="item.name" style="margin-left: 50px;">房产{{index + 1}}：</span>
        <el-form-item label="面积（性质）" prop="area" :key="item.id">
          <el-input clearable v-model="item.area"></el-input>
        </el-form-item>
        <el-form-item label="询价结果" prop="enquiry_result" :key="item.id">
          <el-input clearable v-model="item.enquiry_result"></el-input>
        </el-form-item>
        <el-form-item label="总价" prop="total_price" :key="item.id">
          <el-input clearable v-model="item.total_price"></el-input>
        </el-form-item>
        <el-button :key="item.name" @click.prevent="removeHouseProperty(item)" type="danger">删除</el-button>
        <br :key="item.name">
      </template>
      <br><br>
      <el-form-item label="单子来源渠道" prop="checklist_source">
        <el-select v-model="clientForm.checklist_source" placeholder="请选择来源渠道">
          <el-option label="存量转贷" value="1"></el-option>
          <el-option label="中介介绍" value="2"></el-option>
          <el-option label="老客户介绍" value="3"></el-option>
          <el-option label="银行介绍" value="4"></el-option>
          <el-option label="同行介绍" value="5"></el-option>
          <el-option label="熟人介绍" value="6"></el-option>
          <el-option label="广告" value="7"></el-option>
          <el-option label="微信" value="8"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="中介名称" prop="agent_name">
        <el-input clearable v-model="clientForm.agent_name"></el-input>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="其他备注事项" prop="remark">
        <el-input clearable type="textarea" v-model="clientForm.remark" :autosize="{ minRows: 4, maxRows: 6}" style="width:500px;"></el-input>
      </el-form-item>
      <br>
      <br>
      <el-form-item label=" ">
        <el-button type="primary" :loading="formLoading" @click="submitForm('clientForm')">提交</el-button>
        <el-button @click="resetForm('clientForm')">重置</el-button>
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
</template>

<script>
import { mapGetters } from 'vuex'
import { saveCheckList } from '@/api/mortgage'

export default {
  name: 'order-taking',
  data () {
    return {
      clientForm: {
        finish_time: '',
        client_name: '',
        client_phone: '',
        client_id_type: '',
        client_id_number: '',
        client_work_type: '',
        client_work_unit: '',
        loan_type: '',
        loan_amount: '',
        loan_period: '',
        mortgageHouses: [{
          checklist_id: '',
          area: '',
          enquiry_result: '',
          total_price: ''
        }],
        checklist_source: '',
        agent_name: '',
        remark: ''
      },
      rules: {},
      formLoading: false,
      dialogVisible: false,
      loanNum: '' // 贷款编号
    }
  },
  computed: {
    ...mapGetters([
      'account'
    ])
  },
  methods: {
    removeHouseProperty (house) {
      const index = this.clientForm.mortgageHouses.indexOf(house)
      if (index !== -1) {
        this.clientForm.mortgageHouses.splice(index, 1)
      }
    },
    addHouseProperty () {
      this.clientForm.mortgageHouses.push({
        // checklist_id: '',
        area: '',
        enquiry_result: '',
        total_price: ''
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
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
            saveCheckList(JSON.stringify(this.clientForm), this.account.id).then(response => {
              this.formLoading = false
              if (response.data.status === 1) {
                this.loanNum = response.data.data
                this.dialogVisible = true
                // const h = this.$createElement
                // h(param1, param2, param3)
                // @param1: 一个 HTML 标签，组件设置，或一个函数 {String | Object | Function}
                //    必须 Return 上述其中一个, 如'div'
                // @param2: {Object}, 一个对应属性的数据对象
                // @param3: 内部节点
                // this.$msgbox({
                //   type: 'success',
                //   center: true,
                //   title: '接单成功',
                //   message: h('p', null, [
                //     '贷款编号为：',
                //     h('span', { style: 'color: blue' }, [response.data.data]),
                //     h('br', null, []),
                //     '目前贷款状态为：',
                //     h('span', { style: 'color: blue' }, ['正在面谈（等待填写面谈相关表格）']),
                //     h('br', null, []),
                //     h('el-button', { style: 'margin-top: 20px', on: { click: this.checkStatus(response.data.data) }}, '查看贷款状态'),
                //     h('el-button', { style: 'margin-top: 20px', attrs: { type: 'primary' }, on: { click: this.nextOperation }}, '办理下一业务')
                //   ]),
                //   showConfirmButton: false
                // })
              } else {
                this.$message({
                  showClose: true,
                  message: '保存失败，请稍候重试！',
                  type: 'error'
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    checkStatus () {
      // 根据贷款编号查询状态
      this.dialogVisible = false
      this.$msgbox.close()
    },
    nextOperation () {
      this.dialogVisible = false
      this.$router.push({ path: '/loan-mortgage/interview' })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
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
