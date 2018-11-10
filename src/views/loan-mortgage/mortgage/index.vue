<template>
  <div class="app-container">
    <h2>正在抵押列表</h2>
    <el-table :data="mortgageList" v-loading.body="mortgageListLoading" style="width: 100%" border stripe>
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
  getMortgageList
} from '@/api/mortgage'
export default {
  name: 'evaluate-order',
  data () {
    return {
      mortgageList: null,
      mortgageListLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created () {
    this.getMortgageList()
  },
  methods: {
    getMortgageList () {
      getMortgageList().then(data => {
        this.mortgageListLoading = false
        this.mortgageList = data
      })
    },
    goNext (item) {
      this.$router.push({ path: `/loan-mortgage/mortgage/edit-info/${item.id}/${item.loanId}` })
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
