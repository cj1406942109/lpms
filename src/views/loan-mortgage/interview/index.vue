<template>
  <div class="app-container">
    <h2>正在面谈列表</h2>
    <el-table :data="interviewList" v-loading.body="interviewListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="loanId" label="贷款编号"></el-table-column>
      <el-table-column prop="name" label="客户姓名"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="state" label="当前状态" width="200">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
          <el-button type="danger" size="mini" @click="wasteSheetOperation(scope.row)">废单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInterviewList, wasteSheet } from '@/api/mortgage'
export default {
  name: 'interview',
  data () {
    return {
      interviewList: null,
      interviewListLoading: true
    }
  },
  created () {
    this.getInterviewList()
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  methods: {
    getInterviewList () {
      getInterviewList().then(response => {
        this.interviewListLoading = false
        if (response.data.status) {
          this.interviewList = response.data.data
        } else {
          this.$message({
            type: 'error',
            message: '面谈列表获取失败，请稍候重试'
          })
        }
      })
    },
    goNext (item) {
      this.$router.push({ path: `/loan-mortgage/interview/edit-info/${item.taskId}` })
    },
    wasteSheetOperation (item) {
      console.log(item)
      this.$confirm('废单操作将结束当前贷款的所有流程，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '正在处理...'
        })
        wasteSheet(item.taskId, this.user_id).then(response => {
          if (response.data.status) {
            this.$message({
              type: 'success',
              message: '废单操作执行成功'
            })
            this.GetInterviewList()
          } else {
            this.$message({
              showClose: true,
              message: '操作失败，请稍候重试',
              type: 'error'
            })
          }
        })
      }).catch(() => {})
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
