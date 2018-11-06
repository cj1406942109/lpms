<template>
  <div class="app-container">
    <h2>正在抵押列表</h2>
    <el-table :data="mortgageList" v-loading.body="mortgageListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="loanId" label="贷款编号" width="300"></el-table-column>
      <el-table-column prop="name" label="客户姓名"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="status" label="当前状态" width="200">
        <template slot-scope="scope">
          <!-- <el-tag
            :type="scope.row.status === '待确定抵押时间' ? 'warning' : 'info'"
            close-transition>{{scope.row.status}}</el-tag> -->
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
import { mapGetters } from 'vuex'
import { getMortgageListById } from '@/api/mortgage'
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
      'user_id'
    ])
  },
  created () {
    this.GetMortgageList()
  },
  methods: {
    GetMortgageList () {
      getMortgageListById(this.user_id).then(response => {
        console.log(response)
        this.mortgageListLoading = false
        if (response.data.status) {
          this.mortgageList = response.data.data
        }
      })
    },
    goNext (item) {
      this.$router.push({ path: `/loan-mortgage/mortgage/edit-info/${item.taskId}/${item.loanId}` })
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
