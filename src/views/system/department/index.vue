<template>
  <div class="app-container">
    <div class="table-header">
      <h2>部门角色列表</h2>
      <div>
        <el-button type="success" @click="goCreate">新增角色</el-button>
      </div>
    </div>
    <el-table
      :data="departmentList"
      v-loading.body="departmentListLoading"
      style="width: 100%"
      border
      stripe
    >
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="id" label="部门角色编号" width="300"></el-table-column>
      <el-table-column prop="name" label="部门角色名称"></el-table-column>
      <el-table-column prop="note" label="描述信息"></el-table-column>
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
  getRoleList,
  deleteRoleById
} from '@/api/system'
export default {
  name: 'department',
  data () {
    return {
      departmentList: null,
      departmentListLoading: true
    }
  },
  created () {
    this.getRoleList()
  },
  computed: {
    ...mapGetters([
      'userId',
      'permission'
    ])
  },
  methods: {
    getRoleList () {
      getRoleList().then(data => {
        this.departmentListLoading = false
        this.departmentList = data
      })
    },
    goDetail (item) {
      console.log(item)
      this.$router.push({ path: `/system/department/edit-info/${item.id}` })
    },
    goDelete (item) {
      this.$confirm(`是否删除部门角色：${item.name}`, '提示', {
        type: 'warning'
      }).then(() => {
        deleteRoleById(item.id).then(data => {
          if (data) {
            this.$message.success('删除成功')
            this.getRoleList()
          }
        })
      }).catch(() => {
        return
      })
    },
    goCreate () {
      this.$router.push({ path: '/system/department/create-info' })
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
