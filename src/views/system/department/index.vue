<template>
  <div class="app-container">
    <h2>部门列表</h2>
    <el-table :data="departmentList" v-loading.body="departmentListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="id" label="部门编号" width="300"></el-table-column>
      <el-table-column prop="name" label="部门名称"></el-table-column>
      <el-table-column prop="description" label="描述信息"></el-table-column>
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
  getDepartmentList
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
    this.getDepartmentList()
  },
  computed: {
    ...mapGetters([
      'userId',
      'permission'
    ])
  },
  methods: {
    getDepartmentList () {
      getDepartmentList().then(data => {
        this.departmentListLoading = false
        this.departmentList = data
      })
    },
    goDetail (item) {
      console.log(item)
      this.$router.push({ path: `/system/department/edit-info/${item.id}` })
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
