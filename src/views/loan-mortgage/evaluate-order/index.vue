<template>
  <div class="app-container">
    <h2>正在评估下单列表</h2>
    <el-table :data="evaluateOrderList" v-loading.body="evaluateOrderListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="loanId" label="贷款编号" width="300"></el-table-column>
      <el-table-column prop="name" label="客户姓名"></el-table-column>
      <el-table-column prop="phone" label="客户联系方式"></el-table-column>
      <el-table-column prop="clerk" label="面签经办人"></el-table-column>
      <el-table-column prop="visa_finish_time" label="面签完成时间" :formatter="timeFormatter"></el-table-column>
      <el-table-column prop="state" label="当前状态" width="200">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.state === '待评估下单' ? 'warning' : 'primary'"
            close-transition>{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { getOrderListById } from '@/api/mortgage'
export default {
  name: 'evaluate-order',
  data () {
    return {
      evaluateOrderList: null,
      evaluateOrderListLoading: true
    }
  },
  created () {
    this.GetOrderListById(this.user_id)
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  methods: {
    GetOrderListById (employeeId) {
      getOrderListById(employeeId).then(response => {
        this.evaluateOrderListLoading = false
        if (response.data.status) {
          this.evaluateOrderList = response.data.data
        }
      })
    },
    goNext (item) {
      console.log(item)
      this.$router.push({ path: `/loan-mortgage/evaluate-order/edit-info/${item.taskId}/${item.loanId}` })
    },
    timeFormatter (row) {
      return moment(row.time).format('YYYY-MM-DD')
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
