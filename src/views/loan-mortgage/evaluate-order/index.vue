<template>
  <div class="app-container">
    <h2>正在评估下单列表</h2>
    <el-table :data="evaluateOrderList" v-loading.body="evaluateOrderListLoading" style="width: 100%" border stripe>
      <el-table-column prop="no" label="编号" width="300"></el-table-column>
      <el-table-column prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column prop="contactInfo" label="客户联系方式"></el-table-column>
      <el-table-column prop="visaInterviewOperator" label="面签经办人"></el-table-column>
      <el-table-column prop="visaInterviewFinishTime" label="面签完成时间"></el-table-column>
      <el-table-column prop="status" label="当前状态" width="200">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '待评估下单' ? 'warning' : 'info'"
            close-transition>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              选项<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goNext(scope.row)">办理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getEvaluateOrderList } from '@/api/mortgage'
export default {
  name: 'evaluate-order',
  data () {
    return {
      evaluateOrderList: null,
      evaluateOrderListLoading: true
    }
  },
  created () {
    this.GetEvaluateOrderList()
  },
  methods: {
    GetEvaluateOrderList () {
      getEvaluateOrderList().then(response => {
        this.evaluateOrderList = response.data
        this.evaluateOrderListLoading = false
      })
    },
    goNext (item) {
      this.$router.push({ path: '/loan-mortgage/evaluate-order/edit-info' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
  }
</style>
