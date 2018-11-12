<template>
  <div class="app-container">
    <h2>放款列表</h2>
    <el-table :data="makeLoansList" v-loading.body="makeLoansListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column :sortable="true" prop="rootId" label="贷款编号" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column :sortable="true" prop="clientPhone" label="联系方式" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="state" label="当前状态"
        :filter-method="filterState"
        :filters="[{ text: '待放款', value: 'open' }, { text: '已完成', value: 'finish' }, { text: '已关闭', value: 'close' }]"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="tagState(scope.row.state)">
            {{formateState(scope.row.state)}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="success" :disabled="scope.row.state == 'open' ? false : true" size="mini" @click="confirmLoan(scope.row)">确定放款</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getLoanListByEmployeeId,
  // getLoanById,
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
      getLoanListByEmployeeId(this.userId).then(data => {
        this.makeLoansListLoading = false
        if (data) {
          this.makeLoansList = data
        } else {
          this.$message({
            type: 'error',
            message: '放款列表获取失败'
          })
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
        confirmLoan(item.id).then(data => {
          this.$message.closeAll()
          if (data) {
            this.$message({
              type: 'success',
              message: '放款成功'
            })
            this.getLoanList()
          } else {
            this.$message({
              type: 'error',
              message: '放款失败'
            })
          }
        })
      }).catch(() => {})
    },
    tagState (item) {
      switch (item) {
        case 'open':
          return 'primary'
        case 'finish':
          return 'success'
        case 'close':
          return 'danger'
        default:
          return 'info'
      }
    },
    formateState (state) {
      switch (state) {
        case 'open':
          return '待放款'
        case 'finish':
          return '已完成'
        case 'close':
          return '已关闭'
        default:
          return '其他'
      }
    },
    filterState (value, row) {
      return row.state === value
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
