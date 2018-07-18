<template>
  <div class="app-container">
    <h2>待办事项</h2>
    <el-table :data="todoList" v-loading.body="toodoListLoading" border stripe style="width: 100%">
      <el-table-column prop="no" label="贷款编号"></el-table-column>
      <el-table-column prop="type" label="贷款类型"></el-table-column>
      <el-table-column prop="status" label="当前状态"></el-table-column>
      <el-table-column prop="desc" label="待办事项"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              选项<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>办理</el-dropdown-item>
              <el-dropdown-item>延迟</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
import { getTodoList } from '@/api/dashboard'

export default {
  name: 'todo',
  data () {
    return {
      todoList: null,
      toodoListLoading: true
    }
  },
  created () {
    this.GetTodoList()
  },
  methods: {
    GetTodoList () {
      this.toodoListLoading = true
      getTodoList().then(response => {
        this.todoList = response.data.data
        this.toodoListLoading = false
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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

