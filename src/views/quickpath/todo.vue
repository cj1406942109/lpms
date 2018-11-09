<template>
  <div class="app-container">
    <h2>待办事项</h2>
    <el-table :data="todoList" v-loading.body="toodoListLoading" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="rootId" label="贷款编号" width="300"></el-table-column>
      <!-- <el-table-column prop="type" label="贷款类型"></el-table-column> -->
      <el-table-column prop="clientName" label="姓名"></el-table-column>
      <el-table-column prop="clientPhone" label="电话"></el-table-column>
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
    this.getTodoList()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getTodoList () {
      this.toodoListLoading = true
      getTodoList(this.userId).then(data => {
        this.todoList = data
        this.toodoListLoading = false
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    goNext (item) {
      console.log(item)
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

