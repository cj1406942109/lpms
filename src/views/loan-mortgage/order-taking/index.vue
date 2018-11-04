<template>
  <div class="app-container">
    <h2>客户交接表</h2>
    <el-form :model="clientForm" :rules="rules" ref="clientForm" label-width="200px">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="完成时间" prop="finish_time">
            <el-date-picker type="date" placeholder="选择日期" v-model="clientForm.finish_time" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="客户姓名" prop="client_name">
            <el-input clearable v-model="clientForm.client_name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="client_phone">
            <el-input clearable v-model="clientForm.client_phone" placeholder="请填写手机号"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="client_id_type">
            <el-select v-model="clientForm.client_id_type" placeholder="请选择证件类型">
              <el-option v-for="item in cardType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="client_id_number">
            <el-input clearable v-model="clientForm.client_id_number"></el-input>
          </el-form-item>
          <el-form-item label="工作种类" prop="client_work_type">
            <el-select v-model="clientForm.client_work_type" placeholder="请选择工作种类">
              <el-option v-for="item in workType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作单位" prop="client_work_unit">
            <el-input clearable v-model="clientForm.client_work_unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label=" ">
            <el-button @click.prevent="addHouseProperty" type="primary">添加房产信息</el-button>
          </el-form-item>
          <div v-for="(item, index) in clientForm.mortgageHouses" :key="item.id" class="house-info">
            <el-form-item :label="'房产' + (index + 1) + '：'" style="font-weight:bold"><el-button @click.prevent="removeHouseProperty(item)" type="danger">删除</el-button></el-form-item>
            <el-form-item label="面积（性质）" :prop="'mortgageHouses.' + index + '.area'" :rules="[{ required: true, message: '面积不能为空' }, { type: 'number', message: '面积必须为数字值' }]">
              <el-input clearable v-model.number="item.area"><template slot="append">平米</template></el-input>
            </el-form-item>
            <el-form-item label="询价结果" :prop="'mortgageHouses.' + index + '.enquiry_result'" :rules="[{ required: true, message: '询价结果不能为空' }, { type: 'number', message: '询价结果必须为数字值' }]">
              <el-input clearable v-model.number="item.enquiry_result"><template slot="append">元/平米</template></el-input>
            </el-form-item>
            <el-form-item label="总价" :prop="'mortgageHouses.' + index + '.total_price'" :rules="[{ required: true, message: '总价不能为空' }, { type: 'integer', message: '总价必须为整数值' }]">
              <el-input clearable v-model.number="item.total_price"><template slot="append">元</template></el-input>
            </el-form-item>
          </div>
          <el-form-item label=" ">
            <el-alert title="如没有房产，请点击删除按钮" type="warning" style="height:35px;"></el-alert>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="10">
          <el-form-item label="单子来源渠道" prop="checklist_source">
            <el-select v-model="clientForm.checklist_source" placeholder="请选择来源渠道">
              <el-option v-for="item in listSource.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="中介名称" prop="agent_name">
            <el-input clearable v-model="clientForm.agent_name"></el-input>
          </el-form-item>
          <el-form-item label="其他备注事项" prop="remark">
            <el-input clearable type="textarea" v-model="clientForm.remark" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="借款品种" prop="loan_type">
            <el-select v-model="clientForm.loan_type" placeholder="请选择借款品种">
              <el-option v-for="item in loanType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请贷款金额" prop="loan_amount">
            <el-input clearable v-model.number="clientForm.loan_amount"><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="申请贷款期限" prop="loan_period">
            <el-input clearable v-model.number="clientForm.loan_period"><template slot="append">月</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
import { getStaticIndexByKey, saveCheckList } from '@/api/mortgage'

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
        loan_amount: null,
        loan_period: null,
        mortgageHouses: [{
          area: null,
          enquiry_result: null,
          total_price: null
        }],
        checklist_source: '',
        agent_name: '',
        remark: ''
      },
      rules: {
        client_name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        client_phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        client_id_number: [
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '证件号码格式错误', trigger: 'blur' }
        ],
        loan_amount: [
          { type: 'integer', message: '贷款金额必须为整数值' }
        ],
        loan_period: [
          { type: 'integer', message: '贷款期限必须为整数值' }
        ]
      },
      formLoading: false,
      dialogVisible: false,
      loanNum: '', // 贷款编号
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
      'user_id'
    ])
  },
  methods: {
    removeHouseProperty (house) {
      const index = this.clientForm.mortgageHouses.indexOf(house)
      if (index !== -1) {
        this.$confirm('是否清除该条房产信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.clientForm.mortgageHouses.splice(index, 1)
        }).catch(() => {})
      }
    },
    addHouseProperty () {
      this.clientForm.mortgageHouses.push({
        area: null,
        enquiry_result: null,
        total_price: null
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
            saveCheckList(JSON.stringify(this.clientForm), this.user_id).then(response => {
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
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    checkStatus () {
      // 根据贷款编号查询状态
      this.dialogVisible = false
      this.$msgbox.close()
      this.$router.push({ path: `/loan/order/status/${this.loanNum}` })
    },
    nextOperation () {
      this.dialogVisible = false
      this.$router.push({ path: '/loan-mortgage/interview' })
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
    this.getStaticIndex(this.cardType)
    this.getStaticIndex(this.workType)
    this.getStaticIndex(this.loanType)
    this.getStaticIndex(this.listSource)
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
