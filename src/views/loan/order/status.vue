<template>
  <div class="app-container">
    <h2>查看贷款状态</h2>
    <div class="option-wrapper">
      <el-button type="primary">查看表格</el-button>
      <el-button @click="returnList()">返回列表</el-button>
    </div>
    <ul v-if="order" class="basic-info">
      <li>贷款编号：<span>{{order.loanId}}</span></li>
      <li>借款品种：<span>{{formateLoanType(order.loanType)}}</span></li>
      <li>客户姓名：<span>{{order.clientName}}</span></li>
      <li>身份证号：<span>{{order.idcard}}</span></li>
      <li>联系方式：<span>{{order.phone}}</span></li>
    </ul>
  </div>
</template>

<script>
import { formateLoanType } from '@/utils/loan'
import { getOrderById } from '@/api/loan'
export default {
  data () {
    return {
      order: null
    }
  },
  created () {
    getOrderById(this.$route.params.orderId).then(response => {
      if (response.data.status) {
        this.order = response.data.data
      } else {
        this.$message({
          type: 'error',
          message: '订单数据获取失败，请稍候重试'
        })
      }
    })
  },
  methods: {
    formateLoanType (loanType) {
      return formateLoanType(loanType)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    .option-wrapper {
      margin: -55px 0 20px;
      text-align: right;
    }
    .basic-info {
      margin: 0;
      padding: 10px;
      border-radius: 5px;
      line-height: 40px;
      list-style: none;
      display: flex;
      justify-content: space-around;
      background: #eee;
      li {
        line-height: 40px;
        span {
          color: #409eff;
        }
      }
    }
  }
</style>