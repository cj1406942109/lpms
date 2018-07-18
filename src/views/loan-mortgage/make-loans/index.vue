<template>
  <div class="app-container">
    <h2>正在放款列表</h2>
    <el-table :data="makeLoansList" v-loading.body="makeLoansListLoading" style="width: 100%" border stripe>
      <el-table-column prop="no" label="编号" width="300"></el-table-column>
      <el-table-column prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column prop="contactInfo" label="联系方式"></el-table-column>
      <el-table-column prop="status" label="当前状态" width="200">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '等待提交担保函与收费明细' ? 'warning' : 'success'"
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
import { getMakeLoansList } from '@/api/mortgage'
export default {
  name: 'evaluate-order',
  data () {
    return {
      makeLoansList: null,
      makeLoansListLoading: true
    }
  },
  created () {
    this.GetMakeLoansList()
  },
  methods: {
    GetMakeLoansList () {
      getMakeLoansList().then(response => {
        this.makeLoansList = response.data
        this.makeLoansListLoading = false
      })
    },
    goNext (item) {
      this.$router.push({ path: '/loan-mortgage/make-loans/edit-info' })
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
