<template>
  <div>
    <div class="app-container">
      <h2>运行监控</h2>
      <el-table :data="userList" v-loading="userListLoading" style="width: 100%" border stripe>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="部门-角色" prop="roles.0.name"></el-table-column>
        <el-table-column label="完成" prop="success">
          <template slot-scope="scope">
            <el-button type="success" size="mini">{{scope.row.success}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="待办" prop="todo">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">{{scope.row.todo}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="警告" prop="warning">
          <template slot-scope="scope">
            <el-button type="danger" size="mini">{{scope.row.warning}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="app-container">
      <h2>过程监控</h2>
      <el-table :data="processList" style="width: 100%" border stripe>
        <el-table-column label="流程" prop="process"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="完成" prop="success">
          <template slot-scope="scope">
            <el-button type="success" size="mini">{{scope.row.success}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="待办" prop="todo">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">{{scope.row.todo}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="警告" prop="warning">
          <template slot-scope="scope">
            <el-button type="danger" size="mini">{{scope.row.warning}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  getUserList
} from '@/api/system'
export default {
  name: 'monitor',
  data () {
    return {
      userList: [],
      userListLoading: false
    }
  },
  computed: {
    processList () {
      const mortgageProcessList = ['接单', '面谈', '面签', '评估下单', '审批', '抵押', '收费', '放款']
      const houseProcessList = ['接单', '面签', '评估下单', '整件输机', '审批', '过户', '抵押', '担保', '放款', '收费']
      const list = []
      mortgageProcessList.forEach((mortgage) => {
        list.push({
          process: mortgage,
          type: '抵押贷款',
          success: this.getRandomCount(),
          todo: this.getRandomCount(),
          warning: this.getRandomCount()
        })
      })
      houseProcessList.forEach((house) => {
        list.push({
          process: house,
          type: '二手房贷款',
          success: this.getRandomCount(),
          todo: this.getRandomCount(),
          warning: this.getRandomCount()
        })
      })
      return list
    }
  },
  methods: {
    getUserList () {
      this.userListLoading = true
      getUserList().then(({ data }) => {
        if (data) {
          this.userList = data.map((user) => {
            return {
              ...user,
              success: this.getRandomCount(),
              todo: this.getRandomCount(),
              warning: this.getRandomCount()
            }
          })
          this.userListLoading = false
        }
      })
    },
    getRandomCount () {
      return Math.floor(Math.random() * 30)
    }
  },
  created () {
    this.getUserList()
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  background-color: #fff;
  padding: 20px;
}
</style>
