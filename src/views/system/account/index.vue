<template>
  <div class="app-container">
    <div class="table-header">
      <h2>账号列表</h2>
      <div>
        <el-button type="success" @click="goCreate">新建账号</el-button>
      </div>
    </div>
    <el-table :data="userList" v-loading.body="userListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="roles.0.name" label="部门-角色"></el-table-column>
      <el-table-column prop="position" label="备注"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goDetail(scope.row)">查看</el-button>
          <el-button type="success" size="mini" @click="goDetail(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="goDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="itemCount"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="itemCount"
      layout="total, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getUserList,
  deleteUserById
} from '@/api/system'
export default {
  name: 'department',
  data () {
    return {
      userList: null,
      userListLoading: true,
      currentPage: 1,
      pageSize: 15,
      itemCount: 0
    }
  },
  created () {
    this.getUserList()
  },
  computed: {
    ...mapGetters([
      'userId',
      'permission'
    ])
  },
  methods: {
    getUserList (page = 1) {
      getUserList(page, this.pageSize).then(data => {
        this.userListLoading = false
        this.userList = data.data
        if (typeof data.extra === 'number') {
          this.itemCount = data.extra
        }
      })
    },
    goDetail (item) {
      console.log(item)
      this.$router.push({ path: `/system/account/edit-info/${item.id}` })
    },
    goDelete (item) {
      this.$confirm(`是否删除账号：${item.name}`, '提示', {
        type: 'warning'
      }).then(() => {
        deleteUserById(item.id).then(({ data }) => {
          if (data) {
            this.$message.success('删除成功')
            this.getUserList()
          }
        })
      }).catch(() => {
        return
      })
    },
    goCreate () {
      this.$router.push({ path: '/system/account/create-info' })
    },
    handleCurrentChange (page) {
      this.getUserList(page)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  background-color: #fff;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
