<template>
  <div class="app-container">
    <h2>统计报表</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="抵押贷款" name="mortgage">
        <div class="tabel-header">
          <el-button size="small" plain type="success" @click="downloadForm('mortgage-table', '抵押贷款')">下载报表（Excel）</el-button>
          <el-button size="small" plain type="primary" @click="generateMortgageForm()">重新生成报表</el-button>
        </div>
        <div>
          <el-table :data="mortgageTableData" border v-loading.body="mortgageTableLoading" id="mortgage-table">
            <el-table-column width="100" type="index" label="序号"></el-table-column>
            <el-table-column width="150" prop="id" label="编号"></el-table-column>
            <el-table-column width="150" prop="background" label="后台"></el-table-column>
            <el-table-column width="150" prop="clerk" label="业务员"></el-table-column>
            <el-table-column width="150" prop="clientName" label="客户姓名"></el-table-column>
            <el-table-column width="200" prop="cardNumber" label="证件号码"></el-table-column>
            <el-table-column width="200" prop="loanType" label="借款品种">
              <template slot-scope="scope">
                {{formatLoanVariety(scope.row.loanType)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="loanBank" label="借款银行"></el-table-column>
            <el-table-column width="150" prop="bankManager" label="银行客户经理"></el-table-column>
            <el-table-column width="150" prop="amount" label="借款金额（万）"></el-table-column>
            <el-table-column width="150" prop="year" label="借款期限（年）"></el-table-column>
            <el-table-column width="150" prop="rate" label="执行利率"></el-table-column>
            <el-table-column width="150" prop="evaluatePrice" label="评估价格"></el-table-column>
            <el-table-column width="200" prop="dueDate" label="还款日">
              <template slot-scope="scope">
                {{formatTime(scope.row.dueDate)}}
              </template>
            </el-table-column>
            <el-table-column width="200" prop="loanDate" label="放款日">
              <template slot-scope="scope">
                {{formatTime(scope.row.loanDate)}}
              </template>
            </el-table-column>
            <el-table-column label="回款">
              <el-table-column width="150" prop="backDate" label="日期">
                <template slot-scope="scope">
                  {{formatTime(scope.row.backDate)}}
                </template>
              </el-table-column>
              <el-table-column width="150" prop="backMoney" label="金额"></el-table-column>
            </el-table-column>
            <el-table-column label="抵押物情况">
              <el-table-column width="150" prop="mortgageAddress" label="地址"></el-table-column>
              <el-table-column width="150" prop="mortgageArea" label="面积（平方米）"></el-table-column>
              <el-table-column width="150" prop="mortgageHouseAuthority" label="所属产局"></el-table-column>
            </el-table-column>
            <el-table-column label="借款人">
              <el-table-column width="150" prop="clientPhone" label="联系方式"></el-table-column>
              <el-table-column width="150" prop="clientCompany" label="单位"></el-table-column>
            </el-table-column>
            <el-table-column label="借款人配偶">
              <el-table-column width="150" prop="spouseName" label="姓名"></el-table-column>
              <el-table-column width="150" prop="spousePhone" label="联系方式"></el-table-column>
              <el-table-column width="150" prop="spouseCompany" label="单位"></el-table-column>
            </el-table-column>
            <el-table-column label="紧急联系人">
              <el-table-column width="150" prop="emergencyName" label="姓名"></el-table-column>
              <el-table-column width="150" prop="emergencyPhone" label="联系方式"></el-table-column>
            </el-table-column>
            <el-table-column width="200" prop="other" label="其他资产情况"></el-table-column>
            <el-table-column width="200" prop="caseState" label="案子情况"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="二手房贷款" name="house">
        <div class="tabel-header">
          <el-button size="small" plain type="success" @click="downloadForm('house-table', '二手房贷款')">下载报表（Excel）</el-button>
          <el-button size="small" plain type="primary" @click="generateHouseForm()">重新生成报表</el-button>
        </div>
        <div>
          <el-table :data="houseTableData" border v-loading.body="houseTableLoading" id="house-table">
            <el-table-column width="100" type="index" label="序号"></el-table-column>
            <el-table-column width="150" prop="id" label="编号"></el-table-column>
            <el-table-column width="150" prop="buyerName" label="买方姓名"></el-table-column>
            <el-table-column width="150" prop="buyerPhone" label="买方电话"></el-table-column>
            <el-table-column width="150" prop="sellerName" label="卖方姓名"></el-table-column>
            <el-table-column width="150" prop="sellerPhone" label="卖方电话"></el-table-column>
            <el-table-column width="200" prop="address" label="地址"></el-table-column>
            <el-table-column width="150" prop="clerk" label="业务员"></el-table-column>
            <el-table-column width="150" prop="manager" label="客户经理"></el-table-column>
            <el-table-column width="150" prop="bank" label="银行"></el-table-column>
            <el-table-column width="150" prop="bankHolder" label="驻行"></el-table-column>
            <el-table-column width="150" prop="reportType" label="报告类型"></el-table-column>
            <el-table-column width="150" prop="evaluateCompany" label="评估公司"></el-table-column>
            <el-table-column width="150" prop="houseArea" label="房屋面积"></el-table-column>
            <el-table-column width="150" prop="reportTotal" label="报告评估总额"></el-table-column>
            <el-table-column width="150" prop="reportSingle" label="报告单价"></el-table-column>
            <el-table-column width="150" prop label="担保函编号"></el-table-column>
            <el-table-column width="150" prop="guaranteeTime" label="担保函日期">
              <template slot-scope="scope">
                {{formatTime(scope.row.guaranteeTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="loanTotal" label="贷款金额"></el-table-column>
            <el-table-column width="150" prop="loanYear" label="贷款年限"></el-table-column>
            <el-table-column width="200" prop="idcard" label="身份证号码"></el-table-column>
            <el-table-column width="150" prop="visaTime" label="签约时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.visaTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop label="面签费时间"></el-table-column>
            <el-table-column width="150" prop label="面签费金额"></el-table-column>
            <el-table-column width="150" prop label="询价编号"></el-table-column>
            <el-table-column width="150" prop label="业务编号"></el-table-column>
            <el-table-column width="150" prop="orderTime" label="下单时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.orderTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="isUpReport" label="上报"></el-table-column>
            <el-table-column width="150" prop="approveTime" label="审批通过时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.approveTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="guaranteeCost" label="担保函结费"></el-table-column>
            <el-table-column width="150" prop="formalReportTime" label="正式报告时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.formalReportTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="mortgageFileCompanyTime" label="抵押资料回公司时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.mortgageFileCompanyTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="mortgageTime" label="进抵押时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.mortgageTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="mortgageOperator" label="抵押办理人"></el-table-column>
            <el-table-column width="150" prop="loanTime" label="放款时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.loanTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="certificateCompanyTime" label="证回公司时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.certificateCompanyTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="charge" label="回款"></el-table-column>
            <el-table-column width="150" prop="chargeTime" label="回款时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.chargeTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="chargeAmount" label="回款金额"></el-table-column>
            <el-table-column width="150" prop="chargeType" label="回款类型"></el-table-column>
            <el-table-column width="150" prop="chargeBank" label="转账银行"></el-table-column>
            <el-table-column width="150" prop="chargeMan" label="转账人"></el-table-column>
            <el-table-column width="150" prop="nominalFeeTime" label="工本费时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.nominalFeeTime)}}
              </template>
            </el-table-column>
            <el-table-column width="200" prop="nominalFee" label="工本费金额（100元 / 单）"></el-table-column>
            <el-table-column width="200" prop="mortgageFileTransferTime" label="抵押资料回房交所时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.mortgageFileTransferTime)}}
              </template>
            </el-table-column>
            <el-table-column width="200" prop="otherCardTransferTime" label="他项 + 证回房交所时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.otherCardTransferTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="caseBackToBankTime" label="案子回行里时间">
              <template slot-scope="scope">
                {{formatTime(scope.row.caseBackToBankTime)}}
              </template>
            </el-table-column>
            <el-table-column width="150" prop="remark" label="备注"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import moment from 'moment'
import { getStaticIndexByKey } from '@/api/mortgage'
import {
  getHouseOutputList,
  generateHouseOutputList,
  getMortgageOutputList,
  generateMortgageOutputList
} from '@/api/loan'

export default {
  data () {
    return {
      moment,
      activeTab: 'mortgage',
      houseTableData: [],
      houseTableLoading: true,
      mortgageTableData: [],
      mortgageTableLoading: true,
      loanVariety: {
        key: 'mortgagechecklistloanvariety',
        value: []
      }
    }
  },
  created () {
    this.getStaticIndex(this.loanVariety)
    this.getMortgageFormData().catch(() => {
      this.$message({
        type: 'error',
        message: '获取抵押贷款报表数据失败'
      })
    })
    this.getHouseFormData().catch(() => {
      this.$message({
        type: 'error',
        message: '获取二手房贷款报表数据失败'
      })
    })
  },
  methods: {
    getStaticIndex (staticIndex) {
      getStaticIndexByKey(staticIndex.key).then(({ data }) => {
        if (data) {
          staticIndex.value = data[staticIndex.key]
        } else {
          this.$message({
            type: 'error',
            message: '静态索引获取失败'
          })
        }
      })
    },
    getHouseFormData () {
      return new Promise((resolve, reject) => {
        getHouseOutputList().then(({ data }) => {
          if (data) {
            this.houseTableLoading = false
            this.houseTableData = data
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    getMortgageFormData () {
      return new Promise((resolve, reject) => {
        getMortgageOutputList().then(({ data }) => {
          if (data) {
            this.mortgageTableLoading = false
            this.mortgageTableData = data
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    downloadForm (id, name) {
      /* generate workbook object from table */
      var workbook = XLSX.utils.table_to_book(document.querySelector(`#${id}`))
      /* get binary string as output */
      var wbout = XLSX.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${name}统计报表.xlsx`)
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      // return wbout
    },
    generateHouseForm () {
      generateHouseOutputList().then(({ data }) => {
        if (data) {
          this.houseTableLoading = true
          this.getHouseFormData().then(() => {
            this.$message({
              type: 'success',
              message: '重新生成报表成功'
            })
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '重新生成报表失败'
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '重新生成报表失败'
          })
        }
      })
    },
    generateMortgageForm () {
      generateMortgageOutputList().then(({ data }) => {
        if (data) {
          this.mortgageTableLoading = true
          this.getMortgageFormData().then(() => {
            this.$message({
              type: 'success',
              message: '重新生成报表成功'
            })
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '重新生成报表失败'
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '重新生成报表失败'
          })
        }
      })
    },
    formatLoanVariety (type) {
      let result = '未知'
      const variety = this.loanVariety.value
      for (let i = 0, len = variety.length; i < len; i++) {
        const item = variety[i]
        if (+type === item.id) {
          result = item.value
        }
      }
      return result
    },
    formatTime (time) {
      if (!time) return ''
      return moment(time).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  background-color: #fff;
  h2 {
    button:nth-of-type(1) {
      margin-left: 100px;
    }
  }
}
.tabel-header {
  margin-bottom: 15px;
}
</style>
