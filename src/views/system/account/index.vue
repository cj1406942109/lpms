<template>
  <div class="app-container">
    <h2>部门列表</h2>
    <el-table :data="userList" v-loading.body="userListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="departmentId" label="部门ID"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goDetail(scope.row)">查看</el-button>
          <el-button type="success" size="mini" @click="goDetail(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="goDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getUserList
} from '@/api/system'
export default {
  name: 'department',
  data () {
    return {
      userList: null,
      userListLoading: true
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
    getUserList () {
      getUserList().then(data => {
        this.userListLoading = false
        this.userList = data
      })
    },
    goDetail (item) {
      console.log(item)
      this.$router.push({ path: `/system/account/edit-info/${item.id}` })
    },
    goDelete (item) {
      console.log(item)
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
