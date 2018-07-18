<template>
  <div class="app-container">
    <h2>正在抵押列表</h2>
    <el-table :data="mortgageList" v-loading.body="mortgageListLoading" style="width: 100%" border stripe>
      <el-table-column prop="no" label="编号" width="300"></el-table-column>
      <el-table-column prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column prop="contactInfo" label="联系方式"></el-table-column>
      <el-table-column prop="status" label="当前状态" width="200">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '待确定抵押时间' ? 'warning' : 'info'"
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
import { getMortgageList } from '@/api/mortgage'
export default {
  name: 'evaluate-order',
  data () {
    return {
      mortgageList: null,
      mortgageListLoading: true
    }
  },
  created () {
    this.GetMortgageList()
  },
  methods: {
    GetMortgageList () {
      getMortgageList().then(response => {
        this.mortgageList = response.data
        this.mortgageListLoading = false
      })
    },
    goNext (item) {
      this.$router.push({ path: '/loan-mortgage/mortgage/edit-info' })
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
