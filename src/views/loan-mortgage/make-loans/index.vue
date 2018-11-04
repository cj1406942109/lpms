<template>
  <div class="app-container">
    <h2>正在放款列表</h2>
    <el-table :data="makeLoansList" v-loading.body="makeLoansListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="loanId" label="贷款编号" width="300"></el-table-column>
      <el-table-column prop="name" label="客户姓名"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="status" label="当前状态" width="200">
        <template slot-scope="scope">
          <el-tag type="primary" close-transition>等待放款</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="confirmLoan(scope.row)">确定放款</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLoanListById, confirmLoan } from '@/api/mortgage'
export default {
  name: 'evaluate-order',
  data () {
    return {
      makeLoansList: null,
      makeLoansListLoading: true
    }
  },
  created () {
    this.getMakeLoansList()
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  methods: {
    getMakeLoansList () {
      getLoanListById(this.user_id).then(response => {
        this.makeLoansListLoading = false
        if (response.data.status) {
          this.makeLoansList = response.data.data
        }
      })
    },
    confirmLoan (item) {
      console.log(item)
      this.$confirm('是否确定放款？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '正在处理...'
        })
        confirmLoan(item.taskId).then(response => {
          if (response.data.status === 1) {
            this.$message({
              showClose: true,
              message: '放款成功',
              type: 'success'
            })
            this.getMakeLoansList()
          } else {
            this.$message({
              showClose: true,
              message: '放款失败，请稍候重试！',
              type: 'error'
            })
          }
        })
      }).catch(() => {})
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
