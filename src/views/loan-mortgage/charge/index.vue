<template>
  <div class="app-container">
    <h2>正在收费列表</h2>
    <el-table :data="chargeList" v-loading.body="chargeListLoading" style="width: 100%" border stripe>
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
import { getChargeList } from '@/api/mortgage'
export default {
  name: 'charge',
  data () {
    return {
      chargeList: null,
      chargeListLoading: true
    }
  },
  created () {
    this.getchargeList()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getchargeList () {
      getChargeList().then(data => {
        this.chargeListLoading = false
        this.chargeList = data
      })
    },
    goNext (item) {
      console.log(item)
      this.$router.push({ path: `/loan-mortgage/charge/edit-info/${item.taskId}` })
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
