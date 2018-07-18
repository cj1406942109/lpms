<template>
  <div class="app-container">
    <h2>公告列表</h2>
    <div class="function-container">
      <el-button type="primary" icon="el-icon-plus">发布公告</el-button>
      <el-input placeholder="请输入内容" style="width: 300px;margin-left:50px;">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="noticeList" v-loading.body="noticeListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="date" label="发布时间"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
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
import { getNoticeList } from '@/api/system'

export default {
  name: 'account',
  data () {
    return {
      noticeList: null,
      noticeListLoading: true
    }
  },
  created () {
    this.GetNoticeList()
  },
  methods: {
    GetNoticeList () {
      getNoticeList().then(response => {
        this.noticeList = response.data
        this.noticeListLoading = false
      })
    },
    goDetail (row) {
      alert('hello')
    },
    goEdit (row) {
      this.$router.push({ path: '/system/notice/edit-info' })
    },
    remove (row) {
      this.$confirm('该操作将删除此公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.noticeList.indexOf(row)
        if (index !== -1) {
          this.noticeList.splice(index, 1)
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
