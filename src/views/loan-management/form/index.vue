<template>
  <div class="app-container">
    <h2>统计报表</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="抵押贷款" name="mortgage">
        <div class="tabel-header">
          <el-button size="small" plain type="success" @click="downloadForm()">下载报表（Excel）</el-button>
          <el-button size="small" plain type="primary" @click="generateForm()">重新生成报表</el-button>
        </div>
        <div>
          <el-table :data="tableData" border v-loading.body="tableLoading" id="mortgage-table">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="buyerName" label="买方姓名"></el-table-column>
            <el-table-column prop="buyerPhone" label="买方电话"></el-table-column>
            <el-table-column prop="sellerName" label="卖方姓名"></el-table-column>
            <el-table-column prop="sellerPhone" label="卖方电话"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="clerk" label="业务员"></el-table-column>
            <el-table-column prop="manager" label="客户经理"></el-table-column>
            <el-table-column prop="bank" label="银行"></el-table-column>
            <el-table-column prop="bankHolder" label="驻行"></el-table-column>
            <el-table-column prop="reportType" label="报告类型"></el-table-column>
            <el-table-column prop="evaluateCompany" label="评估公司"></el-table-column>
            <el-table-column prop="houseArea" label="房屋面积"></el-table-column>
            <el-table-column prop="reportTotal" label="报告评估总额"></el-table-column>
            <el-table-column prop="reportSingle" label="报告单价"></el-table-column>
            <el-table-column prop label="担保函编号"></el-table-column>
            <el-table-column prop="guaranteeTime" label="担保函日期"></el-table-column>
            <el-table-column prop="loanTotal" label="贷款金额"></el-table-column>
            <el-table-column prop="loanYear" label="贷款年限"></el-table-column>
            <el-table-column prop="idcard" label="身份证号码"></el-table-column>
            <el-table-column prop="visaTime" label="签约时间"></el-table-column>
            <el-table-column prop label="面签费时间"></el-table-column>
            <el-table-column prop label="面签费金额"></el-table-column>
            <el-table-column prop label="询价编号"></el-table-column>
            <el-table-column prop label="业务编号"></el-table-column>
            <el-table-column prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="isUpReport" label="上报"></el-table-column>
            <el-table-column prop="approveTime" label="审批通过时间"></el-table-column>
            <el-table-column prop="guaranteeCost" label="担保函结费"></el-table-column>
            <el-table-column prop="formalReportTime" label="正式报告时间"></el-table-column>
            <el-table-column prop="mortgageFileCompanyTime" label="抵押资料回公司时间"></el-table-column>
            <el-table-column prop="mortgageTime" label="进抵押时间"></el-table-column>
            <el-table-column prop="mortgageOperator" label="抵押办理人"></el-table-column>
            <el-table-column prop="loanTime" label="放款时间"></el-table-column>
            <el-table-column prop="certificateCompanyTime" label="证回公司时间"></el-table-column>
            <el-table-column prop="charge" label="回款"></el-table-column>
            <el-table-column prop="chargeTime" label="回款时间"></el-table-column>
            <el-table-column prop="chargeAmount" label="回款金额"></el-table-column>
            <el-table-column prop="chargeType" label="回款类型"></el-table-column>
            <el-table-column prop="chargeBank" label="转账银行"></el-table-column>
            <el-table-column prop="chargeMan" label="转账人"></el-table-column>
            <el-table-column prop="nominalFeeTime" label="工本费时间"></el-table-column>
            <el-table-column prop="nominalFee" label="工本费金额（100元 / 单）"></el-table-column>
            <el-table-column prop="mortgageFileTransferTime" label="抵押资料回房交所时间"></el-table-column>
            <el-table-column prop="otherCardTransferTime" label="他项 + 证回房交所时间"></el-table-column>
            <el-table-column prop="caseBackToBankTime" label="案子回行里时间"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="二手房贷款" name="house">
        <div class="tabel-header">
          <el-button size="small" plain type="success" @click="downloadForm()">下载报表（Excel）</el-button>
          <el-button size="small" plain type="primary" @click="generateForm()">重新生成报表</el-button>
        </div>
        <div>
          <el-table :data="tableData" border v-loading.body="tableLoading" id="house-table">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="buyerName" label="买方姓名"></el-table-column>
            <el-table-column prop="buyerPhone" label="买方电话"></el-table-column>
            <el-table-column prop="sellerName" label="卖方姓名"></el-table-column>
            <el-table-column prop="sellerPhone" label="卖方电话"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="clerk" label="业务员"></el-table-column>
            <el-table-column prop="manager" label="客户经理"></el-table-column>
            <el-table-column prop="bank" label="银行"></el-table-column>
            <el-table-column prop="bankHolder" label="驻行"></el-table-column>
            <el-table-column prop="reportType" label="报告类型"></el-table-column>
            <el-table-column prop="evaluateCompany" label="评估公司"></el-table-column>
            <el-table-column prop="houseArea" label="房屋面积"></el-table-column>
            <el-table-column prop="reportTotal" label="报告评估总额"></el-table-column>
            <el-table-column prop="reportSingle" label="报告单价"></el-table-column>
            <el-table-column prop label="担保函编号"></el-table-column>
            <el-table-column prop="guaranteeTime" label="担保函日期"></el-table-column>
            <el-table-column prop="loanTotal" label="贷款金额"></el-table-column>
            <el-table-column prop="loanYear" label="贷款年限"></el-table-column>
            <el-table-column prop="idcard" label="身份证号码"></el-table-column>
            <el-table-column prop="visaTime" label="签约时间"></el-table-column>
            <el-table-column prop label="面签费时间"></el-table-column>
            <el-table-column prop label="面签费金额"></el-table-column>
            <el-table-column prop label="询价编号"></el-table-column>
            <el-table-column prop label="业务编号"></el-table-column>
            <el-table-column prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="isUpReport" label="上报"></el-table-column>
            <el-table-column prop="approveTime" label="审批通过时间"></el-table-column>
            <el-table-column prop="guaranteeCost" label="担保函结费"></el-table-column>
            <el-table-column prop="formalReportTime" label="正式报告时间"></el-table-column>
            <el-table-column prop="mortgageFileCompanyTime" label="抵押资料回公司时间"></el-table-column>
            <el-table-column prop="mortgageTime" label="进抵押时间"></el-table-column>
            <el-table-column prop="mortgageOperator" label="抵押办理人"></el-table-column>
            <el-table-column prop="loanTime" label="放款时间"></el-table-column>
            <el-table-column prop="certificateCompanyTime" label="证回公司时间"></el-table-column>
            <el-table-column prop="charge" label="回款"></el-table-column>
            <el-table-column prop="chargeTime" label="回款时间"></el-table-column>
            <el-table-column prop="chargeAmount" label="回款金额"></el-table-column>
            <el-table-column prop="chargeType" label="回款类型"></el-table-column>
            <el-table-column prop="chargeBank" label="转账银行"></el-table-column>
            <el-table-column prop="chargeMan" label="转账人"></el-table-column>
            <el-table-column prop="nominalFeeTime" label="工本费时间"></el-table-column>
            <el-table-column prop="nominalFee" label="工本费金额（100元 / 单）"></el-table-column>
            <el-table-column prop="mortgageFileTransferTime" label="抵押资料回房交所时间"></el-table-column>
            <el-table-column prop="otherCardTransferTime" label="他项 + 证回房交所时间"></el-table-column>
            <el-table-column prop="caseBackToBankTime" label="案子回行里时间"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getOutputList, getHouseOutputList } from '@/api/loan'

export default {
  data () {
    return {
      activeTab: 'mortgage',
      tableData: [],
      tableLoading: true
    }
  },
  created () {
    this.getFormData().catch(() => {
      this.$message({
        type: 'error',
        message: '获取报表数据失败'
      })
    })
  },
  methods: {
    getFormData () {
      return new Promise((resolve, reject) => {
        getOutputList().then(({ data }) => {
          if (data) {
            this.tableLoading = false
            this.tableData = data
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    downloadForm () {
      /* generate workbook object from table */
      var workbook = XLSX.utils.table_to_book(document.querySelector('#mortgage-table'))
      /* get binary string as output */
      var wbout = XLSX.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '统计报表.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      // return wbout
    },
    generateForm () {
      getHouseOutputList().then(({ data }) => {
        if (data) {
          this.tableLoading = true
          this.getFormData().then(() => {
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