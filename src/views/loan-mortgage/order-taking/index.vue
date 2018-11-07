<template>
  <div class="app-container">
    <h2>客户交接表</h2>
    <el-form :model="checklistForm" :rules="rules" ref="checklistForm" label-width="200px">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="完成时间" prop="datetime">
            <el-date-picker type="date" placeholder="选择日期" v-model="checklistForm.datetime" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="客户姓名" prop="clientName">
            <el-input clearable v-model="checklistForm.clientName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="clientPhone">
            <el-input clearable v-model="checklistForm.clientPhone" placeholder="请填写手机号"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="clientIdType">
            <el-select v-model="checklistForm.clientIdType" placeholder="请选择证件类型">
              <el-option v-for="item in cardType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="clientIdNumber">
            <el-input clearable v-model="checklistForm.clientIdNumber"></el-input>
          </el-form-item>
          <el-form-item label="工作种类" prop="clientWorkType">
            <el-select v-model="checklistForm.clientWorkType" placeholder="请选择工作种类">
              <el-option v-for="item in workType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作单位" prop="clientWorkUnit">
            <el-input clearable v-model="checklistForm.clientWorkUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label=" ">
            <el-button @click.prevent="addHouseProperty" type="primary">添加房产信息</el-button>
          </el-form-item>
          <div v-for="(item, index) in checklistForm.mortgageHouses" :key="item.id" class="house-info">
            <el-form-item :label="'房产' + (index + 1) + '：'" style="font-weight:bold"><el-button @click.prevent="removeHouseProperty(item)" type="danger">删除</el-button></el-form-item>
            <el-form-item label="面积（性质）" :prop="'mortgageHouses.' + index + '.area'" :rules="[{ required: true, message: '面积不能为空' }, { type: 'number', message: '面积必须为数字值' }]">
              <el-input clearable v-model.number="item.area" type="number" @input="calcTotalPrice(item.area, item.enquiryResult, index)"><template slot="append">平米</template></el-input>
            </el-form-item>
            <el-form-item label="询价结果" :prop="'mortgageHouses.' + index + '.enquiryResult'" :rules="[{ required: true, message: '询价结果不能为空' }, { type: 'number', message: '询价结果必须为数字值' }]">
              <el-input clearable v-model.number="item.enquiryResult" type="number" @input="calcTotalPrice(item.area, item.enquiryResult, index)"><template slot="append">元/平米</template></el-input>
            </el-form-item>
            <el-form-item label="总价" :prop="'mortgageHouses.' + index + '.totalPrice'">
              <el-input v-model.number="item.totalPrice" type="number" readonly><template slot="append">元</template></el-input>
            </el-form-item>
          </div>
          <el-form-item label=" ">
            <el-alert title="如没有房产，请点击删除按钮" type="warning" style="height:35px;"></el-alert>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="10">
          <el-form-item label="单子来源渠道" prop="checklistSource">
            <el-select v-model="checklistForm.checklistSource" placeholder="请选择来源渠道">
              <el-option v-for="item in listSource.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="中介名称" prop="agentName">
            <el-input clearable v-model="checklistForm.agentName"></el-input>
          </el-form-item>
          <el-form-item label="其他备注事项" prop="remark">
            <el-input clearable type="textarea" v-model="checklistForm.remark" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="借款品种" prop="loanVariety">
            <el-select v-model="checklistForm.loanVariety" placeholder="请选择借款品种">
              <el-option v-for="item in loanVariety.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请贷款金额" prop="loanAmount">
            <el-input clearable v-model.number="checklistForm.loanAmount" type="number"><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="申请贷款期限" prop="loanPeriod">
            <el-input clearable v-model.number="checklistForm.loanPeriod" type="number"><template slot="append">月</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label=" ">
        <el-button type="primary" :loading="formLoading" @click="submitForm('checklistForm')">提交</el-button>
        <el-button @click="resetForm('checklistForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <flow-complete-dialog
      :loanId="loanId"
      :loanStatus="loanStatus"
      :dialogVisible="dialogVisible"
      :showReturnButton="false"
      :listPath="listPath"
      :nextPath="nextPath"
    ></flow-complete-dialog>
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
import { getStaticIndexByKey, saveCheckList, createTask } from '@/api/mortgage'

export default {
  name: 'order-taking',
  data () {
    return {
      checklistForm: {
        datetime: null,
        clientName: null,
        clientPhone: null,
        clientIdType: null,
        clientIdNumber: null,
        clientWorkType: null,
        clientWorkUnit: null,
        loanVariety: null,
        loanAmount: null,
        loanPeriod: null,
        mortgageHouses: [{
          area: null,
          enquiryResult: null,
          totalPrice: null
        }],
        checklistSource: null,
        agentName: null,
        remark: null
      },
      rules: {
        datetime: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        clientName: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        clientPhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        clientIdType: [{ required: true, message: '请选择证件类型', trigger: 'blur' }],
        clientIdNumber: [
          { required: true, message: '证件号码不能为空', trigger: 'blur' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '证件号码格式错误', trigger: 'blur' }
        ],
        clientWorkType: [{ required: true, message: '请选择工作种类', trigger: 'blur' }],
        clientWorkUnit: [{ required: true, message: '工作单位不能为空', trigger: 'blur' }],
        loanVariety: [{ required: true, message: '请选择借款品种', trigger: 'blur' }],
        loanAmount: [
          { required: true, message: '贷款金额不能为空', trigger: 'blur' },
          { type: 'integer', message: '贷款金额必须为整数值' }
        ],
        loanPeriod: [
          { required: true, message: '贷款期限不能为空', trigger: 'blur' },
          { type: 'integer', message: '贷款期限必须为整数值' }
        ],
        checklistSource: [{ required: true, message: '请选择单子来源渠道', trigger: 'blur' }],
        agentName: [{ required: true, message: '中介不能为空', trigger: 'blur' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      dialogVisible: false,
      listPath: '',
      nextPath: '',
      cardType: {
        key: 'mortgagechecklistcardtype',
        value: []
      },
      workType: {
        key: 'mortgagechecklistworktype',
        value: []
      },
      loanVariety: {
        key: 'mortgagechecklistloanvariety',
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
      const index = this.checklistForm.mortgageHouses.indexOf(house)
      if (index !== -1) {
        this.$confirm('是否清除该条房产信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.checklistForm.mortgageHouses.splice(index, 1)
        }).catch(() => {})
      }
    },
    addHouseProperty () {
      this.checklistForm.mortgageHouses.push({
        area: null,
        enquiry_result: null,
        total_price: null
      })
    },
    calcTotalPrice (area, singlePrice, index) {
      if (area && singlePrice) {
        if (parseFloat(area).toString() !== 'NaN' && parseFloat(singlePrice).toString() !== 'NaN') {
          this.checklistForm.mortgageHouses[index].total_price = area * singlePrice
        } else {
          this.checklistForm.mortgageHouses[index].total_price = null
        }
      } else {
        this.checklistForm.mortgageHouses[index].total_price = null
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        createTask(this.user_id).then(response => {
          // console.log(response)
          if (response.result) {
            // saveCheckList(this.)
          } else {
            this.$message({
              type: 'error',
              message: `${response.data}, ${response.extra}`
            })
          }
        })
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
            saveCheckList(JSON.stringify(this.checklistForm), this.user_id).then(response => {
              this.formLoading = false
              if (response.data.status) {
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
      this.$router.push({ path: `/loan-management/order/status/${this.loanNum}` })
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
    this.getStaticIndex(this.loanVariety)
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
