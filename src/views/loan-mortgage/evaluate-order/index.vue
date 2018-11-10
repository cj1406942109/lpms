<template>
  <div class="app-container">
    <h2>正在评估下单列表</h2>
    <el-table :data="evaluateOrderList" v-loading.body="evaluateOrderListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="rootId" label="贷款编号" width="300"></el-table-column>
      <el-table-column prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column prop="clientPhone" label="联系方式"></el-table-column>
      <el-table-column prop="state" label="当前状态" width="200"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  // getOrderList
  getOrderListByEmployeeId
} from '@/api/mortgage'
export default {
  name: 'evaluate-order',
  data () {
    return {
      evaluateOrderList: null,
      evaluateOrderListLoading: true
    }
  },
  created () {
    this.getOrderList()
  },
  computed: {
    ...mapGetters([
      'userId',
      'permission'
    ])
  },
  methods: {
    getOrderList () {
      // getOrderList().then(data => {
      //   this.evaluateOrderListLoading = false
      //   this.evaluateOrderList = data
      // })
      getOrderListByEmployeeId(this.userId).then(data => {
        this.evaluateOrderListLoading = false
        this.evaluateOrderList = data
      })
    },
    goNext (item) {
      console.log(item)
      this.$router.push({ path: `/loan-mortgage/evaluate-order/edit-info/${item.id}/${item.rootId}` })
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
