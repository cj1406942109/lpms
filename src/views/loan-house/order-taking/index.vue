<template>
  <div class="app-container">
    <h2>客户情况登记明细表</h2>
    <el-form :model="clientForm" :rules="rules" ref="clientForm" label-width="200px">
      <el-form-item label="完成时间" prop="">
        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="10">
          <h3>借款人基本信息</h3>
          <el-form-item label="姓名" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="">
            <el-input clearable placeholder="请填写手机号"></el-input>
          </el-form-item>
          <el-form-item label="工作单位" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="单位电话" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="月均收入" prop="">
            <el-input clearable><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="联系地址" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="户口所在地" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="">
            <el-select placeholder="请选择证件类型">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="">
            <el-input clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <h3>借款人配偶基本信息</h3>
          <el-form-item label="姓名" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="工作单位" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="单位电话" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="户口所在地" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="">
            <el-select placeholder="请选择证件类型">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="">
            <el-input clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <h3>产权人基本信息</h3>
          <el-form-item label="姓名" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="">
            <el-input clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <h3>产权人配偶基本信息</h3>
          <el-form-item label="姓名" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="">
            <el-input clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <h3>客户借款基本信息</h3>
          <el-form-item label="贷款银行" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="评估公司" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="房屋成交价" prop="">
            <el-input clearable><template slot="append">万元</template></el-input>
          </el-form-item>
          <el-form-item label="房屋评估价" prop="">
            <el-input clearable><template slot="append">万元</template></el-input>
          </el-form-item>
          <el-form-item label="贷款金额" prop="">
            <el-input clearable><template slot="append">万元</template></el-input>
          </el-form-item>
          <el-form-item label="贷款年限" prop="">
            <el-input clearable><template slot="append">年</template></el-input>
          </el-form-item>
          <el-form-item label="担保方式" prop="">
            <el-select placeholder="请选择担保方式">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="还款方式" prop="">
            <el-select placeholder="请选择还款方式">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="贷款类型" prop="">
            <el-select placeholder="请选择贷款类型">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首付款金额" prop="">
            <el-input clearable><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="首付款交付方式" prop="">
            <el-select placeholder="请选择交付方式">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成交是否真实">
            <el-radio-group>
              <el-radio :label="true" >是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="客户情况是否真实">
            <el-radio-group>
              <el-radio :label="true" >是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="卖方存折办理" prop="">
            <el-select placeholder="请选择办理情况">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="">
            <el-input clearable type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <h3>保证人基本信息</h3>
          <el-form-item label="姓名" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="工作单位" prop="">
            <el-input clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <h3>房屋基本信息</h3>
          <el-form-item label="房屋地址" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="房产证号" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="土地证号" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="房屋所属区局" prop="">
            <el-input clearable></el-input>
          </el-form-item>
          <el-form-item label="建成年份" prop="">
            <el-input clearable><template slot="append">年</template></el-input>
          </el-form-item>
          <el-form-item label="房屋类型" prop="">
            <el-select placeholder="请选择房屋类型">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房屋建筑面积" prop="">
            <el-input clearable><template slot="append">平米</template></el-input>
          </el-form-item>
          <el-form-item label="土地属性" prop="">
            <el-select placeholder="请选择土地属性">
              <el-option label="" value=""></el-option>
            </el-select>
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
        finish_time: null,
        client_name: null,
        client_phone: null,
        client_id_type: null,
        client_id_number: null,
        client_work_type: null,
        client_work_unit: null,
        loan_type: null,
        loan_amount: null,
        loan_period: null,
        mortgageHouses: [{
          area: null,
          enquiry_result: null,
          total_price: null
        }],
        checklist_source: null,
        agent_name: null,
        remark: null
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
    calcTotalPrice (area, singlePrice, index) {
      if (area && singlePrice) {
        if (parseFloat(area).toString() !== 'NaN' && parseFloat(singlePrice).toString() !== 'NaN') {
          this.clientForm.mortgageHouses[index].total_price = area * singlePrice
        } else {
          this.clientForm.mortgageHouses[index].total_price = null
        }
      } else {
        this.clientForm.mortgageHouses[index].total_price = null
      }
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
    this.getStaticIndex(this.loanType)
    this.getStaticIndex(this.listSource)
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    h3 {
      text-align: center;
    }
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
