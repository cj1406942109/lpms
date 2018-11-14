<template>
  <div class="app-container">
    <h2>待办事项</h2>
    <el-table :data="todoList" v-loading.body="toodoListLoading" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column :sortable="true" prop="id" label="贷款编号" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="type" label="贷款类型">
        <template slot-scope="scope">
          <el-tag :type="`${scope.row.id}`[0] == '1' ? 'success':'warning'">
            {{`${scope.row.id}`[0] == '1' ? '抵押贷款' : '二手房贷款' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :sortable="true" prop="clientName" label="姓名"></el-table-column>
      <el-table-column :sortable="true" prop="clientPhone" label="电话"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper" v-if="false">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getTaskListByEmployeeId as getTaskMListByEmployeeId } from '@/api/mortgage'
import { getTaskListByEmployeeId as getTaskHListByEmployeeId } from '@/api/house'

export default {
  name: 'todo',
  data () {
    return {
      todoList: null,
      toodoListLoading: true
    }
  },
  created () {
    this.getTodoList()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getTodoList () {
      let listM = []
      let listH = []
      Promise.all([getTaskMListByEmployeeId(this.userId).then(data => {
        if (data) {
          listM = data
        } else {
          this.$message({
            type: 'error',
            message: '获取抵押贷款任务列表失败'
          })
        }
      }), getTaskHListByEmployeeId(this.userId).then(data => {
        if (data) {
          listH = data
        } else {
          this.$message({
            type: 'error',
            message: '获取二手房贷款任务列表失败'
          })
        }
      })]).then(() => {
        this.toodoListLoading = false
        this.todoList = listM.concat(listH)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    goNext (item) {
      this.$router.push({ path: this.getNextPath(item) })
    },
    getNextPath (item) {
      let baseUrl = ''
      let currentState = ''
      const type = parseInt(`${item.id}`[0])
      switch (type) {
        // 抵押贷款
        case 1:
          baseUrl = '/loan-mortgage'
          break
        case 2:
          baseUrl = '/house'
          break
      }
      switch (item.state) {
        case 'checklist':
          currentState = 'order-taking'
          break
        case 'view':
          currentState = 'interview'
          break
        case 'visa':
          currentState = 'visa-interview'
          break
        case 'order':
          currentState = 'evaluate-order'
          break
        case 'input':
          currentState = 'integrate-input'
          break
        case 'approve':
          currentState = 'examine-approve'
          break
        case 'transfer':
          currentState = 'visa-interview'
          break
        case 'mortgage':
          currentState = 'mortgage'
          break
        case 'mortgageA':
          currentState = 'mortgage'
          break
        case 'guarantee':
          currentState = 'guarantee'
          break
        case 'loan':
          currentState = 'make-loans'
          break
        case 'charge':
          currentState = 'charge'
          break
      }
      return `${baseUrl}/${currentState}`
    }
  }
}
</script>


<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    .pagination-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>

