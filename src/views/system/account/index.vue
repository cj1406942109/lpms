<template>
  <div class="app-container">
    <h2>账号信息列表</h2>
    <div class="function-container">
      <el-button type="primary" icon="el-icon-plus">创建账号</el-button>
      <el-input placeholder="请输入账号信息" style="width: 300px;margin-left:50px;">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="accountList" v-loading.body="accountListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="password" label="密码" ></el-table-column>
      <el-table-column prop="department" label="所在部门"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="goDetail(scope.row)">查看</el-button>
          <el-button size="mini" type="primary" @click="goEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAccountList } from '@/api/system'

export default {
  name: 'account',
  data () {
    return {
      accountList: null,
      accountListLoading: true
    }
  },
  created () {
    this.GetAccountList()
  },
  methods: {
    GetAccountList () {
      getAccountList().then(response => {
        this.accountList = response.data
        this.accountListLoading = false
      })
    },
    goDetail (row) {
      alert('hello')
    },
    goEdit (row) {
      this.$router.push({ path: '/system/account/edit-info/0c5b8e0e3ab34e26817251cbe93907ae' })
    },
    remove (row) {
      this.$confirm('该操作将删除此用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.accountList.indexOf(row)
        if (index !== -1) {
          this.accountList.splice(index, 1)
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
    .function-container {
      padding: 20px 0;
    }
  }
</style>
