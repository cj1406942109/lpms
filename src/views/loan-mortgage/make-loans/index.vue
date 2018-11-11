<template>
  <div class="app-container">
    <h2>正在放款列表</h2>
    <el-table :data="makeLoansList" v-loading.body="makeLoansListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="rootId" label="贷款编号" width="200"></el-table-column>
      <el-table-column prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column prop="clientPhone" label="联系方式" width="200"></el-table-column>
      <el-table-column prop="state" label="当前状态" width="200">
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
import {
  getLoanList,
  getLoanById,
  confirmLoan
} from '@/api/mortgage'
export default {
  name: 'evaluate-order',
  data () {
    return {
      makeLoansList: null,
      makeLoansListLoading: true
    }
  },
  created () {
    this.getLoanList()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getLoanList () {
      getLoanList().then(data => {
        this.makeLoansListLoading = false
        this.makeLoansList = data
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
        getLoanById(item.id).then(data => {
          console.log(data)
        })
        confirmLoan(item.id).then(data => {
          console.log(data)
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
